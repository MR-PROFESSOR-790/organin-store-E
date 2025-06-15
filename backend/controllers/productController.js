const Product = require("../models/Product")
const { validationResult } = require("express-validator")
const asyncHandler = require("../utils/asyncHandler")
const AppError = require("../utils/appError")

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 12,
    category,
    search,
    minPrice,
    maxPrice,
    rating,
    sort = "createdAt",
    order = "desc",
    featured,
  } = req.query

  // Build query
  const query = { isActive: true }

  if (category) {
    query.category = category
  }

  if (search) {
    query.$text = { $search: search }
  }

  if (minPrice || maxPrice) {
    query.price = {}
    if (minPrice) query.price.$gte = Number(minPrice)
    if (maxPrice) query.price.$lte = Number(maxPrice)
  }

  if (rating) {
    query["rating.average"] = { $gte: Number(rating) }
  }

  if (featured === "true") {
    query.isFeatured = true
  }

  // Build sort object
  const sortObj = {}
  sortObj[sort] = order === "desc" ? -1 : 1

  // Execute query with pagination
  const skip = (page - 1) * limit
  const products = await Product.find(query).sort(sortObj).skip(skip).limit(Number(limit)).select("-reviews")

  const total = await Product.countDocuments(query)
  const totalPages = Math.ceil(total / limit)

  res.status(200).json({
    success: true,
    data: {
      products,
      pagination: {
        currentPage: Number(page),
        totalPages,
        totalProducts: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    },
  })
})

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate("reviews.user", "name avatar")

  if (!product || !product.isActive) {
    return next(new AppError("Product not found", 404))
  }

  res.status(200).json({
    success: true,
    data: {
      product,
    },
  })
})

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 400, errors.array()))
  }

  const product = await Product.create(req.body)

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: {
      product,
    },
  })
})

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 400, errors.array()))
  }

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!product) {
    return next(new AppError("Product not found", 404))
  }

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: {
      product,
    },
  })
})

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(new AppError("Product not found", 404))
  }

  // Soft delete - just mark as inactive
  product.isActive = false
  await product.save()

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  })
})

// @desc    Add product review
// @route   POST /api/products/:id/reviews
// @access  Private
const addReview = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 400, errors.array()))
  }

  const { rating, comment } = req.body
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(new AppError("Product not found", 404))
  }

  // Check if user already reviewed this product
  const existingReview = product.reviews.find((review) => review.user.toString() === req.user.id)

  if (existingReview) {
    return next(new AppError("You have already reviewed this product", 400))
  }

  // Add review
  product.reviews.push({
    user: req.user.id,
    rating,
    comment,
  })

  // Update product rating
  await product.updateRating()

  res.status(201).json({
    success: true,
    message: "Review added successfully",
    data: {
      product,
    },
  })
})

// @desc    Get product categories
// @route   GET /api/products/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct("category", { isActive: true })

  res.status(200).json({
    success: true,
    data: {
      categories,
    },
  })
})

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
  getCategories,
}
