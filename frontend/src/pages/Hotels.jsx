import React, { useState, useEffect } from "react";

const hotels = [
  { name: "Starlit Skardu", location: "Skardu", price: "Rs. 24k - 38k", img: "/images/Skardus.jpeg" },
  { name: "Avari Xpress", location: "Skardu", price: "Rs. 28k - 59k", img: "/images/Avari.jpg" },
  { name: "Starlit Gilgit", location: "Gilgit", price: "Rs. 12k - 24k", img: "/images/Gilgit1.jpeg" },
  { name: "Himmel Skardu", location: "Skardu", price: "Rs. 35k - 120k", img: "/images/himmel1.jpg" },
  { name: "Khoj Resort", location: "Skardu", price: "Rs. 48k - 57k", img: "/images/khoj1.jpg" },
  { name: "Qayam Skardu", location: "Skardu", price: "Rs. 19k - 26k", img: "/images/Qayam.jpg" },
  { name: "Ramada Gilgit", location: "Gilgit", price: "Rs. 30k", img: "/images/Ramada.jpg" },
  { name: "Maple Resort", location: "Hunza", price: "Rs. 15k - 26k", img: "/images/Maple.jpg" },
  { name: "Offto", location: "Hunza", price: "Rs. 30k", img: "/images/offto.jpg" },
  { name: "Hunza Luxus", location: "Hunza", price: "Rs. 18k - 89.5k", img: "/images/HunzaLuxus.jpg" },
  { name: "Byrsa", location: "Skardu", price: "Rs. 40k - 150k", img: "/images/Byarsa.jpg" },
  { name: "Dynasty", location: "Skardu", price: "Rs. 18k - 26k", img: "/images/dynasty1.jpg" },
  { name: "Khar", location: "Skardu", price: "Rs. 24k - 31k", img: "/images/Khar.jpeg" },
  { name: "Raikot Sarai", location: "Fairy Meadows", price: "Rs. 25k - 70k", img: "/images/Raikot.jpg" },
  { name: "K2 GreenPak Hotel", location: "Skardu", price: "Rs. 80k - 100k", img: "/images/K2.jpg" },
];

const locationColors = {
  Skardu: "bg-blue-600",
  Hunza: "bg-green-600",
  Gilgit: "bg-purple-600",
  "Fairy Meadows": "bg-emerald-600",
};

// Coordinates for OpenWeatherMap API
const locationCoords = {
  Skardu: { lat: 35.333, lon: 75.333 },
  Hunza: { lat: 36.3, lon: 74.8 },
  Gilgit: { lat: 35.920, lon: 74.308 },
  "Fairy Meadows": { lat: 35.330, lon: 74.090 },
};

// Replace with your free API key from OpenWeatherMap
const API_KEY = "360b607d50e7a3413f0f2321f33d777a";

export default function Hotels() {
  const [filter, setFilter] = useState("All");
  const [weatherData, setWeatherData] = useState({});
  const [heroWeather, setHeroWeather] = useState(null);

  // Fetch weather for all locations at once
  useEffect(() => {
    Object.keys(locationCoords).forEach(async (loc) => {
      const { lat, lon } = locationCoords[loc];
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const data = await res.json();
        setWeatherData((prev) => ({ ...prev, [loc]: data }));
      } catch (error) {
        console.error(`Weather fetch error for ${loc}:`, error);
      }
    });
  }, []);

  // Update hero weather whenever filter changes
  useEffect(() => {
    if (filter === "All") {
      setHeroWeather(null); // Or default to Skardu
    } else {
      setHeroWeather(weatherData[filter]);
    }
  }, [filter, weatherData]);

  const filteredHotels =
    filter === "All" ? hotels : hotels.filter((h) => h.location === filter);

  return (
    <div className="font-sans text-gray-800 max-w-7xl mx-auto px-4 py-12">

      {/* HERO */}
      <section className="relative h-72 rounded-3xl overflow-hidden mb-12 shadow-lg">
        <img
          src="/images/maldivess.jpg"
          alt="Hotels"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold">Hotels</h1>
          <p className="text-lg md:text-xl mt-2">
            Hand-picked stays across Northern Pakistan
          </p>

          {heroWeather && (
            <p className="mt-2 text-md md:text-lg font-semibold flex items-center gap-2">
              🌡 {Math.round(heroWeather.main.temp)}°C, {heroWeather.weather[0].main} in {filter}
            </p>
          )}
        </div>
      </section>

      {/* FILTERS */}
      <div className="flex justify-center gap-4 flex-wrap mb-12">
        {["All", "Skardu", "Hunza", "Gilgit", "Fairy Meadows"].map((loc) => (
          <button
            key={loc}
            onClick={() => setFilter(loc)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
              filter === loc
                ? "bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white shadow-lg"
                : "border border-gray-300 text-gray-800 hover:bg-gray-100"
            }`}
          >
            {loc}
          </button>
        ))}
      </div>

      {/* HOTELS GRID */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredHotels.map((hotel, i) => {
          const mapQuery = encodeURIComponent(`${hotel.name} ${hotel.location}`);
          const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
          const weather = weatherData[hotel.location];

          return (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
            >
              {/* IMAGE + BADGE */}
              <div className="relative h-56 overflow-hidden rounded-t-2xl">
                <img
                  src={hotel.img}
                  alt={hotel.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <span
                  className={`absolute top-3 left-3 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                    locationColors[hotel.location] || "bg-gray-600"
                  }`}
                >
                  📍 {hotel.location}{" "}
                  {weather && (
                    <span className="text-xs">
                      🌡 {Math.round(weather.main.temp)}°C, {weather.weather[0].main}
                    </span>
                  )}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-5 text-center">
                <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
                <p className="text-sm text-gray-500 mb-1">Starting from</p>
                <p className="text-lg font-semibold text-gray-900 mb-3">
                  {hotel.price} / Night
                </p>

                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  📍 View on Map
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredHotels.length === 0 && (
        <p className="text-center text-gray-500 mt-12">
          No hotels found for this location.
        </p>
      )}
    </div>
  );
}
