import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const tourCategories = [
  { name: "Beach Tours", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" },
  { name: "Adventure Trips", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80" },
  { name: "City Tours", img: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80" },
  { name: "Cultural Tours", img: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80" },
  { name: "Nature Getaways", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80" },
];

export default function TourCategoriesSlider() {
  const [index, setIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % tourCategories.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + tourCategories.length) % tourCategories.length);

  const nextSlide = () =>
    setIndex((prev) => (prev + 1) % tourCategories.length);

  return (
    <section className="py-20 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Explore Tours by Category</h2>
        <p className="text-gray-500 mt-2">Choose your perfect travel experience</p>
      </div>

      <div className="relative max-w-5xl mx-auto flex items-center justify-center">

        {/* LEFT CARD */}
        <div className="absolute left-0 w-1/3 opacity-50 scale-90 blur-sm transition-all duration-700">
          <CategoryCard data={tourCategories[(index - 1 + tourCategories.length) % tourCategories.length]} />
        </div>

        {/* CENTER CARD */}
        <div className="w-2/3 z-10 scale-110 transition-all duration-700">
          <CategoryCard data={tourCategories[index]} />
        </div>

        {/* RIGHT CARD */}
        <div className="absolute right-0 w-1/3 opacity-50 scale-90 blur-sm transition-all duration-700">
          <CategoryCard data={tourCategories[(index + 1) % tourCategories.length]} />
        </div>

        {/* BUTTONS */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow"
        >
          ◀
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow"
        >
          ▶
        </button>
      </div>
    </section>
  );
}

function CategoryCard({ data }) {
  // convert "Beach Tours" → "beach-tours"
  const slug = data.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link
      to={`/tours/category/${slug}`}
      className="rounded-xl overflow-hidden shadow-lg group cursor-pointer block"
    >
      <img
        src={data.img}
        alt={data.name}
        className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
      />
      <div className="p-5 bg-white text-center">
        <h3 className="text-lg font-bold">{data.name}</h3>
      </div>
    </Link>
  );
}
