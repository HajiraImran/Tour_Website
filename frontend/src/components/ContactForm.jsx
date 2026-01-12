import { useState } from "react";
import axios from "axios";
import logo from "../assets/logosss.png";
import {
  HiUser,
  HiMail,
  HiPencilAlt,
  HiChatAlt2,
} from "react-icons/hi";

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
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        formData
      );

      setFormData({ name: "", email: "", subject: "", message: "" });
      setShowToast(true);

      setTimeout(() => setShowToast(false), 3000);
      if (onSuccess) setTimeout(onSuccess, 1800);
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* SUCCESS TOAST */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl animate-slide-in">
          ✅ Message sent successfully!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="p-10 rounded-3xl shadow-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white"
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

        <button
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold flex justify-center items-center gap-3 transition
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

        {error && (
          <p className="text-red-500 text-center mt-3">{error}</p>
        )}
      </form>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(40px);
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

/* ================= FLOATING INPUT WITH UNDERLINE ================= */

function FloatingInput({ icon, label, ...props }) {
  return (
    <div className="relative mb-8">
      <span className="absolute left-4 top-3.5 text-white/60 text-xl pointer-events-none">
        {icon}
      </span>

      <input
        {...props}
        required
        placeholder=" "
        className="peer w-full bg-transparent border-b border-white/30
        px-12 py-3 text-white
        focus:outline-none
        transition-all duration-300"
      />

      {/* UNDERLINE ANIMATION */}
      <span className="absolute bottom-0 left-0 h-[2px] w-full bg-white scale-x-0 origin-left transition-transform duration-300 peer-focus:scale-x-100"></span>

      <label
        className="absolute left-12 text-white/70 text-sm
        transition-all duration-300 ease-out pointer-events-none

        peer-placeholder-shown:top-3.5
        peer-placeholder-shown:text-sm

        peer-focus:-top-2
        peer-focus:text-xs
        peer-focus:text-white

        -top-2 text-xs"
      >
        {label}
      </label>
    </div>
  );
}

/* ================= FLOATING TEXTAREA WITH UNDERLINE ================= */

function FloatingTextarea({ icon, label, ...props }) {
  return (
    <div className="relative mb-8">
      <span className="absolute left-4 top-4 text-white/60 text-xl pointer-events-none">
        {icon}
      </span>

      <textarea
        {...props}
        rows="6"
        required
        placeholder=" "
        className="peer w-full bg-transparent border-b border-white/30
        px-12 py-3 text-white resize-none
        focus:outline-none
        transition-all duration-300"
      />

      {/* UNDERLINE ANIMATION */}
      <span className="absolute bottom-0 left-0 h-[2px] w-full bg-white scale-x-0 origin-left transition-transform duration-300 peer-focus:scale-x-100"></span>

      <label
        className="absolute left-12 text-white/70 text-sm
        transition-all duration-300 ease-out pointer-events-none

        peer-placeholder-shown:top-4
        peer-placeholder-shown:text-sm

        peer-focus:-top-2
        peer-focus:text-xs
        peer-focus:text-white

        -top-2 text-xs"
      >
        {label}
      </label>
    </div>
  );
}
