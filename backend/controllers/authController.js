const User = require("../models/User")
const Cart = require("../models/Cart")
const { validationResult } = require("express-validator")
const asyncHandler = require("../utils/asyncHandler")
const AppError = require("../utils/appError")

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 400, errors.array()))
  }

  const { name, email, password, phone } = req.body

  // Check if user already exists
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return next(new AppError("User already exists with this email", 400))
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    phone,
  })

  // Create empty cart for user
  await Cart.create({ user: user._id })

  // Generate token
  const token = user.generateToken()

  // Remove password from response
  user.password = undefined

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      user,
      token,
    },
  })
})

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 400, errors.array()))
  }

  const { email, password } = req.body

  // Check if user exists and get password
  const user = await User.findOne({ email }).select("+password")
  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError("Invalid email or password", 401))
  }

  // Check if user is active
  if (!user.isActive) {
    return next(new AppError("Your account has been deactivated. Please contact support.", 401))
  }

  // Update last login
  await user.updateLastLogin()

  // Generate token
  const token = user.generateToken()

  // Remove password from response
  user.password = undefined

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user,
      token,
    },
  })
})

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate("orders")

  res.status(200).json({
    success: true,
    data: {
      user,
    },
  })
})

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 400, errors.array()))
  }

  const allowedFields = ["name", "phone", "address", "preferences"]
  const updates = {}

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field]
    }
  })

  const user = await User.findByIdAndUpdate(req.user.id, updates, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: {
      user,
    },
  })
})

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 400, errors.array()))
  }

  const { currentPassword, newPassword } = req.body

  // Get user with password
  const user = await User.findById(req.user.id).select("+password")

  // Check current password
  if (!(await user.comparePassword(currentPassword))) {
    return next(new AppError("Current password is incorrect", 400))
  }

  // Update password
  user.password = newPassword
  await user.save()

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  })
})

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logout = asyncHandler(async (req, res) => {
  // In a real application, you might want to blacklist the token
  // For now, we'll just send a success response
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  })
})

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  logout,
}
