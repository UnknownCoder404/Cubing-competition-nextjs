const express = require("express");
const User = require("../../Models/user");
const cache = require("../../middleware/cache");
const router = express.Router();
// Route handler for getting live solves
router.get("/", cache(5), async (req, res) => {
  try {
    const lastUpdated = new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Europe/Zagreb",
    }).format(new Date());
    const users = await User.find({}, "").select("-role -password -__v");
    users.filter((user) => {
      return user.competitions.length > 0;
    });
    return res.status(200).json({
      lastUpdated,
      users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Greška prilikom dohvaćanja slaganja.",
    });
  }
});
module.exports = router;
