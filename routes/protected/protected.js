const express = require("express")
const router = express.Router()
const authMiddleware = require('../../middleware/authMiddleware/authMiddleware')

router.get("/", authMiddleware, (req, res) => {
  res.json({
    msg: "You have accessed a protected route",
    userId: req.user.id
  })
})

module.exports = router;