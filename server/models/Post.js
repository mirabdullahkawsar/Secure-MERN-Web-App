// models/Post.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: {
    data: String,
    iv: String,
    mac: String,
  },
  author: String,
});

module.exports = mongoose.model("Post", postSchema);

