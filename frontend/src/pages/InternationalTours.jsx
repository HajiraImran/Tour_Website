import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function InternationalTours() {
  const [tours, setTours] = useState([]);
  const [query, setQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const perPage = 6;
  const NAVY = "#1F2937";

  useEffect(() => {
    axios
.get(`${import.meta.env.VITE_API_URL}/api/public/tours/international`)
      .then((res) => setTours(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return tours.filter((t) => {
      const q = t.title.toLowerCase();
      return q.includes(query.toLowerCase()) && Number(t.price) <= maxPrice;
    });
  }, [tours, query, maxPrice]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

      {/* HERO */}
      <section className="relative h-72 rounded-3xl overflow-hidden mb-12 shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          className="w-full h-full object-cover"
          alt="International Tours"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold">International Tours</h1>
          <p className="text-lg md:text-xl mt-2">Explore the world with us</p>
        </div>
      </section>

      {/* SEARCH + PRICE */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 justify-between items-center">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Search tours..."
          className="pl-4 pr-4 py-2 border rounded-lg w-full md:w-72 focus:outline-none focus:ring-2"
          style={{ borderColor: NAVY }}
        />

        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            type="range"
            min="100"
            max="20000"
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
          No international tours found.
        </p>
      )}

      {/* TOURS GRID */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {paginated.map((tour) => (
          <article
            key={tour._id}
            className="relative bg-white rounded-3xl shadow-md hover:shadow-[0_10px_25px_rgba(31,43,55,0.2)] transition-transform hover:-translate-y-1"
          >
            <span className="absolute top-3 right-3 px-2 py-1 text-xs rounded-full bg-[#1F2937] text-white">
              🌍 International
            </span>

            <div className="overflow-hidden rounded-t-3xl">
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="p-5 space-y-2">
              <h3 className="font-semibold text-lg md:text-xl">{tour.title}</h3>

              {tour.startDate && tour.endDate && (
                <p className="text-sm text-gray-500">
                  📅 {new Date(tour.startDate).toLocaleDateString()} –{" "}
                  {new Date(tour.endDate).toLocaleDateString()}
                </p>
              )}

              <div className="flex items-center gap-1 text-yellow-400">
                {Array(5).fill(0).map((_, i) => (
                  <span key={i}>★</span>
                ))}
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
        ))}
      </div>

      {/* PAGINATION */}
      <div className="mt-12 flex justify-center items-center gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="p-2 rounded-full border disabled:opacity-50"
        >
          <HiChevronLeft className="text-xl" />
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className="px-3 py-1 rounded-full font-semibold"
            style={
              page === i + 1
                ? { backgroundColor: NAVY, color: "white" }
                : { color: NAVY }
            }
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="p-2 rounded-full border disabled:opacity-50"
        >
          <HiChevronRight className="text-xl" />
        </button>
      </div>
    </div>
  );
}
