// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateJWT = require("../middlewares/authenticateJWT");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/user", authenticateJWT, authController.getUserInfo);
router.post("/logout", authController.logout);

module.exports = router;
