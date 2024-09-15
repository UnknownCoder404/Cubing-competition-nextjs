const express = require("express");
const User = require("../../Models/user");
const { getCompetitionById } = require("../../functions/getCompetitionById");
const getResultsInExcel = require("../../routes/excel/results-controller");
const verifyToken = require("../../middleware/verifyToken");
const cache = require("../../middleware/cache");
const isAdmin = require("../../utils/helpers/isAdmin");
const router = express.Router();
router.get("/", cache(10), verifyToken, isAdmin, async (req, res) => {
  try {
    const queryString = req.url.split("?")[1];
    const params = new URLSearchParams(queryString);
    const competitionId = params.get("competitionId");

    if (!competitionId) {
      res.status(400).json({ message: "Competition id not provided." });
      return;
    }
    const users = await User.find();
    const competition = await getCompetitionById(competitionId);
    const fileName = competition.name + ".xlsx";
    const workbook = await getResultsInExcel(users, competition);
    // Set the headers to prompt download on the client side
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    // Pipe the workbook to the response
    console.time("Send workbook");
    workbook.xlsx.write(res).then(() => {
      console.timeEnd("Send workbook");
      res.end();
    });
  } catch (error) {
    console.error("Failed to generate results in excel format:");
    console.error(error);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
