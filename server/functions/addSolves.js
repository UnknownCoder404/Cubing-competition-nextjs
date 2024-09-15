const User = require("../Models/user");
/**
 * Function to update solver's solves in a given competition and round
 * @param {mongoose.Model} solver - Mongoose model for the user schema
 * @param {Object} events - Object with event (String) and solves (array)
 * @param {Number} round - The round number to add solves to
 * @param {mongoose.Model} competition - Mongoose model for the competition schema
 */
async function updateSolves(
  solver,
  events,
  round,
  competition,
  replace = false,
) {
  try {
    // Find the user who is the solver
    const user = await User.findById(solver._id);
    if (!user) throw new Error("User not found");
    if (!user.competitions) user.competitions = [];
    console.time("Add solve");
    // Find the competition the user participated in
    let userCompetition = user.competitions.find((comp) =>
      comp.competitionId.equals(competition._id),
    );
    if (!userCompetition) {
      user.competitions.push({ competitionId: competition._id, solves: [] });
      userCompetition = user.competitions.find((comp) =>
        comp.competitionId.equals(competition._id),
      );
    }

    // Find the event in the user's competition data
    let userEvent = userCompetition.events.find(
      (event) => event.event === events.event,
    );
    if (!userEvent) {
      // If event doesn't exist, create a new one
      userCompetition.events.push({ event: events.event, rounds: [] });
      userEvent = userCompetition.events.find(
        (event) => event.event === events.event,
      );
    }
    // If you add solves to round 2 and there are no solves in round 1, round 1 is null and it needs to be replaced
    if (!userEvent.rounds[round - 1]) {
      replace = true;
    }
    // Add the new solves to the specified round
    if (replace) {
      userEvent.rounds[round - 1] = events.rounds;
    } else {
      userEvent.rounds[round - 1].push(...events.rounds);
    }
    if (userEvent.rounds[round - 1].length > 5) {
      userEvent.rounds[round - 1] = userEvent.rounds[round - 1].slice(0, 5);
    }
    console.timeEnd("Add solve");
    // Save the updated user data
    await user.save();
    console.log("Solves updated successfully");
    return 1;
  } catch (error) {
    console.error("Error updating solves:", error);
    return -1;
  }
}

module.exports = updateSolves;
