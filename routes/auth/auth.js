const express = require("express");
const router = express.Router();
const {
  register,
  login,
  me,
} = require("../../controllers/auth/authControllers");
const authMiddleware = require("../../middleware/authMiddleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, me);

module.exports = router;
