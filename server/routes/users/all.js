const express = require("express");
const User = require("../../Models/user");
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find({}, "username role competitions group");

    // Send the response array
    res.status(200).json(users);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Greška u serveru." });
  }
});
module.exports = router;
