import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-300 pt-12 pb-6 mt-16">
      
      {/* Top Section */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center md:text-left">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Highland Escapes Travelers
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Your trusted partner for unforgettable tours, breathtaking destinations,
            and travel memories that last forever.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer transition">Home</li>
            <li className="hover:text-white cursor-pointer transition">Tours</li>
            <li className="hover:text-white cursor-pointer transition">Destinations</li>
            <li className="hover:text-white cursor-pointer transition">Contact</li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4">

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

          </div>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-400">
        © 2025 Highland Escapes Travelers. All rights reserved.
      </div>

    </footer>
  );
}
