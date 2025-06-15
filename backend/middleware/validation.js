const { body, param, query } = require("express-validator")

// Auth validations
const registerValidation = [
  body("name").trim().isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 and 50 characters"),
  body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  body("phone").optional().isMobilePhone().withMessage("Please provide a valid phone number"),
]

const loginValidation = [
  body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
]

const changePasswordValidation = [
  body("currentPassword").notEmpty().withMessage("Current password is required"),
  body("newPassword").isLength({ min: 6 }).withMessage("New password must be at least 6 characters long"),
]

// Product validations
const createProductValidation = [
  body("name").trim().isLength({ min: 2, max: 100 }).withMessage("Product name must be between 2 and 100 characters"),
  body("description")
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Description must be between 10 and 2000 characters"),
  body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  body("category")
    .isIn(["fresh-produce", "pantry", "dairy", "snacks", "beverages", "personal-care", "household"])
    .withMessage("Please select a valid category"),
  body("stock").isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
  body("sku").optional().trim().isLength({ min: 3, max: 50 }).withMessage("SKU must be between 3 and 50 characters"),
]

const updateProductValidation = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Product name must be between 2 and 100 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Description must be between 10 and 2000 characters"),
  body("price").optional().isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  body("category")
    .optional()
    .isIn(["fresh-produce", "pantry", "dairy", "snacks", "beverages", "personal-care", "household"])
    .withMessage("Please select a valid category"),
  body("stock").optional().isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
]

// Order validations
const createOrderValidation = [
  body("items").isArray({ min: 1 }).withMessage("Order must contain at least one item"),
  body("items.*.product").isMongoId().withMessage("Invalid product ID"),
  body("items.*.quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
  body("shippingAddress.firstName").trim().notEmpty().withMessage("First name is required"),
  body("shippingAddress.lastName").trim().notEmpty().withMessage("Last name is required"),
  body("shippingAddress.email").isEmail().withMessage("Valid email is required"),
  body("shippingAddress.phone").isMobilePhone().withMessage("Valid phone number is required"),
  body("shippingAddress.street").trim().notEmpty().withMessage("Street address is required"),
  body("shippingAddress.city").trim().notEmpty().withMessage("City is required"),
  body("shippingAddress.state").trim().notEmpty().withMessage("State is required"),
  body("shippingAddress.zipCode").trim().notEmpty().withMessage("ZIP code is required"),
  body("paymentInfo.method").isIn(["card", "paypal", "apple-pay", "google-pay"]).withMessage("Invalid payment method"),
]

const updateOrderStatusValidation = [
  body("status")
    .isIn(["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "refunded"])
    .withMessage("Invalid order status"),
  body("note").optional().trim().isLength({ max: 500 }).withMessage("Note cannot exceed 500 characters"),
]

// Cart validations
const addToCartValidation = [
  body("productId").isMongoId().withMessage("Invalid product ID"),
  body("quantity").optional().isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
]

const updateCartValidation = [
  param("productId").isMongoId().withMessage("Invalid product ID"),
  body("quantity").isInt({ min: 0 }).withMessage("Quantity must be a non-negative integer"),
]

// Review validations
const addReviewValidation = [
  body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
  body("comment").optional().trim().isLength({ max: 500 }).withMessage("Comment cannot exceed 500 characters"),
]

// User validations
const updateUserValidation = [
  body("name").optional().trim().isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 and 50 characters"),
  body("email").optional().isEmail().normalizeEmail().withMessage("Please provide a valid email"),
  body("phone").optional().isMobilePhone().withMessage("Please provide a valid phone number"),
  body("role").optional().isIn(["user", "admin"]).withMessage("Invalid role"),
  body("isActive").optional().isBoolean().withMessage("isActive must be a boolean"),
]

// Query validations
const paginationValidation = [
  query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
  query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100"),
]

module.exports = {
  registerValidation,
  loginValidation,
  changePasswordValidation,
  createProductValidation,
  updateProductValidation,
  createOrderValidation,
  updateOrderStatusValidation,
  addToCartValidation,
  updateCartValidation,
  addReviewValidation,
  updateUserValidation,
  paginationValidation,
}
