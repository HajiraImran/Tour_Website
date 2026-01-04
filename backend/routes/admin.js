import express from "express";
import Tour from "../models/Tour.js";

const router = express.Router();

/* =========================
   CREATE TOUR
========================= */
router.post("/tours", async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      durationDays,
      popular,
      Normal,
      TierTour,
      image,
      isInternational, // ✅ ADD
      locations = [],
      hotel = [],
      startDate,
      endDate,
      itinerary = [],
      services = [],
      terms = [],
      travelerInstructions = [],
      cancellation = [],
      refundPolicy = [],
      fastFacts = [],
    } = req.body;

    if (!image) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    const tour = await Tour.create({
      title,
      description,
      price,
      category,
      durationDays,
      popular: popular || false,
      Normal: Normal || false,
      TierTour: TierTour || false,
        isInternational: req.body.isInternational === true || req.body.isInternational === 'true', 
      image,
      locations,
      hotel,
      startDate,
      endDate,
      itinerary,
      services,
      terms,
      travelerInstructions,
      cancellation,
      refundPolicy,
      fastFacts,
    });

    res.status(201).json(tour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =========================
   GET ALL TOURS
========================= */
router.get("/tours", async (req, res) => {
  try {
    const tours = await Tour.find().sort({ createdAt: -1 });
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =========================
   GET SINGLE TOUR BY ID
========================= */
router.get("/tours/:id", async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    res.json(tour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =========================
   DELETE TOUR
========================= */
router.delete("/tours/:id", async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.json({ message: "Tour deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
