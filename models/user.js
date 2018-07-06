const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);