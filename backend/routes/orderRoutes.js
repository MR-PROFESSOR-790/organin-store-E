const express = require("express")
const {
  createOrder,
  getUserOrders,
  getOrder,
  updateOrderStatus,
  cancelOrder,
  getAllOrders,
} = require("../controllers/orderController")
const { protect, authorize } = require("../middleware/auth")
const { createOrderValidation, updateOrderStatusValidation, paginationValidation } = require("../middleware/validation")

const router = express.Router()

// All routes are protected
router.use(protect)

// User routes
router.post("/", createOrderValidation, createOrder)
router.get("/", paginationValidation, getUserOrders)
router.get("/:id", getOrder)
router.put("/:id/cancel", cancelOrder)

// Admin routes
router.get("/admin/all", authorize("admin"), paginationValidation, getAllOrders)
router.put("/:id/status", authorize("admin"), updateOrderStatusValidation, updateOrderStatus)

module.exports = router
