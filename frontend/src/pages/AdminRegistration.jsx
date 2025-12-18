import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminRegister() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      setMessage(res.data.message);
      setTimeout(() => navigate("/admin/login"), 1500); // auto redirect after success
    } catch (err) {
      setMessage(err.response?.data?.message || "Error registering");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-128px)] bg-gray-100">
      <div className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/30">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Admin Registration</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
            required
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-3 rounded-xl shadow-lg hover:scale-105 transition transform font-semibold"
          >
            Register
          </button>
        </form>

        {message && <p className="mt-4 text-center text-red-600">{message}</p>}

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/admin/login" className="text-gray-900 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
