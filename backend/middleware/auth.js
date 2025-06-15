const jwt = require("jsonwebtoken")
const User = require("../models/User")
const asyncHandler = require("../utils/asyncHandler")
const AppError = require("../utils/appError")

// Protect routes - verify JWT token
const protect = asyncHandler(async (req, res, next) => {
  let token

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
  }

  if (!token) {
    return next(new AppError("Access denied. No token provided.", 401))
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Get user from token
    const user = await User.findById(decoded.id).select("-password")
    if (!user) {
      return next(new AppError("User not found", 401))
    }

    // Check if user is active
    if (!user.isActive) {
      return next(new AppError("User account is deactivated", 401))
    }

    req.user = user
    next()
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid token", 401))
    } else if (error.name === "TokenExpiredError") {
      return next(new AppError("Token expired", 401))
    } else {
      return next(new AppError("Token verification failed", 401))
    }
  }
})

// Admin authorization
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("Access denied. Insufficient permissions.", 403))
    }
    next()
  }
}

// Optional auth - doesn't fail if no token
const optionalAuth = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findById(decoded.id).select("-password")
      if (user && user.isActive) {
        req.user = user
      }
    } catch (error) {
      // Silently fail for optional auth
    }
  }

  next()
})

module.exports = {
  protect,
  authorize,
  optionalAuth,
}
