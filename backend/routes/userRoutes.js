const express = require("express")
const { getUsers, getUser, updateUser, deleteUser, getUserDashboardStats } = require("../controllers/userController")
const { protect, authorize } = require("../middleware/auth")
const { updateUserValidation, paginationValidation } = require("../middleware/validation")

const router = express.Router()

// All routes are protected
router.use(protect)

// User routes
router.get("/dashboard/stats", getUserDashboardStats)

// Admin routes
router.use(authorize("admin"))
router.get("/", paginationValidation, getUsers)
router.get("/:id", getUser)
router.put("/:id", updateUserValidation, updateUser)
router.delete("/:id", deleteUser)

module.exports = router
