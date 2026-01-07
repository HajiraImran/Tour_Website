import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube, FaMapMarkerAlt, FaWhatsapp, FaEnvelope, FaPhoneAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { useState } from "react";
import logo from "../assets/logos.png";

export default function Footer() {
  const [linksOpen, setLinksOpen] = useState(false);

  const toggleLinks = () => setLinksOpen(!linksOpen);

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-300 pt-12 pb-6 mt-16">

      {/* Top Section */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img src={logo} alt="Highland Escapes Logo" className="h-16 w-auto mb-3" />
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
            Highland Escapes Travelers
          </h2>
          <p className="text-gray-400 leading-relaxed text-sm md:text-base">
            Your trusted partner for unforgettable tours, breathtaking destinations,
            and travel memories that last forever.
          </p>
        </div>

        {/* Quick Links with Accordion on Mobile */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg md:text-xl font-semibold text-white mb-3 flex justify-between md:block w-full cursor-pointer" onClick={toggleLinks}>
            Quick Links
            <span className="md:hidden ml-2">
              {linksOpen ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </h3>

          <ul className={`space-y-2 md:space-y-2 overflow-hidden transition-all duration-300 w-full ${linksOpen ? 'max-h-96' : 'max-h-0 md:max-h-full'}`}>
            <li><Link to="/" className="hover:text-white transition block text-center md:text-left" onClick={() => setLinksOpen(false)}>Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition block text-center md:text-left" onClick={() => setLinksOpen(false)}>About</Link></li>
            <li><Link to="/tours" className="hover:text-white transition block text-center md:text-left" onClick={() => setLinksOpen(false)}>Tours</Link></li>
            <li><Link to="/destinations" className="hover:text-white transition block text-center md:text-left" onClick={() => setLinksOpen(false)}>Destinations</Link></li>
            <li><Link to="/terms-policies" className="hover:text-white transition block text-center md:text-left" onClick={() => setLinksOpen(false)}>Terms & Policies</Link></li>
            <li><Link to="/contact" className="hover:text-white transition block text-center md:text-left" onClick={() => setLinksOpen(false)}>Contact</Link></li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-lg md:text-xl font-semibold text-white mb-3">Connect With Us</h3>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start gap-3 flex-wrap mb-4">
            <a href="https://www.facebook.com/people/Highland-Escapes-Travelers/pfbid0366S8KuYVR8yETWDJgSkZa6XD8BmiKefRuvMXLnD2gffMpNHRWzqr3PEKDPYpETUVl/" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition cursor-pointer">
              <FaFacebookF size={18} />
            </a>
            <a href="https://www.instagram.com/highlandescapestravelers/" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-pink-500 transition cursor-pointer">
              <FaInstagram size={18} />
            </a>
            <a href="https://www.tiktok.com/@highlandescapestraveler6" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-gray-600 transition cursor-pointer">
              <SiTiktok size={18} />
            </a>
            <a href="https://www.youtube.com/channel/UCV6PtuV3PiQ6BSBbyCJGtTA" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-red-600 transition cursor-pointer">
              <FaYoutube size={18} />
            </a>
            <a href="https://wa.me/923043461111" target="_blank" rel="noopener noreferrer" className="p-2 bg-green-600 rounded-full hover:bg-green-700 transition cursor-pointer">
              <FaWhatsapp size={18} />
            </a>
            <a href="https://maps.app.goo.gl/T4hRfUVscPJhYGgs9?g_st=aw" target="_blank" rel="noopener noreferrer" className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition cursor-pointer">
              <FaMapMarkerAlt size={18} />
            </a>
          </div>

          {/* Contact Info */}
          <div className="text-gray-400 space-y-2 text-sm md:text-base flex flex-col items-center md:items-start">
            <p className="flex items-center gap-2"><FaEnvelope /> highlandescapestravelers@gmail.com</p>
            <p className="flex items-center gap-2"><FaPhoneAlt /> 923043461111</p>
            <p className="flex items-center gap-2"><FaMapMarkerAlt /> Office 3032, 3rd Floor, World Trade Center, Islamabad</p>
          </div>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-400 text-sm md:text-base">
        © 2026 Highland Escapes Travelers. All rights reserved.
      </div>

    </footer>
  );
}
