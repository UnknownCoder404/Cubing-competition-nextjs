const express = require("express");
const router = express.Router();
const { getCompetitionById } = require("../../functions/getCompetitionById");
const verifyToken = require("../../middleware/verifyToken");
const isAdmin = require("../../utils/helpers/isAdmin");
router.post("/:id/lock", verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID je krivo unesen." });
    }
    const competition = await getCompetitionById(id);
    if (!competition) {
      return res.status(404).json({ message: "Natjecanje ne postoji." });
    }
    competition.isLocked = !competition.isLocked;
    await competition.save();
    if (competition.isLocked) {
      return res.status(200).json({ message: "Natjecanje je zaključano." });
    }
    return res.status(200).json({ message: "Natjecanje je otključano." });
  } catch (error) {
    console.error("Error locking competition: \n", error);
    return res
      .status(500)
      .json({ message: "Greška prilikom zaključavanja natjecanja." });
  }
});
module.exports = router;
