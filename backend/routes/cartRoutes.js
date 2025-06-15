const express = require("express")
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getCartSummary,
} = require("../controllers/cartController")
const { protect } = require("../middleware/auth")
const { addToCartValidation, updateCartValidation } = require("../middleware/validation")

const router = express.Router()

// All routes are protected
router.use(protect)

router.get("/", getCart)
router.get("/summary", getCartSummary)
router.post("/items", addToCartValidation, addToCart)
router.put("/items/:productId", updateCartValidation, updateCartItem)
router.delete("/items/:productId", removeFromCart)
router.delete("/", clearCart)

module.exports = router
