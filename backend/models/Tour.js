import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
  isInternational: { type: Boolean, default: false },
    durationDays: { type: Number, required: true },
    rating: { type: Number, default: 4.5 },
    popular: { type: Boolean, default: false },
    Normal: { type: Boolean, default: false },
    TierTour: { type: Boolean, default: false },



    locations: { type: [String], default: [] },
    hotel: { type: [String], default: [] }, // ✅ multiple hotels
    startDate: { type: Date },
    endDate: { type: Date },

    itinerary: { type: [String], default: [] },
    services: { type: [String], default: [] },
    terms: { type: [String], default: [] },
    travelerInstructions: { type: [String], default: [] },
    cancellation: { type: [String], default: [] },

    refundPolicy: { type: [String], default: [] }, // ✅ new multi-line field
    fastFacts: { type: [String], default: [] }, // ✅ new multi-line field
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);
