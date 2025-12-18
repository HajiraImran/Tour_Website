import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  price: { type: Number },
  popular: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Tour", tourSchema);
