import express from "express";
import Tour from "../models/Tour.js";

const router = express.Router();

/* ======================
   GET ALL TOURS
====================== */
router.get("/tours", async (req, res) => {
  try {
    const tours = await Tour.find().sort({ createdAt: -1 });
    res.status(200).json(tours);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tours" });
  }
});


/* ======================
   GET INTERNATIONAL TOURS
====================== */
router.get("/tours/international", async (req, res) => {
  try {
    const tours = await Tour.find({ isInternational: true }).sort({ createdAt: -1 });
    res.status(200).json(tours);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch international tours" });
  }
});

/* ======================
   GET DOMESTIC TOURS
====================== */
router.get("/tours/domestic", async (req, res) => {
  try {
    const tours = await Tour.find({ isInternational: false }).sort({ createdAt: -1 });
    res.status(200).json(tours);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch domestic tours" });
  }
});

/* ======================
   GET SINGLE TOUR (DETAIL PAGE)
====================== */
router.get("/tours/:id", async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    res.status(200).json(tour);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tour details" });
  }
});


export default router;
