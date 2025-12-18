import { useRef, useState, useEffect } from "react";

const destinations = [
  { name: "Hunza Valley", img: "Hunza.jpg" },
  { name: "Naran Kaghan", img: "Naran.jpg" },
  { name: "Skardu", img: "Skardu.jpg" },
  { name: "Gilgit", img: "Gilgit.jpg" },
  { name: "Fairy Meadows", img: "Kalam.jpg" },
];

export default function TopDestinations() {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- Mouse drag handlers ---
  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll faster
    containerRef.current.scrollLeft = scrollLeft - walk;
    updateCurrentIndex();
  };

  const onMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    snapToCard();
  };

  const updateCurrentIndex = () => {
    const container = containerRef.current;
    if (!container) return;
    const cardWidth = container.firstChild.offsetWidth + 24; // gap-6 ~ 24px
    const index = Math.round(container.scrollLeft / cardWidth);
    setCurrentIndex(index % destinations.length);
  };

  const snapToCard = () => {
    const container = containerRef.current;
    if (!container) return;
    const cardWidth = container.firstChild.offsetWidth + 24;
    const index = Math.round(container.scrollLeft / cardWidth);
    container.scrollTo({
      left: cardWidth * index,
      behavior: "smooth",
    });
    setCurrentIndex(index);
  };

  const handleDotClick = (index) => {
    const container = containerRef.current;
    if (!container) return;
    const cardWidth = container.firstChild.offsetWidth + 24;
    container.scrollTo({ left: cardWidth * index, behavior: "smooth" });
    setCurrentIndex(index);
  };

  // --- Smooth infinite auto-scroll ---
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrame;

    const scroll = () => {
      if (!isDragging) {
        container.scrollLeft += 1.5; // speed
        // Infinite loop
        if (
          container.scrollLeft >=
          container.scrollWidth - container.clientWidth
        ) {
          container.scrollLeft = 0;
        }
        updateCurrentIndex();
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrame);
  }, [isDragging]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Top Destinations in Pakistan
        </h2>
        <p className="text-gray-500 mb-12">
          Discover the most breathtaking places Pakistan has to offer, hand-picked for your perfect journey.
        </p>

        {/* Slider */}
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-hidden cursor-grab select-none relative"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={(e) => onMouseDown(e.touches[0])}
          onTouchMove={(e) => onMouseMove(e.touches[0])}
          onTouchEnd={onMouseUp}
        >
          {destinations.map((dest, i) => (
            <div
              key={i}
              className="min-w-[250px] md:min-w-[300px] lg:min-w-[320px] relative rounded-xl overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={`/images/${dest.img}`}
                alt={dest.name}
                className="w-full h-64 object-cover object-center transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition duration-500 flex items-center justify-center">
                <h3 className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">
                  {dest.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 gap-3">
          {destinations.map((_, i) => (
            <span
              key={i}
              onClick={() => handleDotClick(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentIndex ? "bg-gray-800 scale-125" : "bg-gray-400"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}
