import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    tourId: { type: String, required: true },
    tourTitle: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
