const mongoose = require("mongoose");

const highscoreSchema = new mongoose.Schema({
  username: { type: String, required: true },
  score: { type: String, required: true },
});

const Highscore = mongoose.model("Highscore", highscoreSchema);

module.exports = Highscore;
