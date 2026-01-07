import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Tours() {
  const [tours, setTours] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [page, setPage] = useState(1);

  const perPage = 6;
  const NAVY = "#1F2937";

  useEffect(() => {
    axios
.get(`${import.meta.env.VITE_API_URL}/api/public/tours`)
      .then((res) => setTours(res.data))
      .catch(console.error);
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(tours.map((t) => t.category).filter(Boolean))],
    [tours]
  );

  const filtered = useMemo(() => {
    return tours.filter((t) => {
      const q = `${t.title}`.toLowerCase();
      return (
        q.includes(query.toLowerCase()) &&
        (category === "All" || t.category?.toLowerCase() === category.toLowerCase()) &&
        Number(t.price) <= maxPrice
      );
    });
  }, [tours, query, category, maxPrice]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  // Split current page into international and domestic
  const internationalTours = paginated.filter((t) => t.isInternational);
  const domesticTours = paginated.filter((t) => !t.isInternational);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

      {/* HERO */}
      <section className="relative h-72 rounded-3xl overflow-hidden mb-12 shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          className="w-full h-full object-cover"
          alt="Tours"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/25 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold">Explore Our Tours</h1>
          <p className="text-lg md:text-xl mt-2">Find your perfect adventure</p>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => {
              setCategory(c);
              setPage(1);
            }}
            className="px-5 py-2 rounded-full font-semibold transition-colors duration-200"
            style={
              category === c
                ? { backgroundColor: NAVY, color: "white" }
                : { backgroundColor: "#E5E7EB", color: "#111827" }
            }
          >
            {c}
          </button>
        ))}
      </div>

      {/* SEARCH + PRICE */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 justify-between items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by tour title..."
          className="pl-4 pr-4 py-2 border rounded-lg w-full md:w-72 focus:outline-none focus:ring-2"
          style={{ borderColor: NAVY, color: "#111827" }}
        />
        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            type="range"
            min="100"
            max="10000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(+e.target.value)}
            className="w-full md:w-48"
            style={{ accentColor: NAVY }}
          />
          <span className="font-semibold" style={{ color: NAVY }}>
            ${maxPrice}
          </span>
        </div>
      </div>

      {/* NO RESULTS */}
      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No tours found. Try adjusting your filters.
        </p>
      )}

      {/* INTERNATIONAL TOURS */}
{internationalTours.length > 0 && (
  <section className="mb-12">
    <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#1F2937] mb-6 relative inline-block">
      International Tours
      <span className="block h-1 w-24 bg-[#1F2937] mx-auto mt-2 rounded-full"></span>
    </h2>
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {internationalTours.map((tour) => (
        <TourCard key={tour._id} tour={tour} NAVY={NAVY} />
      ))}
    </div>
  </section>
)}

{/* DOMESTIC TOURS */}
{domesticTours.length > 0 && (
  <section>
    <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#1F2937] mb-6 relative inline-block">
      🇵🇰 Domestic Tours
      <span className="block h-1 w-24 bg-[#1F2937] mx-auto mt-2 rounded-full"></span>
    </h2>
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {domesticTours.map((tour) => (
        <TourCard key={tour._id} tour={tour} NAVY={NAVY} />
      ))}
    </div>
  </section>
)}


      {/* PAGINATION */}
      <div className="mt-12 flex justify-center items-center gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="p-2 rounded-full border hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ color: NAVY }}
        >
          <HiChevronLeft className="text-xl" />
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className="px-3 py-1 rounded-full transition font-semibold"
            style={
              page === i + 1
                ? { backgroundColor: NAVY, color: "white" }
                : { borderColor: NAVY, color: NAVY }
            }
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="p-2 rounded-full border hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ color: NAVY }}
        >
          <HiChevronRight className="text-xl" />
        </button>
      </div>
    </div>
  );
}

// Reusable Tour Card component
function TourCard({ tour, NAVY }) {
  return (
    <article className="relative bg-white rounded-3xl shadow-md hover:shadow-[0_10px_25px_rgba(31,43,55,0.2)] transition-transform transform hover:-translate-y-1 hover:border hover:border-[#1F2937]">
      {tour.category && (
        <span className="absolute top-3 right-3 px-2 py-1 text-xs rounded-full bg-[#1F2937] text-white">
          {tour.category}
        </span>
      )}
      <div className="overflow-hidden rounded-t-3xl">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-5 space-y-2">
        <h3 className="font-semibold text-lg md:text-xl">{tour.title}</h3>
        <div className="flex gap-4 text-gray-600 text-sm mt-1">
          {tour.duration && <span>⏱ {tour.duration} days</span>}
          {tour.difficulty && <span>🥾 {tour.difficulty}</span>}
          {tour.highlights && <span>📍 {tour.highlights.join(", ")}</span>}
        </div>
        {tour.startDate && tour.endDate && (
          <p className="text-sm text-gray-500">
            📅 {new Date(tour.startDate).toLocaleDateString()} –{" "}
            {new Date(tour.endDate).toLocaleDateString()}
          </p>
        )}
        <div className="flex items-center gap-1 text-yellow-400">
          {Array(5).fill(0).map((_, i) => <span key={i}>★</span>)}
          <span className="text-gray-500 text-sm">(120 reviews)</span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-xl font-bold" style={{ color: NAVY }}>
            ${tour.price}
          </div>
          <Link
            to={`/tours/${tour._id}`}
            className="px-4 py-2 rounded-lg text-sm shadow hover:opacity-90 transition font-semibold"
            style={{ backgroundColor: NAVY, color: "white" }}
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
