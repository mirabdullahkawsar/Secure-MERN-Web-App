// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    data: String,
    iv: String,
    mac: String,
  },
  email: {
    data: String,
    iv: String,
    mac: String,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
