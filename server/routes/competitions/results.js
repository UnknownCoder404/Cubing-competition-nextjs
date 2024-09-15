const express = require("express");
const router = express.Router();
const path = require("path");
const {
  getWinnersForAllLockedCompetitions,
} = require("../../utils/helpers/getWinners");
router.get("/results", async (req, res) => {
  const results = await getWinnersForAllLockedCompetitions();
  return res.status(200).json(results);
});
module.exports = router;
