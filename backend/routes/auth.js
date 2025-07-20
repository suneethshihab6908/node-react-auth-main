const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Signup Route
/* router.post("/signup", async (req, res) => {
  try {
    console.log("Received signup request:", req.body);
    const { username, password, roles } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log(`Creating user with username: ${username}`);

    const user = new User({ username, password: hashedPassword, roles });
    await user.save();

    res.json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Error creating user" });
  }
}); */

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id, username: user.username, roles: user.roles }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
});

// Forgot Password
router.post("/forgot-password", async (req, res) => {
  try {
    const { username } = req.body;
    const resetToken = jwt.sign({ username }, process.env.JWT_RESET_SECRET, { expiresIn: "15m" });

    await User.updateOne({ username }, { reset_token: resetToken });

    console.log(`Reset link: http://localhost:3000/reset-password/${resetToken}`);
    res.json({ message: "Reset link sent to your email" });
  } catch (err) {
    res.status(500).json({ message: "Error updating token" });
  }
});

// Reset Password
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    jwt.verify(token, process.env.JWT_RESET_SECRET, async (err, decoded) => {
      if (err) return res.status(400).json({ message: "Invalid or expired token" });

      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      await User.updateOne(
        { username: decoded.username },
        { password: hashedPassword, reset_token: null }
      );
      res.json({ message: "Password reset successfully" });
    });
  } catch (err) {
    res.status(500).json({ message: "Error resetting password" });
  }
});

module.exports = router;