const Competition = require("../Models/competition");

async function getCompetitionById(id, fields = null) {
  try {
    if (fields) {
      return await Competition.findOne({ _id: { $eq: id } }).select(fields);
    } else {
      return await Competition.findOne({ _id: { $eq: id } });
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
module.exports = { getCompetitionById };
