import { useEffect, useRef } from "react";

export default function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);

  // ESC key close
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Focus trap (SAFE)
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const focusable = modalRef.current.querySelectorAll(
      'button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first.focus();

    const handleTab = (e) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        className="
        bg-white w-full
        rounded-t-3xl sm:rounded-2xl
        max-w-sm sm:max-w-md
        shadow-2xl
        animate-modal-in
        relative
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile drag handle */}
        <div className="sm:hidden w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-2"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3 right-4 text-gray-500 text-xl font-bold
          hover:scale-110 hover:text-black transition"
        >
          ✕
        </button>

        {/* Content */}
        <div className="max-h-[75vh] overflow-y-auto p-6">
          {children}
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-modal-in {
          animation: modalIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
