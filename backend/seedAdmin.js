// seedAdmin.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const seedAdmin = async () => {
  try {
    // Check if admin already exists
    const existing = await Admin.findOne({ singleton: "onlyOneAdmin" });
    if (existing) {
      console.log("Admin already exists, skipping seeding.");
      process.exit();
    }

    // Hash password from env variable
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const admin = await Admin.create({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      singleton: "onlyOneAdmin",
    });

    console.log("Seeded admin created:", admin);
    process.exit();
  } catch (err) {
    console.error("Error seeding admin:", err);
    process.exit(1);
  }
};

seedAdmin();
