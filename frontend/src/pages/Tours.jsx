import { useState, useMemo } from "react";
import { FaSearch, FaStar, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { createBooking } from "../api/bookings";

/* ---------- Sample Tours Data ---------- */
const SAMPLE_TOURS = [
  {
    id: "t1",
    title: "Beach Paradise — 5 Days",
    slug: "beach-paradise",
    desc: "Relax on sun-kissed beaches with crystal clear water and island hopping.",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    price: 499,
    durationDays: 5,
    category: "Beach",
    popular: true,
  },
  {
    id: "t2",
    title: "Mountain Adventure — 7 Days",
    slug: "mountain-adventure",
    desc: "Hike dramatic trails, sleep under the stars, and enjoy alpine vistas.",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    price: 699,
    durationDays: 7,
    category: "Adventure",
  },
  {
    id: "t3",
    title: "City Explorer — 3 Days",
    slug: "city-explorer",
    desc: "Guided city walks, museums, food tours and nightlife experiences.",
    img: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    price: 299,
    durationDays: 3,
    category: "City",
  },
  {
    id: "t4",
    title: "Cultural Highlights — 6 Days",
    slug: "cultural-highlights",
    desc: "Temples, local markets, traditional meals and cultural shows.",
    img: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    price: 549,
    durationDays: 6,
    category: "Culture",
  },
  {
    id: "t5",
    title: "Tropical Island Getaway — 4 Days",
    slug: "island-getaway",
    desc: "Snorkel, relax and enjoy a luxury beachfront stay.",
    img: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    price: 399,
    durationDays: 4,
    category: "Beach",
    popular: true,
  },
];

/* ---------- Small Helpers ---------- */
function Rating({ value }) {
  return (
    <div className="flex items-center gap-1 text-yellow-400 text-sm">
      <FaStar /> <span className="text-white font-semibold ml-1">{value}</span>
    </div>
  );
}

/* ---------- Booking Modal ---------- */
function BookingModal({ open, onClose, tour }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { tourId: tour.id, tourTitle: tour.title, name, email, date };
      const res = await createBooking(payload);
      if (res.message === "Booking saved successfully") {
        alert("🎉 Booking successful!");
        setName(""); setEmail(""); setDate("");
        onClose();
      } else {
        alert("Booking failed: " + res.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
      <div className="relative z-10 w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">{tour.title}</h3>
          <p className="text-gray-600 mb-4">{tour.desc}</p>
          <form onSubmit={submit} className="space-y-4">
            <input type="text" required placeholder="Full Name" value={name} onChange={e => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" />
            <input type="email" required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" />
            <input type="date" required value={date} onChange={e => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300" />
            <div className="flex justify-end gap-3">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border hover:bg-gray-100">Cancel</button>
              <button type="submit" disabled={loading}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold hover:from-gray-900 hover:via-gray-800 hover:to-black transition duration-300">
                {loading ? "Booking..." : "Book Now"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ---------- Main Tours Page ---------- */
export default function Tours() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1500);
  const [sortBy, setSortBy] = useState("popular");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const [bookingTour, setBookingTour] = useState(null);

  const categories = useMemo(() => ["All", ...new Set(SAMPLE_TOURS.map(t => t.category))], []);

  const filtered = useMemo(() => {
    let arr = SAMPLE_TOURS.filter(t => {
      const matchesQuery = `${t.title} ${t.desc}`.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" ? true : t.category === category;
      const matchesPrice = t.price <= maxPrice;
      return matchesQuery && matchesCategory && matchesPrice;
    });
    if (sortBy === "popular") arr.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0) || b.rating - a.rating);
    if (sortBy === "priceAsc") arr.sort((a, b) => a.price - b.price);
    if (sortBy === "priceDesc") arr.sort((a, b) => b.price - a.price);
    return arr;
  }, [query, category, maxPrice, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const gotoPage = (n) => {
    setPage(Math.max(1, Math.min(totalPages, n)));
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Hero Section */}
      <section className="relative h-72 rounded-2xl overflow-hidden mb-10">
        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80" alt="Travel Hero"
          className="w-full h-full object-cover brightness-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Discover Your Next Adventure</h1>
          <p className="text-white/90 mt-2 text-lg md:text-xl">Search and book unforgettable tours worldwide</p>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        {categories.map(c => (
          <button key={c} onClick={() => { setCategory(c); setPage(1); }}
            className={`px-4 py-2 rounded-full font-semibold ${category === c ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative w-full md:w-64">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={query} onChange={e => { setQuery(e.target.value); setPage(1); }}
            placeholder="Search tours..." className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full" />
        </div>
        <div className="flex gap-3 flex-wrap items-center">
          <input type="range" min="50" max="1500" value={maxPrice} onChange={e => { setMaxPrice(Number(e.target.value)); setPage(1); }}
            className="w-40" />
          <span className="text-gray-600 text-sm">Max: ${maxPrice}</span>
        </div>
      </div>

      {/* Tours Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {paginated.map(tour => (
          <article key={tour.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition">
            <div className="relative">
              <img src={tour.img} alt={tour.title} className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105" />
              {tour.popular && <span className="absolute top-3 left-3 bg-yellow-400 text-xs font-semibold px-3 py-1 rounded-full">Popular</span>}
              <div className="absolute right-3 top-3 bg-black/50 text-white px-2 py-1 rounded-md text-sm flex items-center gap-2">
                <Rating value={tour.rating} />
              </div>
            </div>
            <div className="p-5 flex flex-col justify-between h-[220px]">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{tour.title}</h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-3">{tour.desc}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="flex items-center gap-1 text-sm"><FaClock /> <span>{tour.durationDays}d</span></div>
                  <div className="flex items-center gap-1 text-sm"><FaMapMarkerAlt /> <span>{tour.category}</span></div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900">${tour.price}</div>
                  <div className="text-sm text-gray-500">per person</div>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <button onClick={() => alert('View details: ' + tour.title)} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm hover:bg-gray-50">View Details</button>
                <button onClick={() => setBookingTour(tour)} className="flex-none px-4 py-2 rounded-lg bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold">Book Now</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-between">
        <div className="text-sm text-gray-600">Showing {(page-1)*perPage+1}-{Math.min(page*perPage, filtered.length)} of {filtered.length} tours</div>
        <div className="flex items-center gap-2">
          <button onClick={() => gotoPage(page-1)} disabled={page===1} className="p-2 rounded-md bg-white border disabled:opacity-40"><HiChevronLeft /></button>
          <div className="hidden sm:flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => gotoPage(i+1)} className={`px-3 py-1 rounded ${page===i+1 ? "bg-gray-900 text-white" : "bg-white border"}`}>{i+1}</button>
            ))}
          </div>
          <button onClick={() => gotoPage(page+1)} disabled={page===totalPages} className="p-2 rounded-md bg-white border disabled:opacity-40"><HiChevronRight /></button>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal open={!!bookingTour} onClose={() => setBookingTour(null)} tour={bookingTour || SAMPLE_TOURS[0]} />
    </div>
  );
}
