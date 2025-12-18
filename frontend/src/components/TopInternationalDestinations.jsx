import { useRef, useEffect, useState } from "react";

const internationalDestinations = [
  { name: "Maldives", img: "maldives.jpg" },
  { name: "Turkey", img: "Turkey.jpg" },
  { name: "Paris", img: "paris.jpg" },
  { name: "Bali", img: "bali.jpg" },
  { name: "New Zealand", img: "newzealand.jpg" },
];

export default function TopInternationalDestinations() {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Duplicate items for seamless infinite scroll
  const items = [...internationalDestinations, ...internationalDestinations];

  // Mouse drag handlers
  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed while dragging
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const onMouseUp = () => setIsDragging(false);

  // Auto-scroll effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let rafId;

    const scroll = () => {
      if (!isDragging) {
        container.scrollLeft += 1; // adjust speed
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      rafId = requestAnimationFrame(scroll);
    };

    rafId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(rafId);
  }, [isDragging]);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          Top International Destinations
        </h2>
        <p className="text-gray-600 mb-12">
          Explore world-class destinations for unforgettable international travel experiences.
        </p>

        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-hidden cursor-grab select-none py-4"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp} // stop dragging if mouse leaves
          onTouchStart={(e) => onMouseDown(e.touches[0])}
          onTouchMove={(e) => onMouseMove(e.touches[0])}
          onTouchEnd={onMouseUp}
        >
          {items.map((dest, i) => (
            <div
              key={i}
              className="flex-shrink-0 min-w-[300px] md:min-w-[350px] lg:min-w-[400px] bg-white rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-3xl relative"
            >
              <div className="w-full h-80 md:h-96 lg:h-[28rem] overflow-hidden rounded-3xl">
                <img
                  src={`/images/${dest.img}`}
                  alt={dest.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent opacity-0 hover:opacity-100 transition duration-500 flex items-end p-4 rounded-3xl">
                  <h3 className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">
                    {dest.name}
                  </h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm">
                  Experience luxury, adventure, and unforgettable memories in {dest.name}.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
