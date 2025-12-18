import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// POST: Save a booking
router.post("/", async (req, res) => {
  try {
    const { tourId, tourTitle, name, email, date } = req.body;

    if (!tourId || !name || !email || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const booking = new Booking({
      tourId,
      tourTitle,
      name,
      email,
      date,
    });

    await booking.save();

    res.status(201).json({ message: "Booking saved successfully", booking });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
