import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import publicRoutes from "./routes/publicRoutes.js";
import publicQuoteRoutes from "./routes/publicQuoteRoutes.js";
import contactRoutes from "./routes/contact.js";

dotenv.config();

const app = express();

/* ===== Fix __dirname for ES Modules ===== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ===== Middleware ===== */
app.use(express.json());

/* ===== CORS ===== */
/* When frontend & backend are on SAME DOMAIN, this is safest */
app.use(
  cors({
    origin: "https://highlandescapestravelers.com",
    credentials: true,
  })
);

/* ===== API Routes ===== */
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/public", publicQuoteRoutes);
app.use("/api/contact", contactRoutes);

/* ===== API Test ===== */
app.get("/api", (req, res) => {
  res.send("API Running");
});

/* ===== Serve React Frontend ===== */
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

/* ===== MongoDB Connection ===== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

/* ===== Start Server ===== */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
