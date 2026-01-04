import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },

    tourId: { type: mongoose.Schema.Types.ObjectId, ref: "Tour" },
    tourTitle: { type: String },

    travelDates: { type: String },
    message: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Quote", quoteSchema);
