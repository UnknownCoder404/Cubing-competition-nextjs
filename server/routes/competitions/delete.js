const express = require("express");
const Competition = require("../../Models/competition");
const isAdmin = require("../../utils/helpers/isAdmin");
const verifyToken = require("../../middleware/verifyToken");
const router = express.Router();

router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  const { id } = req.params;
  if (!id || typeof id !== "string") {
    return res
      .status(400)
      .json({ message: "ID je krivo unesen ili nedostaje." });
  }
  try {
    const competition = await Competition.findById(id);
    if (!competition) {
      return res.status(404).json({ message: "Natjecanje ne postoji." });
    }
    if (competition.isLocked) {
      return res
        .status(403)
        .json({ message: "Natjecanje je zaključano i ne može se izbrisati." });
    }
    await competition.deleteOne();
    return res.status(200).json({ message: "Natjecanje je izbrisano." });
  } catch (err) {
    console.error("Error deleting competition: \n", err);
    return res
      .status(500)
      .json({ message: "Greška prilikom brisanja natjecanja" });
  }
});

module.exports = router;
