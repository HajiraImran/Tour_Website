import { useState } from "react";
import axios from "axios";
import logo from "../assets/logos.png";
import { HiUser, HiMail, HiPencilAlt, HiChatAlt2 } from "react-icons/hi";

export default function ContactForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, formData);

      setFormData({ name: "", email: "", subject: "", message: "" });
      setShowToast(true);

      // toast auto hide
      setTimeout(() => setShowToast(false), 3000);

      // modal auto close
      if (onSuccess) {
        setTimeout(onSuccess, 1800);
      }
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ SUCCESS TOAST */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl animate-slide-in">
          ✅ Message sent successfully!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="p-10 rounded-3xl shadow-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white animate-gradient"
      >
        <img src={logo} alt="Logo" className="h-28 mx-auto mb-8" />

        <FloatingInput
          icon={<HiUser />}
          label="Your Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <FloatingInput
          icon={<HiMail />}
          label="Your Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />

        <FloatingInput
          icon={<HiPencilAlt />}
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
        />

        <FloatingTextarea
          icon={<HiChatAlt2 />}
          label="Your Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />

        {/* BUTTON */}
        <button
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold flex justify-center items-center gap-3
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-white text-gray-900 hover:opacity-90"
            }`}
        >
          {loading ? (
            <>
              <span className="h-5 w-5 border-2 border-gray-700 border-t-transparent rounded-full animate-spin"></span>
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>

        {error && <p className="text-red-500 text-center mt-3">{error}</p>}
      </form>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.4s ease forwards;
        }
      `}</style>
    </>
  );
}

/* ================= INPUTS ================= */

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
      <label className="absolute left-12 top-3 text-white/60 text-sm peer-focus:-top-2 peer-focus:text-xs">
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
      <label className="absolute left-12 top-4 text-white/60 text-sm peer-focus:-top-2 peer-focus:text-xs">
        {label}
      </label>
    </div>
  );
}
