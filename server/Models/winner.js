const mongoose = require("mongoose");
const winnerSchema = new mongoose.Schema([
  {
    competitionId: { type: mongoose.Schema.Types.ObjectId, required: true },
    group: { type: Number, enum: [1, 2], required: true }, // Only 1 winner per group
    id: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
]);
const winner = mongoose.model("winners", winnerSchema);

module.exports = winner;
