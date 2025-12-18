import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function DestinationDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { destination } = location.state || {};

  if (!destination) return <p className="p-10 text-center">Destination not found!</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
        <img src={destination.img} alt={destination.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl text-white font-bold">{destination.name}</h1>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-3xl font-bold mb-4">About this trip</h2>
        <p className="text-gray-700 mb-6">{destination.desc}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold mb-2">Type:</h3>
            <p>{destination.type}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Packages:</h3>
            <p>Standard, Premium, Luxury</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Duration:</h3>
            <p>3–7 Days (Varies by package)</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Cost:</h3>
            <p>$299 – $999 per person</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => alert("Booking functionality coming soon!")}
            className="px-6 py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white rounded-xl font-semibold hover:from-gray-900 hover:via-gray-800 hover:to-black transition duration-300"
          >
            Book Now
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-100 transition duration-300"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
