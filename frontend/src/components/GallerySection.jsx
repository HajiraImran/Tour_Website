// frontend/src/components/ModernGallery.jsx
import React, { useEffect, useRef } from "react";

const galleryItems = [
  { img: "/images/g1.jpeg", caption: "Trip Glimps" },
  { img: "/images/g2.jpeg", caption: "Trip Glimps" },
  { img: "/images/g3.jpeg", caption: "Trip Glimps" },
  { img: "/images/g4.jpeg", caption: "Trip Glimps" },
  { img: "/images/g5.jpeg", caption: "Trip Glimps" },
  { img: "/images/g6.jpeg", caption: "Trip Glimps" },
  { img: "/images/g7.jpeg", caption: "Trip Glimps" },
  { img: "/images/g8.jpeg", caption: "Trip Glimps" },
  { img: "/images/g9.jpeg", caption: "Trip Glimps" },
  { img: "/images/g10.jpeg", caption: "Trip Glimps" },
  { img: "/images/g12.jpeg", caption: "Trip Glimps" },
  { img: "/images/g13.jpeg", caption: "Trip Glimps" },
  { img: "/images/g14.jpeg", caption: "Trip Glimps" },
  { img: "/images/g15.jpeg", caption: "Trip Glimps" },
  { img: "/images/g16.jpeg", caption: "Trip Glimps" },
];

export default function ModernGallery() {
  const containerRef = useRef();

  // Fade-in + parallax scroll animation
  useEffect(() => {
    const handleScroll = () => {
      const items = containerRef.current.querySelectorAll(".gallery-item");
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          item.classList.add("visible");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // trigger on load
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3D Tilt on hover
  const handleMouseMove = (e, ref) => {
    const rect = ref.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10; // tilt angle
    const rotateY = ((x - centerX) / centerX) * -10;
    ref.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = (ref) => {
    ref.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-900">
          Explore Our Adventures
        </h2>

        {/* Masonry Grid */}
        <div
          ref={containerRef}
          className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6"
        >
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="gallery-item relative w-full mb-6 break-inside-avoid rounded-3xl overflow-hidden shadow-xl cursor-pointer opacity-0 transition-all duration-700 transform bg-white"
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            >
              <img
                src={item.img}
                alt={item.caption}
                className="w-full object-cover rounded-3xl transition-transform duration-700 ease-in-out"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-center justify-center rounded-3xl">
                <p className="text-white font-semibold text-lg px-4 text-center">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fade-in CSS */}
      <style>{`
        .gallery-item.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      `}</style>
    </section>
  );
}
