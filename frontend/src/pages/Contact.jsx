import { useState } from "react";
import axios from "axios";
import logo from "../assets/logos.png";
import { HiUser, HiMail, HiPencilAlt, HiChatAlt2 } from "react-icons/hi";

import ContactForm from "../components/ContactForm";


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [openCard, setOpenCard] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setError("");

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError("Failed to send message. Please try again.");
    }
  };

  const contactItems = [
    { icon: "📞", title: "Phone", text: "+92 304 3461111", details: "Available 9 AM – 6 PM" },
    { icon: "✉️", title: "Email", text: "highlandescapestravelers@gmail.com", details: "Reply within 24 hours" },
    { icon: "📍", title: "Address", text: "Office 3032 , 3rd Floor World Trade Center, Islamabad Pakistan.", details: "Visit during office hours" },
    { icon: "🕒", title: "Working Hours", text: "Mon – Sat, 9 AM – 6 PM", details: "Closed Sundays" },
  ];

  return (
    <div className="bg-white pt-20 pb-16">


      {/* HERO */}
      <section className="relative h-64 md:h-72 rounded-3xl overflow-hidden shadow-lg mb-16 max-w-7xl mx-auto px-4">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          className="w-full h-full object-cover"
          alt="Contact"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold">Contact Us</h1>
          <p className="mt-2 text-lg">Let’s plan your next adventure</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-4">

        {/* FORM */}
        {/* FORM */}
<ContactForm />


        {/* INFO */}
        <div className="flex flex-col gap-6">
          {contactItems.map((item, i) => (
            <div
              key={i}
              onClick={() => setOpenCard(openCard === i ? null : i)}
              className="p-6 rounded-3xl bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white shadow-xl cursor-pointer animate-gradient"
            >
              <h3 className="text-xl font-bold flex justify-between">
                {item.icon} {item.title}
                <span>{openCard === i ? "▲" : "▼"}</span>
              </h3>
              <p>{item.text}</p>
              {openCard === i && <p className="text-white/70 mt-2">{item.details}</p>}
            </div>
          ))}

          <div className="h-64 rounded-3xl overflow-hidden shadow-xl">
            <iframe
              src="https://maps.google.com/maps?q=Islamabad&t=&z=13&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/923043461111?text=Hello%20Highland%20Escapes!%20I%20need%20help%20with%20a%20tour."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] text-white px-5 py-3 rounded-full shadow-2xl hover:scale-105 transition-transform"
      >
        <span className="text-2xl">💬</span>
        <span className="hidden md:block font-semibold">Chat on WhatsApp</span>
      </a>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 8s ease infinite;
        }
      `}</style>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function FloatingInput({ icon, label, ...props }) {
  return (
    <div className="relative mb-6">
      <span className="absolute left-4 top-3 text-white/60 text-xl">{icon}</span>
      <input
        {...props}
        required
        className="peer w-full bg-white/10 border border-white/30 rounded-xl px-12 py-3 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-white"
        placeholder={label}
      />
      <label className="absolute left-12 top-3 text-white/60 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-white">
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({ icon, label, ...props }) {
  return (
    <div className="relative mb-6">
      <span className="absolute left-4 top-4 text-white/60 text-xl">{icon}</span>
      <textarea
        {...props}
        rows="6"
        required
        className="peer w-full bg-white/10 border border-white/30 rounded-xl px-12 py-3 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-white"
        placeholder={label}
      />
      <label className="absolute left-12 top-4 text-white/60 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-white">
        {label}
      </label>
    </div>
  );
}
