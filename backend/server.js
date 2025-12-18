import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";





dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);






// Default
app.get("/", (req, res) => res.send("API Running"));

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

app.listen(5000, () => console.log("Server running on port 5000"));
console.log("Gemini Key Loaded?", process.env.GEMINI_API_KEY ? "YES" : "NO");

