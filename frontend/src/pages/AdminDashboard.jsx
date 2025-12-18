import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminDashboard() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    popular: false,
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) return navigate("/admin/login");

    const fetchTours = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/tours", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTours(res.data);
        setLoading(false);
      } catch (err) {
        setMessage(err.response?.data?.message || "Error fetching tours");
        setLoading(false);
      }
    };
    fetchTours();
  }, [navigate, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleAddTour = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) return alert("Title and description required!");
    try {
      const res = await axios.post("http://localhost:5000/api/admin/tours", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTours([res.data, ...tours]);
      setForm({ title: "", description: "", image: "", price: "", popular: false });
      setShowModal(false);
    } catch (err) {
      alert(err.response?.data?.message || "Error adding tour");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/tours/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTours(tours.filter((tour) => tour._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting tour");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white shadow-lg z-50 p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-white/10 px-4 py-2 rounded-xl shadow hover:scale-105 transition transform font-semibold"
          >
            + Add New Tour
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-5 py-2 rounded-xl shadow hover:bg-red-700 transition font-semibold"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex justify-center items-start pt-32 px-4">
        <div className="w-full max-w-5xl">
          {message && <p className="mb-4 text-center text-red-600 font-semibold">{message}</p>}

          {loading ? (
            <p className="text-center text-gray-700">Loading tours...</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {tours.map((tour) => (
                <div
                  key={tour._id}
                  className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-5 flex flex-col justify-between hover:scale-105 transition transform"
                >
                  <h4 className="text-xl font-bold mb-2">{tour.title}</h4>
                  <p className="text-gray-600 mb-2">{tour.description}</p>
                  {tour.image && (
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                  )}
                  <p className="text-gray-700 font-semibold mb-2">Price: ${tour.price || 0}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Popular: {tour.popular ? "Yes" : "No"}
                  </p>
                  <button
                    onClick={() => handleDelete(tour._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition font-semibold"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Add New Tour</h3>
            <form onSubmit={handleAddTour} className="flex flex-col gap-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                required
                className="border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                required
                className="border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={form.image}
                onChange={handleChange}
                className="border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className="border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="popular"
                  checked={form.popular}
                  onChange={handleChange}
                />
                Popular
              </label>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white px-4 py-2 rounded-xl shadow hover:scale-105 transition font-semibold"
                >
                  Add Tour
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
