import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import publicRoutes from "./routes/publicRoutes.js";
import adminQuoteRoutes from "./routes/adminQuoteRoutes.js";
import publicQuoteRoutes from "./routes/publicQuoteRoutes.js";
import contactRoutes from "./routes/contact.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "https://highlandescapestravelers.com",
  
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/admin", adminQuoteRoutes);
app.use("/api/public", publicQuoteRoutes);
app.use("/api/contact", contactRoutes);

// Default route
app.get("/", (req, res) => res.send("API Running"));

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


