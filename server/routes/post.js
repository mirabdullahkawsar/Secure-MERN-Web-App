// routes/post.js
const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { encrypt, decrypt, verifyMac } = require("../utils/encryption");

// Create post
router.post("/", async (req, res) => {
  try {
    const { content, author } = req.body;
    const enc = encrypt(content);
    const newPost = new Post({
      content: enc,
      author,
    });
    await newPost.save();
    res.status(201).json({ message: "Post created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    const decryptedPosts = posts.map((post) => {
      const validMac = verifyMac(post.content.data, post.content.mac);
      if (!validMac) return null;
      return {
        content: decrypt(post.content.data, post.content.iv),
        author: post.author,
      };
    }).filter(Boolean);

    res.status(200).json(decryptedPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
