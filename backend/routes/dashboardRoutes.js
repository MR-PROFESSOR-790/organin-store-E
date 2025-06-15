const express = require("express")
const { getDashboardStats, getSalesAnalytics } = require("../controllers/dashboardController")
const { protect, authorize } = require("../middleware/auth")

const router = express.Router()

// All routes are protected and admin only
router.use(protect)
router.use(authorize("admin"))

router.get("/stats", getDashboardStats)
router.get("/analytics/sales", getSalesAnalytics)

module.exports = router
