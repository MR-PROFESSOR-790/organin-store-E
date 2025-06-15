const User = require("../models/User")
const Order = require("../models/Order")
const { validationResult } = require("express-validator")
const asyncHandler = require("../utils/asyncHandler")
const AppError = require("../utils/appError")
const mongoose = require("mongoose")

// @desc    Get all users (Admin)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, search, role, status } = req.query

  const query = {}

  if (search) {
    query.$or = [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }]
  }

  if (role) {
    query.role = role
  }

  if (status) {
    query.isActive = status === "active"
  }

  const skip = (page - 1) * limit
  const users = await User.find(query).select("-password").sort({ createdAt: -1 }).skip(skip).limit(Number(limit))

  const total = await User.countDocuments(query)
  const totalPages = Math.ceil(total / limit)

  // Get user statistics
  const userStats = await Promise.all(
    users.map(async (user) => {
      const orderCount = await Order.countDocuments({ user: user._id })
      const totalSpent = await Order.aggregate([
        { $match: { user: user._id, status: { $ne: "cancelled" } } },
        { $group: { _id: null, total: { $sum: "$pricing.total" } } },
      ])

      return {
        ...user.toObject(),
        orderCount,
        totalSpent: totalSpent[0]?.total || 0,
      }
    }),
  )

  res.status(200).json({
    success: true,
    data: {
      users: userStats,
      pagination: {
        currentPage: Number(page),
        totalPages,
        totalUsers: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    },
  })
})

// @desc    Get single user (Admin)
// @route   GET /api/users/:id
// @access  Private/Admin
const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password").populate("orders")

  if (!user) {
    return next(new AppError("User not found", 404))
  }

  // Get user statistics
  const orderCount = await Order.countDocuments({ user: user._id })
  const totalSpent = await Order.aggregate([
    { $match: { user: user._id, status: { $ne: "cancelled" } } },
    { $group: { _id: null, total: { $sum: "$pricing.total" } } },
  ])

  const recentOrders = await Order.find({ user: user._id })
    .sort({ createdAt: -1 })
    .limit(5)
    .select("orderNumber status pricing.total createdAt")

  res.status(200).json({
    success: true,
    data: {
      user: {
        ...user.toObject(),
        statistics: {
          orderCount,
          totalSpent: totalSpent[0]?.total || 0,
          recentOrders,
        },
      },
    },
  })
})

// @desc    Update user (Admin)
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 400, errors.array()))
  }

  const allowedFields = ["name", "email", "phone", "role", "isActive", "address"]
  const updates = {}

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field]
    }
  })

  const user = await User.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  }).select("-password")

  if (!user) {
    return next(new AppError("User not found", 404))
  }

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: {
      user,
    },
  })
})

// @desc    Delete user (Admin)
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(new AppError("User not found", 404))
  }

  // Prevent admin from deleting themselves
  if (user._id.toString() === req.user.id) {
    return next(new AppError("You cannot delete your own account", 400))
  }

  // Soft delete - deactivate user instead of removing
  user.isActive = false
  await user.save()

  res.status(200).json({
    success: true,
    message: "User deactivated successfully",
  })
})

// @desc    Get user dashboard stats
// @route   GET /api/users/dashboard/stats
// @access  Private
const getUserDashboardStats = asyncHandler(async (req, res) => {
  const userId = req.user.id

  // Get user orders
  const orders = await Order.find({ user: userId })
  const totalOrders = orders.length
  const totalSpent = orders
    .filter((order) => order.status !== "cancelled")
    .reduce((sum, order) => sum + order.pricing.total, 0)

  // Get order status counts
  const orderStatusCounts = await Order.aggregate([
    { $match: { user: mongoose.Types.ObjectId(userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ])

  // Get recent orders
  const recentOrders = await Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(5)
    .select("orderNumber status pricing.total createdAt")

  res.status(200).json({
    success: true,
    data: {
      stats: {
        totalOrders,
        totalSpent,
        orderStatusCounts,
        recentOrders,
      },
    },
  })
})

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserDashboardStats,
}
