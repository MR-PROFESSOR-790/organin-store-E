const express = require("express")
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
  getCategories,
} = require("../controllers/productController")
const { protect, authorize } = require("../middleware/auth")
const {
  createProductValidation,
  updateProductValidation,
  addReviewValidation,
  paginationValidation,
} = require("../middleware/validation")

const router = express.Router()

// Public routes
router.get("/", paginationValidation, getProducts)
router.get("/categories", getCategories)
router.get("/:id", getProduct)

// Protected routes
router.use(protect)

// User routes
router.post("/:id/reviews", addReviewValidation, addReview)

// Admin routes
router.use(authorize("admin"))
router.post("/", createProductValidation, createProduct)
router.put("/:id", updateProductValidation, updateProduct)
router.delete("/:id", deleteProduct)

module.exports = router
