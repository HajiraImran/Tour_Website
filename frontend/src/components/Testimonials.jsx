// components/Testimonials.jsx
import React, { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Aisha Khan",
    review: "Highland Escape Travellers made our trip unforgettable! Excellent service and attention to detail.",
    img: "/images/testimonial1.jpg",
    rating: 5,
  },
  {
    name: "Ali Raza",
    review: "Amazing experience! The guides were knowledgeable and friendly. Highly recommend.",
    img: "/images/testimonial2.jpg",
    rating: 4,
  },
  {
    name: "Sara Malik",
    review: "Luxury travel with comfort and style. Everything was well organized.",
    img: "/images/testimonial3.jpg",
    rating: 5,
  },
  {
    name: "Omar Sheikh",
    review: "Great destinations and well-planned tours. Loved the personalized touch.",
    img: "/images/testimonial4.jpg",
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">What Our Travelers Say</h2>

        <div className="relative bg-white rounded-xl shadow-lg p-6 md:p-10 flex flex-col items-center">
          <img
            src={testimonials[currentIndex].img}
            alt={testimonials[currentIndex].name}
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
          <h3 className="text-xl font-semibold">{testimonials[currentIndex].name}</h3>
          <p className="text-yellow-500 mb-2">
            {"★".repeat(testimonials[currentIndex].rating)}{" "}
            {"☆".repeat(5 - testimonials[currentIndex].rating)}
          </p>
          <p className="text-gray-700 italic max-w-xl">{`"${testimonials[currentIndex].review}"`}</p>

          {/* Navigation */}
          <div className="absolute top-1/2 -left-6 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-800" onClick={prevSlide}>
            &#10094;
          </div>
          <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-800" onClick={nextSlide}>
            &#10095;
          </div>
        </div>
      </div>
    </section>
  );
}
