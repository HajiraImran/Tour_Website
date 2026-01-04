import React from "react";
import { Link } from "react-router-dom";

export default function TourCard({
  id,
  title,
  description,
  price,
  image,
  flag,
  linkPrefix = "/tours", // default link to tour details
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden
                    hover:shadow-2xl transform hover:-translate-y-2 transition duration-300">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-52 object-cover transition-transform duration-500 hover:scale-105"
        />
        {flag && (
          <span className="absolute top-3 left-3 bg-[#1F2937] text-white px-3 py-1 text-sm rounded-full">
            {flag}
          </span>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-800">${price}</span>
          <Link
            to={`${linkPrefix}/${id}`}
            className="px-5 py-2 rounded-lg text-sm font-semibold bg-gray-900 text-white hover:bg-black transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
