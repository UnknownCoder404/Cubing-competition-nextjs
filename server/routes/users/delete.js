const express = require("express");
const User = require("../../Models/user");
const verifyToken = require("../../middleware/verifyToken");
const isAdmin = require("../../utils/helpers/isAdmin");
const router = express.Router();
router.delete("/:userId", verifyToken, isAdmin, async (req, res) => {
  try {
    const userId = req.params.userId; // Id of user to delete

    // Delete user with this id.
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "Korisnik nije pronađen." });
    }

    return res.status(200).json({ message: "Korisnik je uspješno izbrisan." });
  } catch (error) {
    // Handle errors
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});
module.exports = router;
