import { FaGlobeAmericas, FaMountain, FaUsers, FaHotel, FaMapMarkedAlt, FaClock } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as PieTooltip,
  ResponsiveContainer as PieResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as BarTooltip,
  ResponsiveContainer as BarResponsiveContainer,
} from "recharts";

export default function AboutPage() {
  // Pie chart data
  const pieData = [
    { name: "Domestic Tours", value: 60, color: "#1E40AF" },   // blue
    { name: "International Tours", value: 30, color: "#059669" }, // green
    { name: "Custom Packages", value: 10, color: "#9333EA" },    // purple
  ];

  // Bar chart data
  const barData = [
    { name: "Destinations", value: 50 },
    { name: "Tours Organized", value: 500 },
    { name: "Happy Travelers", value: 1000 },
    { name: "Hotels Partnered", value: 200 },
    { name: "Tour Packages", value: 150 },
    { name: "Customer Support", value: 24 },
  ];

  return (
    <div className="font-sans text-gray-800">

      {/* ================= HERO ================= */}
      <section
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            About Highland Escape Travellers
          </h1>
          <p className="text-lg md:text-2xl text-white max-w-3xl">
            Crafting unforgettable journeys across Pakistan and the world with
            hand-picked experiences, luxury, and adventure.
          </p>
        </div>
      </section>

      {/* ================= OUR MISSION ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At Highland Escape Travellers, our mission is to create personalized
            travel experiences that combine adventure, culture, and luxury.
            We believe in authentic journeys that leave lasting memories,
            whether exploring hidden gems in Pakistan or traveling across the
            globe.
          </p>
        </div>
      </section>

      {/* ================= OUR VISION ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff"
              alt="Vision"
              className="rounded-3xl shadow-lg object-cover w-full h-96"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We aim to be the leading travel experts, delivering seamless
              journeys that inspire, rejuvenate, and connect people with the
              beauty of the world. Every trip is designed to exceed expectations
              with personalized attention to detail.
            </p>
          </div>
        </div>
      </section>

      {/* ================= OUR STATS ================= */}
<section className="py-20 bg-gray-50">
  <div className="max-w-6xl mx-auto px-4 text-center">
    <h2 className="text-4xl font-bold mb-6">Our Stats</h2>
    <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
      We take pride in our journey. Here are some key statistics that reflect our experience and commitment.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

      {/* Pie Chart */}
      <div className="group relative rounded-3xl overflow-hidden shadow-xl p-8
                      bg-gradient-to-r from-gray-800 via-black to-gray-900 text-white
                      transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl
                      before:absolute before:inset-0 before:rounded-3xl
                      before:bg-gradient-to-r before:from-gray-800 before:via-gray-900 before:to-black
                      before:opacity-0 before:transition-opacity before:duration-500
                      hover:before:opacity-50">
        <h3 className="text-2xl font-bold mb-6">Tours Breakdown</h3>
        <PieResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <PieTooltip />
          </PieChart>
        </PieResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="group relative rounded-3xl overflow-hidden shadow-xl p-8
                      bg-gradient-to-r from-gray-800 via-black to-gray-900 text-white
                      transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl
                      before:absolute before:inset-0 before:rounded-3xl
                      before:bg-gradient-to-r before:from-gray-800 before:via-gray-900 before:to-black
                      before:opacity-0 before:transition-opacity before:duration-500
                      hover:before:opacity-50">
        <h3 className="text-2xl font-bold mb-6">Travel Statistics</h3>
        <BarResponsiveContainer width="100%" height={300}>
          <BarChart data={barData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />
            <XAxis dataKey="name" stroke="#ffffff99" />
            <YAxis stroke="#ffffff99" />
            <Bar dataKey="value" fill="#facc15" barSize={30} />
            <BarTooltip contentStyle={{ backgroundColor: "#111", borderColor: "#333" }} />
          </BarChart>
        </BarResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className="group relative rounded-3xl overflow-hidden shadow-xl p-8
                      bg-gradient-to-r from-gray-800 via-black to-gray-900 text-white
                      transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl
                      before:absolute before:inset-0 before:rounded-3xl
                      before:bg-gradient-to-r before:from-gray-800 before:via-gray-900 before:to-black
                      before:opacity-0 before:transition-opacity before:duration-500
                      hover:before:opacity-50">
        <h3 className="text-2xl font-bold mb-6">Tours Growth Over Years</h3>
        <BarResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { year: 2018, tours: 100 },
              { year: 2019, tours: 200 },
              { year: 2020, tours: 300 },
              { year: 2021, tours: 400 },
              { year: 2022, tours: 500 },
              { year: 2023, tours: 600 },
            ]}
            margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />
            <XAxis dataKey="year" stroke="#ffffff99" />
            <YAxis stroke="#ffffff99" />
            <Bar dataKey="tours" fill="#10B981" barSize={20} />
            <BarTooltip contentStyle={{ backgroundColor: "#111", borderColor: "#333" }} />
          </BarChart>
        </BarResponsiveContainer>
      </div>

    </div>
  </div>
</section>


      {/* ================= OUR ACHIEVEMENTS ================= */}
<section className="py-20 bg-gray-50">
  <div className="max-w-6xl mx-auto px-4 text-center">
    {/* Heading */}
    <h2 className="text-4xl font-bold mb-6">Our Achievements</h2>
    <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
      Over the years, we’ve delivered exceptional travel experiences. Here are some milestones we’re proud of:
    </p>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 text-center">
      
      {/* Example Stat Card */}
      <div className="group relative rounded-3xl overflow-hidden shadow-xl p-10 flex flex-col items-center
                      bg-gradient-to-r from-gray-800 via-black to-gray-900 text-white
                      transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl
                      before:absolute before:inset-0 before:rounded-3xl
                      before:bg-gradient-to-r before:from-gray-800 before:via-gray-900 before:to-black
                      before:opacity-0 before:transition-opacity before:duration-500
                      hover:before:opacity-50">
        <span className="text-5xl mb-4">🌍</span>
        <h3 className="text-3xl font-bold mb-2">100+</h3>
        <p>Destinations</p>
      </div>

      <div className="group relative rounded-3xl overflow-hidden shadow-xl p-10 flex flex-col items-center
                      bg-gradient-to-r from-gray-800 via-black to-gray-900 text-white
                      transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl
                      before:absolute before:inset-0 before:rounded-3xl
                      before:bg-gradient-to-r before:from-gray-800 before:via-gray-900 before:to-black
                      before:opacity-0 before:transition-opacity before:duration-500
                      hover:before:opacity-50">
        <span className="text-5xl mb-4">✈️</span>
        <h3 className="text-3xl font-bold mb-2">1000+</h3>
        <p>Tours Organized</p>
      </div>

      <div className="group relative rounded-3xl overflow-hidden shadow-xl p-10 flex flex-col items-center
                      bg-gradient-to-r from-gray-800 via-black to-gray-900 text-white
                      transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl
                      before:absolute before:inset-0 before:rounded-3xl
                      before:bg-gradient-to-r before:from-gray-800 before:via-gray-900 before:to-black
                      before:opacity-0 before:transition-opacity before:duration-500
                      hover:before:opacity-50">
        <span className="text-5xl mb-4">😃</span>
        <h3 className="text-3xl font-bold mb-2">1000+</h3>
        <p>Happy Travelers</p>
      </div>

      {/* Additional Stats */}
      <div className="group relative rounded-3xl overflow-hidden shadow-xl p-10 flex flex-col items-center
                      bg-gradient-to-r from-gray-800 via-black to-gray-900 text-white
                      transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl
                      before:absolute before:inset-0 before:rounded-3xl
                      before:bg-gradient-to-r before:from-gray-800 before:via-gray-900 before:to-black
                      before:opacity-0 before:transition-opacity before:duration-500
                      hover:before:opacity-50">
        <span className="text-5xl mb-4">🏨</span>
        <h3 className="text-3xl font-bold mb-2">200+</h3>
        <p>Hotels Partnered</p>
      </div>

      <div className="group relative rounded-3xl overflow-hidden shadow-xl p-10 flex flex-col items-center
                      bg-gradient-to-r from-gray-800 via-black to-gray-900 text-white
                      transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl
                      before:absolute before:inset-0 before:rounded-3xl
                      before:bg-gradient-to-r before:from-gray-800 before:via-gray-900 before:to-black
                      before:opacity-0 before:transition-opacity before:duration-500
                      hover:before:opacity-50">
        <span className="text-5xl mb-4">🗺️</span>
        <h3 className="text-3xl font-bold mb-2">500+</h3>
        <p>Tour Packages</p>
      </div>

      <div className="group relative rounded-3xl overflow-hidden shadow-xl p-10 flex flex-col items-center
                      bg-gradient-to-r from-gray-800 via-black to-gray-900 text-white
                      transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl
                      before:absolute before:inset-0 before:rounded-3xl
                      before:bg-gradient-to-r before:from-gray-800 before:via-gray-900 before:to-black
                      before:opacity-0 before:transition-opacity before:duration-500
                      hover:before:opacity-50">
        <span className="text-5xl mb-4">⏱️</span>
        <h3 className="text-3xl font-bold mb-2">24/7</h3>
        <p>Customer Support</p>
      </div>

    </div>
  </div>
</section>


      {/* ================= CTA ================= */}
      <section className="py-20 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Plan Your Next Adventure?
        </h2>
        <p className="mb-8 text-lg max-w-2xl mx-auto">
          Join thousands of travelers who trust Highland Escape Travellers for
          unforgettable journeys.
        </p>
        <button className="bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-transform">
          Book Your Tour
        </button>
      </section>
    </div>
  );
}
