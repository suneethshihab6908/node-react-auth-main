const express = require("express");
const Member = require("../models/Member");

const router = express.Router();

// Create Member
router.post("/", async (req, res) => {
  try {
    console.log("Received member creation request:", req.user);
    if (!req.user.roles || !req.user.roles.includes("ADMIN")) {
        return res.status(403).json({ message: "Access denied: Admins only" });
    }
    const member = new Member(req.body);
    await member.save();
    res.json({ message: "Member created successfully", member });
  } catch (err) {
    res.status(500).json({ message: "Error creating member", error: err.message });
  }
});

// Get All Members
router.get("/", async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: "Error fetching members" });
  }
});

// Get Single Member
router.get("/:id", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: "Error fetching member" });
  }
});

// Update Member
router.put("/:id", async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json({ message: "Member updated successfully", member });
  } catch (err) {
    res.status(500).json({ message: "Error updating member" });
  }
});

// Delete Member
router.delete("/:id", async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json({ message: "Member deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting member" });
  }
});

module.exports = router;