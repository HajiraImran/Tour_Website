import express from "express";
import Quote from "../models/Quote.js";
import { verifyAdmin } from "../middleware/auth.js"; // ✅ FIX

const router = express.Router();

/* =========================
   GET ALL QUOTES (ADMIN)
========================= */
router.get("/quotes", verifyAdmin, async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =========================
   DELETE QUOTE
========================= */
router.delete("/quotes/:id", verifyAdmin, async (req, res) => {
  await Quote.findByIdAndDelete(req.params.id);
  res.json({ message: "Quote deleted" });
});

export default router;
