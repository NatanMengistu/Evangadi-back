const express = require("express");
const router = express.Router();
const authentMiddleware = require("../middleware/authentMiddleware");
const { register, login, checkUser } = require("../controler/usercontroler"); // Corrected import path

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// Check route - requires authentication
router.get("/check", authentMiddleware, checkUser);

module.exports = router;
