const express = require("express");
const winner = require("../../Models/winner");
const cache = require("../../middleware/cache");
const { getUsernameById } = require("../../functions/getUsernameById");
const router = express.Router();
router.get("/get", cache(5), async (req, res) => {
  try {
    const winners = await winner.find({}, "id group");
    for (let index = 0; index < winners.length; index++) {
      const username = await getUsernameById(winners[index].id);
      winners[index].username = username ? username : "Nepoznato";
    }
    // Construct response object with usernames
    const response = winners.map((winner) => ({
      id: winner.id,
      group: winner.group,
      username: winner.username,
    }));
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Greška unutar servera." });
  }
});
module.exports = router;
