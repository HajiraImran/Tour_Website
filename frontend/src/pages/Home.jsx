import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  GiPalmTree,
  GiMountainClimbing,
  GiTempleGate,
  GiWorld,
  GiCommercialAirplane,
  GiModernCity
} from "react-icons/gi";

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

import TourCategoriesSlider from "../components/TourCategoriesSlider";
import TopDestinations from "../components/TopDestinations";
import TopInternationalDestinations from "../components/TopInternationalDestinations";
import Testimonials from "../components/Testimonials";
import TourCard from "../components/TourCard";
import WhyChooseCard from "../components/WhyChooseCard";
import Modal from "../components/Modal";
import ContactForm from "../components/ContactForm";
import GallerySection from "../components/GallerySection";



export default function Home() {
  /* ---------------- HERO VIDEOS ---------------- */
  const videos = [
    "/videos/travel1.mp4",
    "/videos/travel2.mp4",
    "/videos/travel3.mp4",
    "/videos/travel4.mp4",
    "/videos/travels.mp4",
  ];
  const [currentVideo, setCurrentVideo] = useState(0);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [showContactModal, setShowContactModal] = useState(false);
  // Add this near the top with other states
const [showPosterPopup, setShowPosterPopup] = useState(false);
const [fadePoster, setFadePoster] = useState(false); // controls fade-in/out


// Show poster popup 2 seconds after page loads
useEffect(() => {
  const timer = setTimeout(() => {
    setShowPosterPopup(true); // show popup
    setFadePoster(true);      // start fade-in
  }, 2000); // delay 2 seconds

  return () => clearTimeout(timer);
}, []);


// Auto-hide poster popup after 5 seconds
useEffect(() => {
  if (showPosterPopup) {
    const autoClose = setTimeout(() => {
      setFadePoster(false); // start fade-out
      // remove popup after fade duration
      setTimeout(() => setShowPosterPopup(false), 500); // match fade duration
    }, 30000); // visible for 5 seconds

    return () => clearTimeout(autoClose);
  }
}, [showPosterPopup]);

        const [activeCard, setActiveCard] = useState(null);





  /* ---------------- DOMESTIC TOURS ---------------- */
  const [domesticTours, setDomesticTours] = useState([]);
  const [loadingDomesticTours, setLoadingDomesticTours] = useState(true);

  useEffect(() => {
    axios
.get(`${import.meta.env.VITE_API_URL}/api/public/tours/domestic`)
      .then((res) => setDomesticTours(res.data.slice(0, 3))) // show 3 tours on home
      .catch(console.error)
      .finally(() => setLoadingDomesticTours(false));
  }, []);

  /* ---------------- INTERNATIONAL TOURS ---------------- */
  const [internationalTours, setInternationalTours] = useState([]);
  const [loadingInternationalTours, setLoadingInternationalTours] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/public/tours/international`)
      .then((res) => setInternationalTours(res.data.slice(0, 3)))
      .catch(console.error)
      .finally(() => setLoadingInternationalTours(false));
  }, []);

  /* ---------------- POPULAR DESTINATIONS ---------------- */
  const destinations = [
    { name: "Skardu", img: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff" },
    { name: "Hunza", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
    { name: "Fairy Meadows", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34" },
    { name: "Naltar Valley", img: "https://images.unsplash.com/photo-1493558103817-58b2924bce98" },
  ];

  /* ---------------- SERVICES ---------------- */
  const services = [
    {
      title: "Luxury Travel",
      desc: "Experience hand-crafted luxury packages with premium accommodations and curated experiences.",
      icon: <GiPalmTree size={50} className="mb-4 text-blue-600" />,
    },
    {
      title: "Adventure Tours",
      desc: "Thrilling adventures across mountains, rivers, and deserts for the thrill-seekers.",
      icon: <GiMountainClimbing size={50} className="mb-4 text-green-600" />,
    },
    {
      title: "Cultural Trips",
      desc: "Explore the rich heritage, traditions, and culture of amazing destinations.",
      icon: <GiTempleGate size={50} className="mb-4 text-red-600" />,
    },
    {
      title: "Customized Packages",
      desc: "Tailor-made itineraries to match your interests, schedule, and budget.",
      icon: <GiWorld size={50} className="mb-4 text-purple-600" />,
    },
    {
      title: "Hotel Booking",
      desc: "Comfortable and affordable hotel bookings with trusted partners in Pakistan and abroad.",
      icon: <GiModernCity size={50} className="mb-4 text-indigo-600" />,
    },
    {
      title: "Easy Flight Booking",
      desc: "Quick and hassle-free domestic and international flight booking services.",
      icon: <GiCommercialAirplane size={50} className="mb-4 text-sky-600" />,
    },
    {
      title: "Pakistan Tour Packages",
      desc: "Explore the natural beauty of Pakistan with professionally planned tour packages.",
      icon: <GiPalmTree size={50} className="mb-4 text-emerald-600" />,
    },
    {
      title: "International Tour Packages",
      desc: "Travel the world with premium international tour packages tailored for you.",
      icon: <GiWorld size={50} className="mb-4 text-violet-600" />,
    },
  ];
  /* ---------------- WHY CHOOSE US ITEMS ---------------- */

  const items = [
          {
            icon: "🌟",
            title: "Exceptional Service",
            desc: "From the moment you reach out, our team provides personalized support tailored to your needs, ensuring a seamless, stress-free, and unforgettable travel experience."
          },
          {
            icon: "🏔️",
            title: "Curated Experiences",
            desc: "We take care of every travel detail, including flights, airport transfers, hotel bookings, and local transport to make your journey smooth and stress-free."
          },
          {
            icon: "💎",
            title: "Premium Quality",
            desc: "We help you create unforgettable memories with guided tours, photography tips, cultural immersion, and unique local experiences."
          },
          {
            icon: "🌍",
            title: "Global & Local Tours",
            desc: "Experience premium travel at competitive prices. Our hand-crafted itineraries provide exceptional value without compromising comfort or experience."
          },
        ];


  return (
    <div className="font-sans text-gray-800">

      {/* ================= HERO ================= */}
      <section className="relative h-screen w-screen overflow-hidden">
        {videos.map((vid, index) => (
          <video
            key={index}
            autoPlay
            muted
            loop
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              currentVideo === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={vid} type="video/mp4" />
          </video>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60 z-10"></div>
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Travel Pakistan & Beyond</h1>
          <p className="text-xl md:text-2xl text-white mb-6">Hand Crafted Luxury Travel Packages</p>
          <button
  onClick={() => setShowContactModal(true)}
  className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white px-8 py-3 rounded-lg font-semibold"
>
  Book Now
</button>


        </div>
      </section>

      {/* ================= WELCOME ================= */}
      <section className="py-20 bg-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Raleway, sans-serif' }}>
          Welcome to Highland Escape Travellers
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.8' }}>
          Explore hand-crafted luxury travel experiences across Pakistan and beyond. 
          Discover breathtaking landscapes, rich cultural heritage, and hidden gems 
          curated just for you. Whether you seek adventure, relaxation, or a blend 
          of both, our expert team ensures every journey is unforgettable. From 
          domestic escapes to international adventures, create memories that last a lifetime.
        </p>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="relative py-20 bg-gray-50">
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-900">
            Our Services
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden shadow-lg p-8 flex flex-col items-center text-center
                           bg-gradient-to-r from-gray-800 via-black to-gray-900 text-white
                           transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl
                           before:absolute before:inset-0 before:rounded-2xl
                           before:bg-gradient-to-r before:from-gray-800 before:via-gray-900 before:to-black
                           before:opacity-0 before:transition-opacity before:duration-500
                           hover:before:opacity-50"
              >
                <div className="mb-4 transform transition-all duration-500
                                group-hover:scale-125 group-hover:rotate-6
                                group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      {/* ================= WHY CHOOSE US ================= */}
<section className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-start gap-12">
    
    {/* LEFT: Cards */}
    <div className="flex-1 flex flex-col gap-6">
      <h2
        className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 via-gray-900 to-black"
        style={{ fontFamily: 'Raleway, sans-serif' }}
      >
        Why Choose Highland Escape Travellers
      </h2>

      {/* Cards */}
      {(() => {
        return items.map((item, i) => (
          <WhyChooseCard
            key={i}
            item={item}
            onSelect={() => setActiveCard(i)}
            isActive={activeCard === i}
          />
        ));
      })()}
    </div>

    {/* RIGHT: Single Video */}
    <div className="flex-1 relative w-full h-72 md:h-80 lg:h-[600px] xl:h-[650px] rounded-2xl overflow-hidden shadow-xl">



      <video
        autoPlay
        loop
        muted
        className="w-full h-full object-cover transition-all duration-500"
      >
        <source src="/videos/WhyChooseUs.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/30"></div>
    </div>
  </div>
</section>


      <TourCategoriesSlider />
      <TopDestinations />
      <TopInternationalDestinations />
      

      {/* ================= DOMESTIC TOURS ================= */}
      <section className="max-w-6xl mx-auto px-4 mt-20">
        <h2 className="text-3xl font-bold text-center mb-10">Domestic Tours</h2>
        {loadingDomesticTours ? (
          <p className="text-center text-gray-500">Loading tours...</p>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-3">
              {domesticTours.map((tour) => (
                <TourCard
                  key={tour._id}
                  id={tour._id}
                  title={tour.title}
                  description={tour.description}
                  price={tour.price}
                  image={tour.image}
                  flag="🇵🇰 Domestic"
                />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                to="/tours/domestic"
                className="inline-block px-10 py-4 rounded-2xl font-bold text-lg
                           bg-gradient-to-r from-gray-800 via-gray-900 to-black
                           text-white shadow-xl shadow-black/40
                           hover:scale-105 transition-transform duration-300"
              >
                View All Domestic Tours →
              </Link>
            </div>
          </>
        )}
      </section>

      {/* ================= INTERNATIONAL TOURS ================= */}
      <section className="max-w-6xl mx-auto px-4 mt-20">
        <h2 className="text-3xl font-bold text-center mb-10">International Tours</h2>
        {loadingInternationalTours ? (
          <p className="text-center text-gray-500">Loading tours...</p>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-3">
              {internationalTours.map((tour) => (
                <TourCard
                  key={tour._id}
                  id={tour._id}
                  title={tour.title}
                  description={tour.description}
                  price={tour.price}
                  image={tour.image}
                  flag="🌍 International"
                />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                to="/tours/international"
                className="inline-block px-10 py-4 rounded-2xl font-bold text-lg
                           bg-gradient-to-r from-gray-800 via-gray-900 to-black
                           text-white shadow-xl shadow-black/40
                           hover:scale-105 transition-transform duration-300"
              >
                View All International Tours →
              </Link>
            </div>
          </>
        )}
      </section>

      {/* ================= POPULAR DESTINATIONS ================= */}
      <section className="bg-gray-100 py-16 mt-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Popular Destinations</h2>
          <div className="grid gap-6 md:grid-cols-4">
            {destinations.map((dest, i) => (
              <div key={i} className="relative overflow-hidden rounded-xl shadow-lg">
                <img src={dest.img} alt={dest.name} className="w-full h-40 object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-lg font-semibold">{dest.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OUR STATS (Charts) ================= */}
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
                    data={[
                      { name: "Domestic Tours", value: 60, color: "#1E40AF" },
                      { name: "International Tours", value: 30, color: "#059669" },
                      { name: "Custom Packages", value: 10, color: "#9333EA" },
                    ]}
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
                    {[
                      { color: "#1E40AF" },
                      { color: "#059669" },
                      { color: "#9333EA" },
                    ].map((entry, index) => (
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
                <BarChart
                  data={[
                    { name: "Destinations", value: 50 },
                    { name: "Tours Organized", value: 500 },
                    { name: "Happy Travelers", value: 1000 },
                    { name: "Hotels Partnered", value: 200 },
                                        { name: "Tour Packages", value: 150 },
                    { name: "Customer Support", value: 24 },
                  ]}
                  margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />
                  <XAxis dataKey="name" stroke="#ffffff99" />
                  <YAxis stroke="#ffffff99" />
                  <Bar dataKey="value" fill="#facc15" barSize={30} />
                  <BarTooltip contentStyle={{ backgroundColor: "#111", borderColor: "#333" }} />
                </BarChart>
              </BarResponsiveContainer>
            </div>

            {/* Line Chart (Tours Growth Over Years) */}
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

      {/* ================= TESTIMONIALS ================= */}

      <GallerySection />

      <Testimonials />

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

      <Modal
  isOpen={showContactModal}
  onClose={() => setShowContactModal(false)}
>
  <ContactForm onSuccess={() => setShowContactModal(false)} />
</Modal>


{showPosterPopup && (
  <div
    className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70
                transition-opacity duration-500 ${
                  fadePoster ? "opacity-100" : "opacity-0"
                }`}
  >
    <div
      className={`relative w-10/12 max-w-3xl p-4 bg-white rounded-2xl shadow-xl
                  transition-transform duration-500 ${
                    fadePoster ? "scale-100" : "scale-90"
                  }`}
    >
      {/* Close button */}
      <button
        onClick={() => {
          setFadePoster(false);
          setTimeout(() => setShowPosterPopup(false), 500);
        }}
        className="absolute top-2 right-2 text-gray-700 text-xl font-bold"
      >
        ×
      </button>

      {/* Poster Image */}
      <img
        src="/images/Posters.jpeg" // your poster
        alt="Promotional Poster"
        className="w-full h-auto rounded-xl"
      />
    </div>
  </div>
)}





    </div>
  );
}

