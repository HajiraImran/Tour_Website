import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube, FaMapMarkerAlt, FaWhatsapp, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import logo from "../assets/logos.png"; // adjust path as needed

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-300 pt-12 pb-6 mt-16">

      {/* Top Section */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center md:text-left">

        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
          <img src={logo} alt="Highland Escapes Logo" className="h-16 w-auto mb-3" />
          <h2 className="text-2xl font-bold text-white mb-3">
            Highland Escapes Travelers
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Your trusted partner for unforgettable tours, breathtaking destinations,
            and travel memories that last forever.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white transition">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">About</Link>
            </li>
            <li>
              <Link to="/tours" className="hover:text-white transition">Tours</Link>
            </li>
            <li>
              <Link to="/destinations" className="hover:text-white transition">Destinations</Link>
            </li>
            <li>
              <Link to="/terms-policies" className="hover:text-white transition">Terms & Policies</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold text-white mb-3">Connect With Us</h3>
          <div className="flex justify-center md:justify-start gap-4 mb-4">
            {/* Facebook */}
            <a 
              href="https://www.facebook.com/people/Highland-Escapes-Travelers/pfbid0366S8KuYVR8yETWDJgSkZa6XD8BmiKefRuvMXLnD2gffMpNHRWzqr3PEKDPYpETUVl/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition cursor-pointer"
            >
              <FaFacebookF size={20} />
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/highlandescapestravelers/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-pink-500 transition cursor-pointer"
            >
              <FaInstagram size={20} />
            </a>

            {/* TikTok */}
            <a 
              href="https://www.tiktok.com/@highlandescapestraveler6"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-600 transition cursor-pointer"
            >
              <SiTiktok size={20} />
            </a>

            {/* YouTube */}
            <a 
              href="https://www.youtube.com/channel/UCV6PtuV3PiQ6BSBbyCJGtTA"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-red-600 transition cursor-pointer"
            >
              <FaYoutube size={22} />
            </a>

            {/* WhatsApp */}
            <a 
              href="https://wa.me/923043461111"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-green-600 rounded-full hover:bg-green-700 transition cursor-pointer"
            >
              <FaWhatsapp size={20} />
            </a>

            {/* Location */}
            {/* Location */}
<a 
  href="https://maps.app.goo.gl/T4hRfUVscPJhYGgs9?g_st=aw"
  target="_blank"
  rel="noopener noreferrer"
  className="p-3 bg-red-600 rounded-full hover:bg-red-700 transition cursor-pointer"
>
  <FaMapMarkerAlt size={20} />
</a>

          </div>

          {/* Contact Info */}
          <div className="text-gray-400 space-y-1">
            <p className="flex items-center gap-2">
              <FaEnvelope /> highlandescapestravelers@gmail.com
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt /> 923043461111
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-400">
        © 2026 Highland Escapes Travelers. All rights reserved.
      </div>

    </footer>
  );
}
