const express = require("express");
const { getUserById } = require("../../functions/getUserById");
const router = express.Router();
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({
        message: "Nema ID korisnika.",
      });
    }
    // Fetch all users from the database
    const user = await getUserById(userId, "username competitions group role");

    // Send the response array
    res.status(200).json(user);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
