const express = require("express");
const mongoose = require("mongoose");
const allowedEvents = require("../../config/allowedEvents");
const verifyToken = require("../../middleware/verifyToken");
const { getUserById } = require("../../functions/getUserById");
const { getCompetitionById } = require("../../functions/getCompetitionById");
const isAdmin = require("../../utils/helpers/isAdmin");
const router = express.Router();
router.delete("/:userId", verifyToken, isAdmin, async (req, res) => {
  try {
    const userId = req.params.userId; // userid to delete solves
    const compToDelete = req.body.competitionId;
    const eventToDelete = req.body.event;
    const roundToDelete = req.body.round;
    const solveToDelete = req.body.solve;
    checkTypes(solveToDelete, roundToDelete, eventToDelete, compToDelete, res);
    const competition = await getCompetitionById(compToDelete);
    if (!competition) {
      return res.status(400).json({
        message: `Natjecanje s tim ID-om nije pronađeno. ( Naveli ste: ${compToDelete} )`,
      });
    }
    if (competition.isLocked) {
      return res.status(403).json({
        message: "Natjecanje je zavrešeno i ne mogu se izbrisati.",
      });
    }
    const user = await getUserById(userId);
    if (!user) {
      return res.status(400).json({
        message: `Korisnik s tim ID-om nije pronađen. ( Naveli ste: ${userId} )`,
      });
    }
    const result = await deleteSolve(
      user,
      compToDelete,
      eventToDelete,
      roundToDelete,
      solveToDelete,
    );
    if (!result.success) {
      throw new Error(result);
    }
    await user.save();
    return res.status(result.status ? result.status : 200).json({
      message: result.message ? result.message : "Uspješno izbrisano.",
    });
  } catch (err) {
    console.error(`Error deleting solve:\n ${err}`);
    return res.status(err.status ? err.status : 500).json({
      message: err.message
        ? err.message
        : "Neuspjelo brisanje. Greška u serveru.",
    });
  }
});
async function deleteSolve(
  user,
  competitionId,
  eventName,
  roundNumber,
  solveNumber,
) {
  try {
    if (!user.competitions) {
      user.competitions = [];
    }
    const comp = user.competitions.find((userComp) => {
      return userComp.competitionId.equals(competitionId);
    });
    if (!comp) {
      console.log(
        `An attempt was made to delete a solve in a competition with ID ${competitionId} that was not found in user ${user._id}.`,
      );
      return {
        status: 400,
        message: `Natjecanje s tim ID-om na tom korisniku nije pronađeno. ( Naveli ste: compId: ${competitionId}, userId: ${user._id} )`,
      };
    }
    const eventToDelete = comp.events.find((event) => {
      return event.event === eventName;
    });
    if (!eventToDelete) {
      console.log(
        `An attempt was made to delete a solve in a competition with ID ${competitionId} and event ${eventName} that was not found in user ${user._id}. Competition and user were found while event was not.`,
      );
      return {
        status: 400,
        message: `Event "${eventName}" nije pronađen u natjecanju s ID-om ${competitionId} u korisniku ${user._id}.`,
      };
    }
    let roundToDelete = eventToDelete.rounds[roundNumber - 1];
    if (!roundToDelete) {
      console.log(
        `An attempt was made to delete a solve in a competition with ID ${competitionId} and event ${eventName} that was not found in user ${user._id}. Competition, user and event were found while round with number ${roundNumber} was not.`,
      );
      return {
        status: 400,
        message: `Runda ${roundNumber} u natjecanju s ID-om "${competitionId}" u korisniku "${user._id}" u eventu "${eventName}" nije pronađena.`,
      };
    }

    const solveIndex = solveNumber - 1;
    roundToDelete.splice(solveIndex, 1);
    await user.save();
    return {
      status: 200,
      success: true,
      message: `Uspješno izbrisano.`,
    };
  } catch (error) {
    console.error(`Error deleting solve:\n ${error}`);
    return {
      status: 500,
      message: `Neuspjelo brisanje. Greška u serveru.`,
    };
  }
}
function checkTypes(
  solveToDelete,
  roundToDelete,
  eventToDelete,
  compToDelete,
  res,
) {
  if (typeof roundToDelete !== "number") {
    res.status(400).json({ message: "Runda za brisanje treba biti broj." });
  }
  if (typeof solveToDelete !== "number") {
    res.status(400).json({ message: "Slaganje za brisanje treba biti broj." });
  }
  if (allowedEvents.indexOf(eventToDelete) === -1) {
    res.status(400).json({
      message: `Event natjecanja treba biti tekst. Naveli ste: ${eventToDelete}`,
    });
  }
  if (!mongoose.Types.ObjectId.isValid(compToDelete)) {
    return res.status(400).json({
      message: `ID nije valjan. Naveli ste: ${compToDelete}.`,
    });
  }
}
module.exports = router;
