// frontend/src/pages/Destinations.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Badge colors
const typeColors = {
  Domestic: "bg-green-500",
  International: "bg-blue-600",
};

// Shuffle array helper
const shuffleArray = (arr) => {
  return arr
    .map((a) => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1]);
};

// Infer type based on destination name
const inferType = (name) => {
  const lower = name.toLowerCase();
  if (lower.includes("beach") || lower.includes("bali") || lower.includes("maldives")) return "Beach";
  if (lower.includes("mountain") || lower.includes("hunza") || lower.includes("kalam")) return "Mountain";
  return "City";
};

export default function Destinations() {
  const [localTours, setLocalTours] = useState([]);
  const [intlTours, setIntlTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const [localRes, intlRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/public/tours/domestic`),
  axios.get(`${import.meta.env.VITE_API_URL}/api/public/tours/international`),
]);
        setLocalTours(localRes.data);
        setIntlTours(intlRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  // Extract unique destinations with badge type
  const getUniqueDestinations = (tours, category) => {
    const map = new Map();
    tours.forEach((tour) => {
      const destName = tour.destination || tour.title || "Unknown";
      if (!map.has(destName)) {
        map.set(destName, {
          name: destName,
          img: tour.image || "/images/default.jpg",
          category: category, // Domestic / International badge
          typeHint: inferType(destName), // Mountain / Beach / City
        });
      }
    });
    return shuffleArray(Array.from(map.values()));
  };

  const localDestinations = getUniqueDestinations(localTours, "Domestic");
  const intlDestinations = getUniqueDestinations(intlTours, "International");

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
              className={`absolute top-3 left-3 text-white px-3 py-1 rounded-full text-sm ${
                typeColors[dest.category] || "bg-gray-500"
              }`}
            >
              {dest.category === "Domestic" ? "🇵🇰 Domestic" : "🌍 International"}
            </span>
          </div>

          {/* Card title + type hint + button */}
          <div className="p-5">
            <h3 className="text-xl font-bold mb-1 hover:text-blue-600 transition">
              {dest.name}
            </h3>
            <p className="text-sm text-gray-500 mb-3">{dest.typeHint}</p>

            <button
              onClick={() =>
                navigate(`/tours?destination=${encodeURIComponent(dest.name)}`)
              }
              className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white px-8 py-3 rounded-lg font-semibold w-full hover:opacity-90 transition"
            >
              See Tours
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) return <p className="text-center mt-10">Loading destinations...</p>;

  return (
    <div className="font-sans text-gray-800">
      {/* Hero */}
      <section
        className="relative h-96 bg-cover bg-center rounded-b-3xl overflow-hidden"
        style={{ backgroundImage: "url('/images/paris.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-3">
            Explore Destinations
          </h1>
          <p className="text-white/90 text-lg md:text-2xl max-w-2xl">
            Discover local wonders and international marvels with our hand-picked travel spots.
          </p>
        </div>
      </section>

      {/* Local Destinations */}
      <section className="py-16 bg-gray-50 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Explore Pakistan</h2>
        {localDestinations.length > 0 ? (
          renderGrid(localDestinations)
        ) : (
          <p className="text-center text-gray-500">No domestic destinations available.</p>
        )}
      </section>

      {/* International Destinations */}
      <section className="py-16 bg-white max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">International Destinations</h2>
        {intlDestinations.length > 0 ? (
          renderGrid(intlDestinations)
        ) : (
          <p className="text-center text-gray-500">No international destinations available.</p>
        )}
      </section>
    </div>
  );
}
