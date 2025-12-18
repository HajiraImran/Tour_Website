import { useState, useEffect } from "react";
import TourCategoriesSlider from "../components/TourCategoriesSlider";
import TopDestinations from "../components/TopDestinations";
import TopInternationalDestinations from "../components/TopInternationalDestinations";

import ChatBot from "../components/ChatBot";
import Testimonials from "../components/Testimonials";






export default function Home() {
  const featuredTours = [
    { title: 'Beach Paradise', desc: 'Relax on golden sands and enjoy crystal clear waters.', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', popular: true },
    { title: 'Mountain Adventure', desc: 'Experience thrilling hikes and breathtaking views.', img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80' },
    { title: 'City Explorer', desc: 'Discover the hidden gems and culture of vibrant cities.', img: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=400&q=80' },
  ];

  const destinations = [
    { name: 'Maldives', img: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=300&q=80' },
    { name: 'Swiss Alps', img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=300&q=80' },
    { name: 'Paris', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=300&q=80' },
    { name: 'Bali', img: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=300&q=80' },
  ];

  // Hero video state
  const videos = [
    "/videos/travel1.mp4",
    "/videos/travel2.mp4",
    "/videos/travel3.mp4",
    "/videos/travel4.mp4",
     "/videos/travels.mp4"


  ];
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo(prev => (prev + 1) % videos.length);
    }, 5000); // change video every 5 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-sans text-gray-800">

      {/* Hero Section */}
      <section className="relative h-screen w-screen overflow-hidden">
        {videos.map((vid, index) => (
          <video
            key={index}
            autoPlay
            muted
            loop
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${currentVideo === index ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src={vid} type="video/mp4" />
          </video>
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60 z-10 pointer-events-none"></div>
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Travel Pakistan & Beyond</h1>
          <p className="text-xl md:text-2xl text-white mb-6">Hand Crafted Luxury Travel Packages</p>
          <button className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold px-8 py-3 rounded-lg hover:from-gray-900 hover:via-gray-800 hover:to-black transition duration-300">
            Book Your Tour
          </button>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Highland Escape Travellers</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore hand-crafted luxury travel experiences across Pakistan and beyond. Discover breathtaking landscapes, vibrant cities, and unforgettable memories with us.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-gray-800 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-900 transition duration-300">Explore Tours</button>
            <button className="bg-gray-100 text-gray-800 px-8 py-3 rounded-lg border border-gray-300 hover:bg-gray-200 transition duration-300">Learn More</button>
          </div>
        </div>
      </section>

      <TourCategoriesSlider />
      <TopDestinations />
      <TopInternationalDestinations />
      
            <ChatBot />



      {/* Featured Tours */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Tours</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {featuredTours.map((tour, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 group">
              <div className="relative">
                <img src={tour.img} alt={tour.title} className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105" />
                {tour.popular && <span className="absolute top-3 left-3 bg-yellow-400 text-sm font-semibold px-3 py-1 rounded-full">Popular</span>}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{tour.title}</h3>
                <p className="text-gray-600 mb-4">{tour.desc}</p>
                <button className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-semibold px-8 py-3 rounded-lg hover:from-gray-900 hover:via-gray-800 hover:to-black transition duration-300">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="bg-gray-100 py-16 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Popular Destinations</h2>
          <div className="grid gap-6 md:grid-cols-4">
            {destinations.map((dest, i) => (
              <div key={i} className="relative overflow-hidden rounded-xl shadow-lg group">
                <img src={dest.img} alt={dest.name} className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <h3 className="text-white text-lg font-semibold">{dest.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

            <Testimonials />



      {/* Modern Masonry Gallery Section */}
<section className="py-24 relative bg-gradient-to-b from-white to-gray-100">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-4xl font-extrabold text-center mb-14 tracking-wide">
      Travel Moments
    </h2>

    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {[
        "/images/bali.jpg",
        "/images/Gilgit.jpg",
        "/images/maldives.jpg",
        "/images/Hunza.jpg",
        "/images/Naran.jpg",
        "/images/Kalam.jpg",
        "/images/paris.jpg",
        "/images/Turkey.jpg",
      ].map((img, i) => (
        <div
          key={i}
          className="break-inside-avoid relative rounded-xl overflow-hidden shadow-xl group cursor-pointer"
        >
          <img
            src={img}
            alt="gallery"
            className="w-full rounded-xl transition-transform duration-700 group-hover:scale-110"
          />

          {/* Glass overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-end p-4 opacity-0 group-hover:opacity-100 backdrop-blur-sm">
            <p className="text-white text-lg font-semibold tracking-wide">
              Explore More →
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>




      {/* Final CTA Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800"></div>
        <div className="absolute -top-10 -left-10 w-56 h-56 bg-blue-600/20 blur-[90px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-indigo-600/20 blur-[100px] rounded-full"></div>
        <div className="absolute inset-0 backdrop-blur-sm bg-white/5"></div>
        <div className="relative z-20 max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Your Journey Begins Here</h2>
          <p className="mt-3 text-lg md:text-xl text-gray-300 max-w-xl mx-auto">Experience world-class tours, breathtaking destinations, and unforgettable memories.</p>
          <div className="mt-8 flex justify-center gap-4">
            <button className="bg-gradient-to-r from-gray-800 via-black to-gray-900 px-7 py-3 text-white font-semibold rounded-xl shadow-md shadow-black/40 border border-white/10 transition-transform duration-300 hover:scale-105">Book Now →</button>
            <button className="bg-white/10 text-white px-7 py-3 rounded-xl font-semibold border border-white/20 backdrop-blur-md hover:bg-white/20 hover:scale-105 transition duration-300">View Packages</button>
          </div>
        </div>
      </section>
    </div>
  );
}
