import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [tours, setTours] = useState([]);

  useEffect(() => {
    // Fetch from backend — example API route
    fetch(`http://localhost:5000/api/tours/category/${categoryName}`)
      .then((res) => res.json())
      .then((data) => setTours(data))
      .catch(console.error);
  }, [categoryName]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {categoryName} Tours
      </h1>

      {tours.length === 0 ? (
        <p className="text-gray-600">No tours found in this category.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <div key={tour._id} className="bg-white shadow rounded-xl p-4">
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="text-xl font-semibold mt-4">{tour.title}</h2>
              <p className="text-gray-600">{tour.description}</p>
              <p className="text-black font-bold mt-2">$ {tour.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
