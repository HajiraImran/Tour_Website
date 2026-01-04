import { useState } from "react";

function WhyChooseCard({ item, onSelect, isActive }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
    if (onSelect) onSelect(); // triggers video change
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer p-6 rounded-3xl bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white shadow-xl transition-all duration-500
                  hover:scale-105 ${isActive ? "ring-4 ring-indigo-500" : ""}`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold flex items-center gap-3">
          <span className="text-2xl">{item.icon}</span> {item.title}
        </h3>
        <span className="text-2xl">{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <p className="mt-3 text-white/70 text-sm leading-relaxed transition-all duration-300">
          {item.desc}
        </p>
      )}
    </div>
  );
}

export default WhyChooseCard;
