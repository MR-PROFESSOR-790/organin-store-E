const Order = require("../models/Order")
const Cart = require("../models/Cart")
const Product = require("../models/Product")
const { validationResult } = require("express-validator")
const asyncHandler = require("../utils/asyncHandler")
const AppError = require("../utils/appError")

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 400, errors.array()))
  }

  const { items, shippingAddress, billingAddress, paymentInfo, couponCode, deliveryInstructions, isGift, giftMessage } =
    req.body

  // Validate items and calculate pricing
  let subtotal = 0
  const orderItems = []

  for (const item of items) {
    const product = await Product.findById(item.product)
    if (!product || !product.isActive) {
      return next(new AppError(`Product ${item.product} not found or inactive`, 400))
    }

    if (product.stock < item.quantity) {
      return next(new AppError(`Insufficient stock for ${product.name}`, 400))
    }

    const itemTotal = product.price * item.quantity
    subtotal += itemTotal

    orderItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      image: product.images[0]?.url || "",
      sku: product.sku,
    })

    // Update product stock
    product.stock -= item.quantity
    await product.save()
  }

  // Calculate pricing
  const tax = subtotal * 0.08 // 8% tax
  const shipping = subtotal >= 50 ? 0 : 9.99 // Free shipping over $50
  const discount = 0 // Apply coupon logic here
  const total = subtotal + tax + shipping - discount

  // Create order
  const order = await Order.create({
    user: req.user.id,
    items: orderItems,
    shippingAddress,
    billingAddress: billingAddress || shippingAddress,
    paymentInfo,
    pricing: {
      subtotal,
      tax,
      shipping,
      discount,
      total,
    },
    couponCode,
    deliveryInstructions,
    isGift,
    giftMessage,
    statusHistory: [
      {
        status: "pending",
        timestamp: new Date(),
        note: "Order created",
      },
    ],
  })

  // Clear user's cart
  await Cart.findOneAndUpdate({ user: req.user.id }, { $set: { items: [] } })

  // Populate order for response
  await order.populate("user", "name email")

  res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: {
      order,
    },
  })
})

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
const getUserOrders = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query

  const query = { user: req.user.id }
  if (status) {
    query.status = status
  }

  const skip = (page - 1) * limit
  const orders = await Order.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit))
    .populate("items.product", "name images")

  const total = await Order.countDocuments(query)
  const totalPages = Math.ceil(total / limit)

  res.status(200).json({
    success: true,
    data: {
      orders,
      pagination: {
        currentPage: Number(page),
        totalPages,
        totalOrders: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    },
  })
})

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
const getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate("items.product", "name images")

  if (!order) {
    return next(new AppError("Order not found", 404))
  }

  // Check if user owns this order or is admin
  if (order.user._id.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new AppError("Not authorized to access this order", 403))
  }

  res.status(200).json({
    success: true,
    data: {
      order,
    },
  })
})

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 400, errors.array()))
  }

  const { status, note, tracking } = req.body
  const order = await Order.findById(req.params.id)

  if (!order) {
    return next(new AppError("Order not found", 404))
  }

  // Update order status
  await order.updateStatus(status, note, req.user.id)

  // Update tracking info if provided
  if (tracking) {
    order.tracking = { ...order.tracking, ...tracking }
    await order.save()
  }

  res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    data: {
      order,
    },
  })
})

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
const cancelOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    return next(new AppError("Order not found", 404))
  }

  // Check if user owns this order
  if (order.user.toString() !== req.user.id) {
    return next(new AppError("Not authorized to cancel this order", 403))
  }

  // Check if order can be cancelled
  if (["shipped", "delivered", "cancelled"].includes(order.status)) {
    return next(new AppError("Order cannot be cancelled at this stage", 400))
  }

  // Restore product stock
  for (const item of order.items) {
    await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity } })
  }

  // Update order status
  await order.updateStatus("cancelled", "Cancelled by customer", req.user.id)

  res.status(200).json({
    success: true,
    message: "Order cancelled successfully",
    data: {
      order,
    },
  })
})

// @desc    Get all orders (Admin)
// @route   GET /api/orders/admin/all
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status, search, startDate, endDate } = req.query

  const query = {}

  if (status) {
    query.status = status
  }

  if (search) {
    query.$or = [
      { orderNumber: { $regex: search, $options: "i" } },
      { "shippingAddress.email": { $regex: search, $options: "i" } },
    ]
  }

  if (startDate || endDate) {
    query.createdAt = {}
    if (startDate) query.createdAt.$gte = new Date(startDate)
    if (endDate) query.createdAt.$lte = new Date(endDate)
  }

  const skip = (page - 1) * limit
  const orders = await Order.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit))
    .populate("user", "name email")
    .populate("items.product", "name")

  const total = await Order.countDocuments(query)
  const totalPages = Math.ceil(total / limit)

  res.status(200).json({
    success: true,
    data: {
      orders,
      pagination: {
        currentPage: Number(page),
        totalPages,
        totalOrders: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    },
  })
})

module.exports = {
  createOrder,
  getUserOrders,
  getOrder,
  updateOrderStatus,
  cancelOrder,
  getAllOrders,
}
