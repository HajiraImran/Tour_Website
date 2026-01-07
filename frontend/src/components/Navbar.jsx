import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logos.png'
import { useState, useEffect, useRef } from 'react'
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaMapMarkerAlt,
  FaWhatsapp
} from "react-icons/fa"
import { SiTiktok } from "react-icons/si"

export default function Navbar() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [tourMenuOpen, setTourMenuOpen] = useState(false)
  const location = useLocation()
  const tourRef = useRef(null)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    setIsAdminLoggedIn(!!token)
  }, [location])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tourRef.current && !tourRef.current.contains(event.target)) {
        setTourMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setIsAdminLoggedIn(false)
    window.location.href = '/'
  }

  const closeMenu = () => {
    setMenuOpen(false)
    setTourMenuOpen(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white shadow-lg h-20">
      
      <div className="flex justify-between items-center h-full px-6">

        {/* Logo */}
        <div className="flex items-center space-x-3 h-full">
          <img src={logo} alt="Highland Escapes Logo" className="h-16 w-auto" />
          <span className="font-semibold text-lg md:text-xl truncate">
            Highland Escapes Travelers
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 h-full">

          <Link to="/" className={`${isActive('/') ? 'underline text-yellow-400' : 'hover:text-gray-400'}`}>Home</Link>
          <Link to="/about" className={`${isActive('/about') ? 'underline text-yellow-400' : 'hover:text-gray-400'}`}>About</Link>

          {/* Tours Dropdown */}
          <div className="relative" ref={tourRef}>
            <button
              onClick={() => setTourMenuOpen(!tourMenuOpen)}
              className="flex items-center gap-1 hover:text-gray-400"
            >
              Tours
              <FaChevronDown className={`transition-transform duration-300 ${tourMenuOpen ? 'rotate-180' : 'rotate-0'}`} size={16}/>
            </button>

            {tourMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-black rounded shadow-lg overflow-hidden animate-slideDown">
                <div className="grid grid-cols-2 gap-4 p-4">
                  <div>
                    <h4 className="font-semibold mb-2">Domestic Tours</h4>
                    <Link to="/tours/domestic" className={`block py-1 px-2 rounded hover:bg-gray-800 ${isActive('/tours/domestic') ? 'bg-gray-700 text-yellow-400' : ''}`} onClick={closeMenu}>🇵🇰 Domestic Tours</Link>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">International Tours</h4>
                    <Link to="/tours/international" className={`block py-1 px-2 rounded hover:bg-gray-800 ${isActive('/tours/international') ? 'bg-gray-700 text-yellow-400' : ''}`} onClick={closeMenu}>International Tours</Link>
                  </div>
                </div>
                <div className="border-t border-gray-700 p-2">
                  <Link to="/tours" className={`block py-1 px-2 rounded hover:bg-gray-800 ${isActive('/tours') ? 'bg-gray-700 text-yellow-400' : ''}`} onClick={closeMenu}>All Tours</Link>
                </div>
              </div>
            )}
          </div>

          <Link to="/hotels" className={`${isActive('/hotels') ? 'underline text-yellow-400' : 'hover:text-gray-400'}`}>Hotels</Link>
          <Link to="/destinations" className={`${isActive('/destinations') ? 'underline text-yellow-400' : 'hover:text-gray-400'}`}>Destinations</Link>
          <Link to="/contact" className={`${isActive('/contact') ? 'underline text-yellow-400' : 'hover:text-gray-400'}`}>Contact</Link>

          {/* Admin Links */}
          {isAdminLoggedIn && (
            <>
              <Link to="/admin/dashboard" className={`${isActive('/admin/dashboard') ? 'underline text-yellow-400' : 'hover:text-gray-400'}`}>Dashboard</Link>
              <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition font-semibold">Logout</button>
            </>
          )}
        </div>

        {/* Social Icons */}
        <div className="hidden md:flex items-center space-x-3">
          <a href="https://www.facebook.com/people/Highland-Escapes-Travelers/pfbid0366S8KuYVR8yETWDJgSkZa6XD8BmiKefRuvMXLnD2gffMpNHRWzqr3PEKDPYpETUVl/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500"><FaFacebookF size={16} /></a>
          <a href="https://www.instagram.com/highlandescapestravelers/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500"><FaInstagram size={16} /></a>
          <a href="https://www.tiktok.com/@highlandescapestraveler6" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300"><SiTiktok size={16} /></a>
          <a href="https://www.youtube.com/channel/UCV6PtuV3PiQ6BSBbyCJGtTA" target="_blank" rel="noopener noreferrer" className="hover:text-red-600"><FaYoutube size={16} /></a>
          <a href="https://wa.me/923043461111" target="_blank" rel="noopener noreferrer" className="hover:text-green-500"><FaWhatsapp size={16} /></a>
          <a href="https://maps.app.goo.gl/T4hRfUVscPJhYGgs9?g_st=aw" target="_blank" rel="noopener noreferrer" className="hover:text-red-500"><FaMapMarkerAlt size={16} /></a>
        </div>

        {/* Hamburger */}
        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 px-6 py-6 space-y-4">
          <Link to="/" onClick={closeMenu} className="block text-lg hover:text-yellow-400">Home</Link>
          <Link to="/about" onClick={closeMenu} className="block text-lg hover:text-yellow-400">About</Link>

          {/* Mobile Tours */}
<div>
  <button
    onClick={() => setTourMenuOpen(!tourMenuOpen)}
    className="w-full flex justify-between items-center text-lg hover:text-yellow-400"
  >
    Tours <FaChevronDown className={`transition-transform duration-300 ${tourMenuOpen ? 'rotate-180' : 'rotate-0'}`} />
  </button>

  {tourMenuOpen && (
    <div className="ml-4 mt-2 space-y-2">
      <Link
        to="/tours/domestic"
        className="block hover:text-yellow-400"
        onClick={(e) => {
          e.stopPropagation(); // Prevent parent button toggle interference
          closeMenu();         // Close mobile menu
        }}
      >
        🇵🇰 Domestic Tours
      </Link>
      <Link
        to="/tours/international"
        className="block hover:text-yellow-400"
        onClick={(e) => {
          e.stopPropagation();
          closeMenu();
        }}
      >
        International Tours
      </Link>
      <Link
        to="/tours"
        className="block hover:text-yellow-400"
        onClick={(e) => {
          e.stopPropagation();
          closeMenu();
        }}
      >
        All Tours
      </Link>
    </div>
  )}
</div>


          <Link to="/hotels" onClick={closeMenu} className="block text-lg hover:text-yellow-400">Hotels</Link>
          <Link to="/destinations" onClick={closeMenu} className="block text-lg hover:text-yellow-400">Destinations</Link>
          <Link to="/contact" onClick={closeMenu} className="block text-lg hover:text-yellow-400">Contact</Link>

          {/* Mobile Socials */}
          <div className="flex justify-center gap-4 pt-6 border-t border-gray-700">
            <a href="https://www.facebook.com/people/Highland-Escapes-Travelers/pfbid0366S8KuYVR8yETWDJgSkZa6XD8BmiKefRuvMXLnD2gffMpNHRWzqr3PEKDPYpETUVl/" target="_blank" rel="noopener noreferrer"><FaFacebookF size={20} /></a>
            <a href="https://www.instagram.com/highlandescapestravelers/" target="_blank" rel="noopener noreferrer"><FaInstagram size={20} /></a>
            <a href="https://www.tiktok.com/@highlandescapestraveler6" target="_blank" rel="noopener noreferrer"><SiTiktok size={20} /></a>
            <a href="https://www.youtube.com/channel/UCV6PtuV3PiQ6BSBbyCJGtTA" target="_blank" rel="noopener noreferrer"><FaYoutube size={20} /></a>
            <a href="https://wa.me/923043461111" target="_blank" rel="noopener noreferrer"><FaWhatsapp size={20} /></a>
            <a href="https://maps.app.goo.gl/T4hRfUVscPJhYGgs9?g_st=aw" target="_blank" rel="noopener noreferrer"><FaMapMarkerAlt size={20} /></a>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </nav>
  )
}
