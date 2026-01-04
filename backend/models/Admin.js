import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  singleton: { type: String, unique: true, default: "onlyOneAdmin" }, // ✅ enforce single admin
}, { timestamps: true });

export default mongoose.model("Admin", adminSchema);
