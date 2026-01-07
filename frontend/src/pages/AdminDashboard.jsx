import { useEffect, useState } from "react";
import axios from "axios";

/* ===============================
   🔹 Cloudinary Upload
================================ */
const uploadToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "tour_uploads");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dvyg3gxf6/image/upload",
    { method: "POST", body: data }
  );
  const json = await res.json();
  if (!json.secure_url) throw new Error("Image upload failed");
  return json.secure_url;
};

/* ===============================
   🔹 Reusable Tour Card
================================ */
const TourCard = ({ tour, onDelete }) => (
  <div className="bg-white rounded-xl shadow">
    <img src={tour.image} className="h-48 w-full object-cover rounded-t-xl" />
    <div className="p-4">
      <h3 className="font-bold">{tour.title}</h3>
      <p className="text-sm">{tour.isInternational ? "🌍 International" : "🇵🇰 Domestic"}</p>
      <p className="font-semibold mt-1">${tour.price}</p>
      <button
        onClick={() => onDelete(tour._id)}
        className="mt-3 bg-red-600 text-white px-3 py-1 rounded"
      >
        Delete
      </button>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    locations: "",
    hotel: "",
    startDate: "",
    endDate: "",
    price: "",
    category: "",
    durationDays: "",
    itinerary: "",
    services: "",
    terms: "",
    travelerInstructions: "",
    cancellation: "",
    refundPolicy: "",
    fastFacts: "",
    popular: false,
    Normal: false,
    TierTour: false,
    isInternational: false,
  });

  const token = localStorage.getItem("adminToken");

  /* ===============================
     🔹 Fetch Tours
  ================================ */
  useEffect(() => {
    if (!token) return window.location.href = "/admin/login";

    axios.get(`${import.meta.env.VITE_API_URL}/api/admin/tours`, {
  headers: { Authorization: `Bearer ${token}` },
})

      .then((res) => setTours(res.data))
      .catch(() => alert("Failed to fetch tours"))
      .finally(() => setLoading(false));
  }, [token]);

  /* ===============================
     🔹 Handle Form Input Changes
  ================================ */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") setForm({ ...form, [name]: checked });
    else if (type === "radio") setForm({ ...form, [name]: value === "true" });
    else setForm({ ...form, [name]: value });
  };

  /* ===============================
     🔹 Add New Tour
  ================================ */
  const handleAddTour = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert("Please select an image");

    try {
      const imageUrl = await uploadToCloudinary(imageFile);

      const payload = {
        ...form,
        image: imageUrl,
        isInternational: form.isInternational === true,
        locations: form.locations.split("\n").filter(Boolean),
        hotel: form.hotel.split("\n").filter(Boolean),
        itinerary: form.itinerary.split("\n").filter(Boolean),
        services: form.services.split("\n").filter(Boolean),
        terms: form.terms.split("\n").filter(Boolean),
        travelerInstructions: form.travelerInstructions.split("\n").filter(Boolean),
        cancellation: form.cancellation.split("\n").filter(Boolean),
        refundPolicy: form.refundPolicy.split("\n").filter(Boolean),
        fastFacts: form.fastFacts.split("\n").filter(Boolean),
      };

      const res = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/admin/tours`,
  payload,
  { headers: { Authorization: `Bearer ${token}` } }
);


      setTours([res.data, ...tours]);
      setShowModal(false);
      setImageFile(null);

      // Reset form
      setForm({
        title: "",
        description: "",
        locations: "",
        hotel: "",
        startDate: "",
        endDate: "",
        price: "",
        category: "",
        durationDays: "",
        itinerary: "",
        services: "",
        terms: "",
        travelerInstructions: "",
        cancellation: "",
        refundPolicy: "",
        fastFacts: "",
        popular: false,
        Normal: false,
        TierTour: false,
        isInternational: false,
      });
    } catch (err) {
      console.error(err);
      alert("Error adding tour");
    }
  };

  /* ===============================
     🔹 Delete Tour
  ================================ */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this tour?")) return;
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/tours/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
});

    setTours(tours.filter((t) => t._id !== id));
  };

  /* ===============================
     🔹 Logout
  ================================ */
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  /* ===============================
     🔹 Filter Tours
  ================================ */
  const internationalTours = tours.filter(t => t.isInternational);
  const domesticTours = tours.filter(t => !t.isInternational);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="fixed top-0 w-full bg-black text-white p-4 flex justify-between z-50">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <div className="flex gap-3">
          <button onClick={() => setShowModal(true)} className="bg-gray-700 px-4 py-2 rounded">+ Add Tour</button>
          <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded">Logout</button>
        </div>
      </header>

      {/* TOURS */}
      <main className="pt-32 max-w-6xl mx-auto px-4 space-y-12">
        {/* INTERNATIONAL */}
        <section>
          <h2 className="text-xl font-bold mb-4">🌍 International Tours</h2>
          {loading ? <p>Loading...</p> : 
            internationalTours.length === 0 ? <p>No international tours added yet.</p> :
            <div className="grid md:grid-cols-3 gap-6">
              {internationalTours.map(t => <TourCard key={t._id} tour={t} onDelete={handleDelete} />)}
            </div>
          }
        </section>

        {/* DOMESTIC */}
        <section>
          <h2 className="text-xl font-bold mb-4">🇵🇰 Domestic Tours</h2>
          {loading ? <p>Loading...</p> :
            domesticTours.length === 0 ? <p>No domestic tours added yet.</p> :
            <div className="grid md:grid-cols-3 gap-6">
              {domesticTours.map(t => <TourCard key={t._id} tour={t} onDelete={handleDelete} />)}
            </div>
          }
        </section>
      </main>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <form onSubmit={handleAddTour} className="bg-white p-6 rounded-xl w-full max-w-lg space-y-2 overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-bold">Add New Tour</h3>

            <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="border p-2 w-full" required />
            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 w-full" required />

            {/* TOUR TYPE */}
            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="isInternational" value="false" checked={form.isInternational === false} onChange={handleChange} />
                🇵🇰 Domestic
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="isInternational" value="true" checked={form.isInternational === true} onChange={handleChange} />
                🌍 International
              </label>
            </div>

            {/* FIELDS */}
            {["locations","hotel","itinerary","services","terms","travelerInstructions","cancellation","refundPolicy","fastFacts"].map(field => (
              <textarea key={field} name={field} placeholder={`${field} (one per line)`} value={form[field]} onChange={handleChange} className="border p-2 w-full" />
            ))}
            <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="border p-2 w-full" />
            <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className="border p-2 w-full" />
            <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="border p-2 w-full" />
            <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="border p-2 w-full" />
            <input type="number" name="durationDays" placeholder="Duration Days" value={form.durationDays} onChange={handleChange} className="border p-2 w-full" />

            {/* CHECKBOXES */}
            {["popular","Normal","TierTour"].map(cb => (
              <label key={cb} className="flex items-center gap-2">
                <input type="checkbox" name={cb} checked={form[cb]} onChange={handleChange} /> {cb}
              </label>
            ))}

            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} required />

            <div className="flex justify-end gap-3 mt-3">
              <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit" className="bg-black text-white px-4 py-2 rounded">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
