import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaStar,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaHotel,
  FaClock,
  FaFileAlt,
  FaUser,
  FaTimesCircle,
} from "react-icons/fa";

export default function TourDetails() {
  const { id } = useParams();

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("itinerary");

  // Quote form state
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    email: "",
    tourDate: "",
    tourName: "",
    notes: "",
  });
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/public/tours/${id}`)
      .then((res) => {
        setTour(res.data);
        setLoading(false);
        setQuoteForm((prev) => ({ ...prev, tourName: res.data.title }));
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleQuoteChange = (e) => {
    const { name, value } = e.target;
    setQuoteForm({ ...quoteForm, [name]: value });
  };

  const handleQuoteSubmit = async (e) => {
  e.preventDefault();
  setQuoteLoading(true);

  try {
    await axios.post("http://localhost:5000/api/public/get-quote", {
      name: quoteForm.name,
      email: quoteForm.email,
      tourId: tour?._id,
      tourTitle: tour?.title,
      travelDates: quoteForm.tourDate, // ✅ mapped
      message: quoteForm.notes,        // ✅ mapped
    });

    setQuoteSuccess(true);

    setQuoteForm({
      name: "",
      email: "",
      tourDate: "",
      tourName: tour?.title || "",
      notes: "",
    });
  } catch (err) {
    console.error(err.response?.data || err);
    alert("Failed to send quote request");
  } finally {
    setQuoteLoading(false);
  }
};


  if (loading)
    return <p className="text-center mt-28 text-lg text-gray-300">Loading...</p>;
  if (!tour)
    return (
      <p className="text-center mt-28 text-red-500 text-lg">Tour not found.</p>
    );

  const renderCardItem = (icon, content) => (
    <div className="flex items-start gap-3 p-4 rounded-xl shadow-lg bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-200 hover:shadow-2xl transition">
      {icon && <div className="mt-1">{icon}</div>}
      <div>{content}</div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 pt-28 pb-16">

      {/* IMAGE + DETAILS + STICKY GET A QUOTE */}
      <div className="grid md:grid-cols-3 gap-10 items-start">

        {/* Tour Image and Top Card */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
          />

          {/* Top Info Card */}
          <div className="flex flex-col gap-4 bg-gradient-to-r from-gray-800 via-gray-900 to-black p-6 rounded-xl shadow-lg -mt-20 relative z-10">

            <h1 className="text-3xl md:text-4xl font-bold text-white">{tour.title}</h1>

            <div className="flex items-center gap-2 text-yellow-400 mt-1">
              <FaStar /> <span className="text-white font-semibold">{tour.rating || 4.5}</span>
            </div>

            {/* Overview */}
            {tour.description && (
              <div>
                <h2 className="text-xl font-semibold text-white mt-4">Overview</h2>
                <p className="text-gray-200 mt-2">{tour.description}</p>
              </div>
            )}

            {/* Locations */}
            {tour.locations?.length > 0 && (
              <div className="mt-2">
                <p className="flex items-center gap-2 text-white font-semibold">
                  <FaMapMarkerAlt /> Locations:
                </p>
                <ul className="list-disc list-inside text-gray-200 mt-1">
                  {tour.locations.map((loc, i) => (
                    <li key={i}>{loc}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Dates & Duration */}
            {tour.startDate && tour.endDate && (
              <p className="flex items-center gap-2 text-white mt-2">
                <FaCalendarAlt /> {new Date(tour.startDate).toLocaleDateString()} –{" "}
                {new Date(tour.endDate).toLocaleDateString()}
              </p>
            )}
            <p className="flex items-center gap-2 text-white mt-2">
              <FaClock /> {tour.durationDays} Days
            </p>

            {/* Fast Facts */}
            {tour.fastFacts?.length > 0 && (
              <div className="mt-2">
                <p className="flex items-center gap-2 text-white font-semibold">Fast Facts:</p>
                <ul className="list-disc list-inside text-gray-200 mt-1">
                  {tour.fastFacts.map((fact, i) => (
                    <li key={i}>{fact}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            <div className="flex gap-3 mt-2">
              {tour.popular && <span className="px-3 py-1 bg-yellow-500 text-black rounded-full font-semibold">Popular</span>}
              {tour.Normal && <span className="px-3 py-1 bg-green-500 text-black rounded-full font-semibold">Normal</span>}
              {tour.TierTour && <span className="px-3 py-1 bg-indigo-500 text-white rounded-full font-semibold">Tier Tour</span>}
            </div>
          </div>
        </div>

        {/* Sticky Get a Quote Box */}
        <div className="md:col-span-1">
  <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-200 p-6 rounded-xl shadow-md sticky top-28">
    <h2 className="text-xl font-bold mb-4">Get a Quote</h2>

    {quoteSuccess && (
      <p className="text-green-400 mb-3 font-semibold">
        Your request has been sent successfully!
      </p>
    )}

    <form className="flex flex-col gap-3" onSubmit={handleQuoteSubmit}>
      <input
        type="text"
        name="name"
        value={quoteForm.name}
        onChange={handleQuoteChange}
        placeholder="Your Name"
        className="border border-gray-600 p-2 rounded w-full bg-transparent text-white placeholder-gray-300"
        required
      />

      <input
        type="email"
        name="email"
        value={quoteForm.email}
        onChange={handleQuoteChange}
        placeholder="Your Email"
        className="border border-gray-600 p-2 rounded w-full bg-transparent text-white placeholder-gray-300"
        required
      />

      <input
        type="date"
        name="tourDate"
        value={quoteForm.tourDate}
        onChange={handleQuoteChange}
        className="border border-gray-600 p-2 rounded w-full bg-transparent text-white"
        required
      />

      <input
        type="text"
        name="tourName"
        value={quoteForm.tourName}
        disabled
        className="border border-gray-600 p-2 rounded w-full bg-gray-700 text-white"
      />

      <textarea
        name="notes"
        value={quoteForm.notes}
        onChange={handleQuoteChange}
        placeholder="Anything else we should know?"
        className="border border-gray-600 p-2 rounded w-full bg-transparent text-white placeholder-gray-300"
        rows={4}
      />

      <button
        type="submit"
        className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-400 transition"
        disabled={quoteLoading}
      >
        {quoteLoading ? "Sending..." : "Send Message"}
      </button>
    </form>
  </div>
</div>

      </div>

      {/* TABS */}
      <div className="mt-12">
        <div className="flex flex-wrap gap-3 border-b pb-3">
          {[
            ["itinerary", "Itinerary"],
            ["hotels", "Hotels"],
            ["services", "Services"],
            ["terms", "Terms & Conditions"],
            ["traveler", "Traveler Info"],
            ["cancel", "Cancellation Policy"],
            ["refund", "Refund Policy"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-t-lg font-semibold transition ${
                activeTab === key
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-4">

          {activeTab === "itinerary" &&
            tour.itinerary?.map((item, idx) =>
              renderCardItem(<FaCalendarAlt className="text-yellow-400 mt-1" />, <><strong>Day {idx + 1}:</strong> {item}</>)
            )}

          {activeTab === "hotels" &&
            tour.hotel?.map((h, i) =>
              renderCardItem(<FaHotel className="text-yellow-400 mt-1" />, h)
            )}

          {activeTab === "services" &&
            tour.services?.map((s, i) =>
              renderCardItem(<FaStar className="text-yellow-400 mt-1" />, s)
            )}

          {activeTab === "terms" &&
            tour.terms?.map((t, i) =>
              renderCardItem(<FaFileAlt className="text-gray-200 mt-1" />, t)
            )}

          {activeTab === "traveler" &&
            tour.travelerInstructions?.map((t, i) =>
              renderCardItem(<FaUser className="text-gray-200 mt-1" />, t)
            )}

          {activeTab === "cancel" &&
            tour.cancellation?.map((c, i) =>
              renderCardItem(<FaTimesCircle className="text-red-500 mt-1" />, c)
            )}

          {activeTab === "refund" &&
            tour.refundPolicy?.map((r, i) =>
              renderCardItem(<FaFileAlt className="text-red-400 mt-1" />, r)
            )}
        </div>
      </div>
    </div>
  );
}
