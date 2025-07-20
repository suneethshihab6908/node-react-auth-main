const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  reset_token: { type: String, default: null },
  roles: { type: [String], default: [] } // Add roles array field
});

module.exports = mongoose.model("srl_users", userSchema);