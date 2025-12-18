// frontend/src/pages/Destinations.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const localDestinations = [
  { name: "Hunza", img: "/images/Hunza.jpg", type: "Mountain", desc: "Scenic valley with majestic mountains." },
  { name: "Naran", img: "/images/Naran.jpg", type: "Mountain", desc: "Adventure-filled valley and lakes." },
  { name: "Kalam", img: "/images/Kalam.jpg", type: "Mountain", desc: "Peaceful valley surrounded by nature." },
  { name: "Bali", img: "/images/bali.jpg", type: "Beach", desc: "Tropical paradise with stunning beaches." },
];

const internationalDestinations = [
  { name: "Maldives", img: "/images/maldives.jpg", type: "Beach", desc: "Relax on golden sands and crystal waters." },
  { name: "Paris", img: "/images/paris.jpg", type: "City", desc: "Explore the romantic city of lights." },
  { name: "Turkey", img: "/images/Turkey.jpg", type: "City", desc: "Rich history and beautiful landscapes." },
  { name: "Swiss Alps", img: "/images/newzealand.jpg", type: "Mountain", desc: "Breathtaking snowy mountains." },
];

// Badge colors
const typeColors = {
  Beach: "bg-yellow-400",
  Mountain: "bg-green-500",
  City: "bg-blue-600",
};

export default function Destinations() {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const filteredLocal =
    filter === "All" ? localDestinations : localDestinations.filter((d) => d.type === filter);
  const filteredInternational =
    filter === "All" ? internationalDestinations : internationalDestinations.filter((d) => d.type === filter);

  const renderGrid = (destinations) => (
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {destinations.map((dest, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
        >
          <div className="relative h-56">
            <img
              src={dest.img}
              alt={dest.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <span
              className={`absolute top-3 left-3 text-white px-3 py-1 rounded-full text-sm ${typeColors[dest.type]}`}
            >
              {dest.type}
            </span>
          </div>
          <div className="p-5">
            <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition">{dest.name}</h3>
            <p className="text-gray-600 mb-4">{dest.desc}</p>
            <button
              onClick={() =>
                navigate(`/destination/${dest.name.toLowerCase().replace(/\s+/g, "-")}`, {
                  state: { destination: dest },
                })
              }
              className="mt-2 w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold px-4 py-2 rounded-xl hover:from-gray-900 hover:via-gray-800 hover:to-black transition-all duration-300 shadow-md"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="font-sans text-gray-800">
      {/* Hero */}
      <section
        className="relative h-96 bg-cover bg-center rounded-b-3xl overflow-hidden"
        style={{ backgroundImage: "url('/images/paris.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-3">Explore Destinations</h1>
          <p className="text-white/90 text-lg md:text-2xl max-w-2xl">
            Discover local wonders and international marvels with our hand-picked travel spots.
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-12 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6">Filter by Type</h2>
        <div className="flex justify-center gap-4 flex-wrap">
          {["All", "Beach", "Mountain", "City"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2 rounded-full font-semibold transition duration-300 ${
                filter === type
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      {/* Local Destinations */}
      <section className="py-16 bg-gray-50 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Explore Pakistan</h2>
        {renderGrid(filteredLocal)}
      </section>

      {/* International Destinations */}
      <section className="py-16 bg-white max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">International Destinations</h2>
        {renderGrid(filteredInternational)}
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Adventure Today</h2>
          <p className="mb-8 text-lg md:text-xl">
            Book your dream destination with us and create unforgettable memories.
          </p>
          <button className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
            Book Now
          </button>
        </div>
      </section>
    </div>
  );
}
