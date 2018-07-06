const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Exercise', ExerciseSchema);