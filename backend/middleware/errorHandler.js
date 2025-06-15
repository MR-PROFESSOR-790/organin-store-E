const AppError = require("../utils/appError")

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`
  return new AppError(message, 400)
}

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]
  const message = `Duplicate field value: ${value}. Please use another value!`
  return new AppError(message, 400)
}

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message)
  const message = `Invalid input data. ${errors.join(". ")}`
  return new AppError(message, 400)
}

const handleJWTError = () => new AppError("Invalid token. Please log in again!", 401)

const handleJWTExpiredError = () => new AppError("Your token has expired! Please log in again.", 401)

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    success: false,
    error: err,
    message: err.message,
    stack: err.stack,
    details: err.details || null,
  })
}

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.details || null,
    })
  } else {
    // Programming or other unknown error: don't leak error details
    console.error("ERROR 💥", err)

    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    })
  }
}

const errorHandler = (err, req, res, next) => {
  let error = { ...err }
  error.message = err.message

  // Log error
  console.error(err)

  // Mongoose bad ObjectId
  if (err.name === "CastError") error = handleCastErrorDB(error)

  // Mongoose duplicate key
  if (err.code === 11000) error = handleDuplicateFieldsDB(error)

  // Mongoose validation error
  if (err.name === "ValidationError") error = handleValidationErrorDB(error)

  // JWT errors
  if (err.name === "JsonWebTokenError") error = handleJWTError()
  if (err.name === "TokenExpiredError") error = handleJWTExpiredError()

  // Set default values
  error.statusCode = error.statusCode || 500
  error.status = error.status || "error"

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(error, res)
  } else {
    sendErrorProd(error, res)
  }
}

module.exports = errorHandler
