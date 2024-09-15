const express = require("express");
const verifyToken = require("../../middleware/verifyToken");
const router = express.Router();
router.get("/", verifyToken, (req, res) => {
  try {
    // Assuming verifyToken throws an error on invalid token
    res.status(200).json({ message: "Token is valid" });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500);
  }
});
module.exports = router;
