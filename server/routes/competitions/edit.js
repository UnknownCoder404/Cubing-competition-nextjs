const express = require("express");
const Competition = require("../../Models/competition");
const isAdmin = require("../../utils/helpers/isAdmin");
const verifyToken = require("../../middleware/verifyToken");
const router = express.Router();

router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, date, events } = req.body;
  const requesValidation = validateRequest(id, name, date, events);
  if (!requesValidation.isValid) {
    return res.status(400).json({ message: requesValidation.message });
  }
  try {
    const competition = await Competition.findById(id);
    if (!competition) {
      return res.status(404).json({ message: "Natjecanje ne postoji." });
    }
    if (competition.isLocked) {
      return res
        .status(403)
        .json({ message: "Natjecanje je zaključano i ne može se izmijeniti." });
    }
    competition.name = name;
    competition.date = date;
    competition.events = events;
    await competition.save();
    return res.status(200).json({ message: "Natjecanje je izmenjeno." });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Greška prilikom izmenu natjecanja" });
  }
});

function validateRequest(id, name, date, events) {
  if (!id || typeof id !== "string") {
    return { isValid: false, message: "ID je krivo unesen ili nedostaje." };
  }
  if (name && typeof name !== "string") {
    return { isValid: false, message: "Naziv je krivo unesen ili nedostaje." };
  }
  if (date && typeof date !== "string") {
    return { isValid: false, message: "Datum je krivo unesen ili nedostaje." };
  }
  if (events && typeof events !== "object") {
    return {
      isValid: false,
      message: "Događaji su krivo uneseni ili nedostaju.",
    };
  }
  return { isValid: true };
}

module.exports = router;
