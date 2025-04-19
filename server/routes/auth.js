// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/User");
const { encrypt, decrypt, verifyMac } = require("../utils/encryption");

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const encName = encrypt(name);
    const encEmail = encrypt(email);

    const newUser = new User({
      name: encName,
      email: encEmail,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await User.find();

    let foundUser = null;
    for (let user of users) {
      const decEmail = decrypt(user.email.data, user.email.iv);
      const validMac = verifyMac(user.email.data, user.email.mac);
      if (validMac && decEmail === email) {
        foundUser = user;
        break;
      }
    }

    if (!foundUser) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const decName = decrypt(foundUser.name.data, foundUser.name.iv);
    res.status(200).json({ message: "Login successful", name: decName });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;