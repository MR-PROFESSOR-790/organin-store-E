const express = require("express")
const { register, login, getMe, updateProfile, changePassword, logout } = require("../controllers/authController")
const { protect } = require("../middleware/auth")
const { registerValidation, loginValidation, changePasswordValidation } = require("../middleware/validation")

const router = express.Router()

// Public routes
router.post("/register", registerValidation, register)
router.post("/login", loginValidation, login)

// Protected routes
router.use(protect) // All routes after this middleware are protected

router.get("/me", getMe)
router.put("/profile", updateProfile)
router.put("/change-password", changePasswordValidation, changePassword)
router.post("/logout", logout)

module.exports = router

