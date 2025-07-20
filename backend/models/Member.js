const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  address: { type: String, required: true },
  postOffice: { type: String, required: true },
  pinCode: { type: String, required: true },
  city: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  email: { type: String, unique: true, required: true },
}, { timestamps: true });

module.exports = mongoose.model("srl_members", memberSchema);