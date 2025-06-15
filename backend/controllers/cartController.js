const Cart = require("../models/Cart")
const Product = require("../models/Product")
const { validationResult } = require("express-validator")
const asyncHandler = require("../utils/asyncHandler")
const AppError = require("../utils/appError")

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user.id }).populate("items.product", "name price images stock isActive")

  if (!cart) {
    cart = await Cart.create({ user: req.user.id })
  }

  // Filter out inactive products
  cart.items = cart.items.filter((item) => item.product && item.product.isActive)
  await cart.save()

  res.status(200).json({
    success: true,
    data: {
      cart,
    },
  })
})

// @desc    Add item to cart
// @route   POST /api/cart/items
// @access  Private
const addToCart = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 400, errors.array()))
  }

  const { productId, quantity = 1 } = req.body

  // Check if product exists and is active
  const product = await Product.findById(productId)
  if (!product || !product.isActive) {
    return next(new AppError("Product not found or inactive", 404))
  }

  // Check stock availability
  if (product.stock < quantity) {
    return next(new AppError("Insufficient stock available", 400))
  }

  // Get or create cart
  let cart = await Cart.findOne({ user: req.user.id })
  if (!cart) {
    cart = await Cart.create({ user: req.user.id })
  }

  // Check if item already exists in cart
  const existingItemIndex = cart.items.findIndex((item) => item.product.toString() === productId)

  if (existingItemIndex > -1) {
    // Update quantity
    const newQuantity = cart.items[existingItemIndex].quantity + quantity

    if (newQuantity > product.stock) {
      return next(new AppError("Cannot add more items than available stock", 400))
    }

    cart.items[existingItemIndex].quantity = newQuantity
    cart.items[existingItemIndex].price = product.price // Update price in case it changed
  } else {
    // Add new item
    cart.items.push({
      product: productId,
      quantity,
      price: product.price,
    })
  }

  await cart.save()
  await cart.populate("items.product", "name price images stock isActive")

  res.status(200).json({
    success: true,
    message: "Item added to cart successfully",
    data: {
      cart,
    },
  })
})

// @desc    Update cart item quantity
// @route   PUT /api/cart/items/:productId
// @access  Private
const updateCartItem = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 400, errors.array()))
  }

  const { productId } = req.params
  const { quantity } = req.body

  if (quantity < 0) {
    return next(new AppError("Quantity cannot be negative", 400))
  }

  const cart = await Cart.findOne({ user: req.user.id })
  if (!cart) {
    return next(new AppError("Cart not found", 404))
  }

  if (quantity === 0) {
    // Remove item from cart
    cart.items = cart.items.filter((item) => item.product.toString() !== productId)
  } else {
    // Check product stock
    const product = await Product.findById(productId)
    if (!product || !product.isActive) {
      return next(new AppError("Product not found or inactive", 404))
    }

    if (quantity > product.stock) {
      return next(new AppError("Insufficient stock available", 400))
    }

    // Update quantity
    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId)

    if (itemIndex === -1) {
      return next(new AppError("Item not found in cart", 404))
    }

    cart.items[itemIndex].quantity = quantity
    cart.items[itemIndex].price = product.price // Update price
  }

  await cart.save()
  await cart.populate("items.product", "name price images stock isActive")

  res.status(200).json({
    success: true,
    message: "Cart updated successfully",
    data: {
      cart,
    },
  })
})

// @desc    Remove item from cart
// @route   DELETE /api/cart/items/:productId
// @access  Private
const removeFromCart = asyncHandler(async (req, res, next) => {
  const { productId } = req.params

  const cart = await Cart.findOne({ user: req.user.id })
  if (!cart) {
    return next(new AppError("Cart not found", 404))
  }

  const itemExists = cart.items.some((item) => item.product.toString() === productId)

  if (!itemExists) {
    return next(new AppError("Item not found in cart", 404))
  }

  cart.items = cart.items.filter((item) => item.product.toString() !== productId)

  await cart.save()
  await cart.populate("items.product", "name price images stock isActive")

  res.status(200).json({
    success: true,
    message: "Item removed from cart successfully",
    data: {
      cart,
    },
  })
})

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id })
  if (!cart) {
    return next(new AppError("Cart not found", 404))
  }

  cart.items = []
  await cart.save()

  res.status(200).json({
    success: true,
    message: "Cart cleared successfully",
    data: {
      cart,
    },
  })
})

// @desc    Get cart summary
// @route   GET /api/cart/summary
// @access  Private
const getCartSummary = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate("items.product", "name price")

  if (!cart) {
    return res.status(200).json({
      success: true,
      data: {
        summary: {
          itemCount: 0,
          subtotal: 0,
          tax: 0,
          shipping: 0,
          total: 0,
        },
      },
    })
  }

  const subtotal = cart.totalPrice
  const tax = subtotal * 0.08 // 8% tax
  const shipping = subtotal >= 50 ? 0 : 9.99 // Free shipping over $50
  const total = subtotal + tax + shipping

  res.status(200).json({
    success: true,
    data: {
      summary: {
        itemCount: cart.totalItems,
        subtotal,
        tax,
        shipping,
        total,
      },
    },
  })
})

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getCartSummary,
}
