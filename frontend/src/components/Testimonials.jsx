import React, { useState, useEffect, useRef } from "react";

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
  const particleRef = useRef(null);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Floating particles animation
  useEffect(() => {
    const canvas = particleRef.current;
    const ctx = canvas.getContext("2d");
    const particles = [];
    const particleCount = 60;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle object
    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 2 + Math.random() * 3;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.alpha = 0.1 + Math.random() * 0.3;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }
      draw() {
        ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-20 relative bg-gray-900 overflow-hidden">
      {/* Particles Canvas */}
      <canvas
        ref={particleRef}
        className="absolute inset-0 w-full h-full"
      ></canvas>

      <div className="relative max-w-5xl mx-auto px-4 text-center z-10">
        <h2 className="text-4xl font-bold mb-12 text-white">
          What Our Travelers Say
        </h2>

        <div
          className="relative rounded-3xl p-6 md:p-10 flex flex-col items-center
                     bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white
                     shadow-2xl transition-transform duration-500 transform
                     hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,255,255,0.25)]"
        >
          <img
            src={testimonials[currentIndex].img}
            alt={testimonials[currentIndex].name}
            className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-white shadow-lg"
          />
          <h3 className="text-xl font-semibold">{testimonials[currentIndex].name}</h3>
          <p className="text-yellow-400 mb-2">
            {"★".repeat(testimonials[currentIndex].rating)}{" "}
            {"☆".repeat(5 - testimonials[currentIndex].rating)}
          </p>
          <p className="text-white italic max-w-xl">{`"${testimonials[currentIndex].review}"`}</p>

          {/* Navigation */}
          <div
            className="absolute top-1/2 -left-6 transform -translate-y-1/2 cursor-pointer text-white hover:text-yellow-400 text-3xl select-none"
            onClick={prevSlide}
          >
            &#10094;
          </div>
          <div
            className="absolute top-1/2 -right-6 transform -translate-y-1/2 cursor-pointer text-white hover:text-yellow-400 text-3xl select-none"
            onClick={nextSlide}
          >
            &#10095;
          </div>
        </div>
      </div>
    </section>
  );
}
