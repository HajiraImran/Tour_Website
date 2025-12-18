import express from "express";
import Tour from "../models/Tour.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

// --- Admin Dashboard ---
router.get("/dashboard", verifyAdmin, (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard", adminId: req.admin.id });
});

// --- Get All Tours ---
router.get("/tours", verifyAdmin, async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Add a New Tour ---  <--- Yahan dalen
router.post("/tours", verifyAdmin, async (req, res) => {
  try {
    const { title, description, img } = req.body;

    if (!title || !description)
      return res.status(400).json({ message: "Title and description required" });

    const tour = await Tour.create({ title, description, img });
    res.status(201).json(tour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Delete a Tour ---
router.delete("/tours/:id", verifyAdmin, async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.json({ message: "Tour deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
