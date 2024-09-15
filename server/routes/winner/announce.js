const express = require("express");
const getUserById = require("../../functions/getUserById");
const winner = require("../../Models/winner");
const verifyToken = require("../../middleware/verifyToken");
const isAdmin = require("../../utils/helpers/isAdmin");
const router = express.Router();
router.post("/announce", verifyToken, isAdmin, async (req, res) => {
  try {
    const winnerId = req.body.id;
    const competitionId = req.body.competitionId;
    if (!winnerId) {
      return res.status(400).json({ message: "Id pobjednika je obavezan." });
    }
    if (!competitionId) {
      return res.status(400).json({ message: "Id netjacanja je obavezan." });
    }
    const allWinners = await winner.find();
    const winner = await getUserById(winnerId);
    const group = winner.group;
    if (!winner) {
      return res
        .status(400)
        .json({ message: "Korisnik s tim ID-om ne postoji." });
    }
    const sameWinner = checkIfWinnerIsSame(
      allWinners,
      competitionId,
      group,
      winnerId,
    );
    if (sameWinner) {
      // If winner exists in the same group, and the existing winner has the same id, then delete the existing winner
      await winner.findByIdAndDelete(sameWinner._id);
      return res.status(200).json({ message: "Pobjednik uspješno izbrisan." });
    }
    const differentWinner = checkIfWinnerExistsAndIsDifferent(
      allWinners,
      competitionId,
      group,
      winnerId,
    );
    if (differentWinner) {
      // If winner exists in the same group, but the existing winner has a different id, then update the existing winner
      differentWinner.id = winnerId;
      await differentWinner.save();
      return res
        .status(200)
        .json({ message: "Pobjednik uspješno promijenjen." });
    }
    // No winner exists in the same group, create a new winner
    const newWinner = new winner({ group, id: winnerId, competitionId });
    await newWinner.save();
    return res.status(201).json({ message: "Pobjednik uspješno objavljen." });
  } catch (error) {
    console.error("Error announcing the winner:", error);
    return res
      .status(500)
      .json({ message: "Greška prilikom objavljivanja pobjednika." });
  }
});
function checkIfWinnerIsSame(allWinners, competitionId, group, winnerId) {
  const existingWinner = allWinners.find((winner) => {
    if (winner.competitionId.equals(competitionId) && winner.group === group) {
      // Winner exists in the same group
      return winner.id === winnerId;
    }
    return false;
  });
  return existingWinner;
}
function checkIfWinnerExistsAndIsDifferent(
  allWinners,
  competitionId,
  group,
  winnerId,
) {
  const differentWinner = allWinners.find((winner) => {
    if (winner.competitionId.equals(competitionId) && winner.group === group) {
      // Winner exists in the same group
      return winner.id !== winnerId;
    }
    return false;
  });
  return differentWinner;
}
module.exports = router;
