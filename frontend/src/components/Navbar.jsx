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

  // Click outside to close tours dropdown
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
      
      {/* ================= MAIN BAR ================= */}
      <div className="flex justify-between items-center h-full px-6">

        {/* Logo */}
        <div className="flex items-center space-x-3 h-full">
          <img src={logo} alt="Highland Escapes Logo" className="h-16 w-auto" />
          <span className="font-bold text-xl md:text-2xl truncate">
            Highland Escapes Travelers
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 h-full">

          {/* 1. Home */}
          <Link to="/" className={`${isActive('/') ? 'underline text-yellow-400' : 'hover:text-gray-400'}`}>
            Home
          </Link>

          {/* 2. About */}
          <Link to="/about" className={`${isActive('/about') ? 'underline text-yellow-400' : 'hover:text-gray-400'}`}>
            About
          </Link>

          {/* 3. Tours Mega Dropdown */}
          <div className="relative" ref={tourRef}>
            <button
              onClick={() => setTourMenuOpen(!tourMenuOpen)}
              className="flex items-center gap-1 hover:text-gray-400"
            >
              Tours
              <FaChevronDown
                className={`transition-transform duration-300 ${tourMenuOpen ? 'rotate-180' : 'rotate-0'}`}
                size={16}
              />
            </button>

            {tourMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-black rounded shadow-lg overflow-hidden animate-slideDown">
                <div className="grid grid-cols-2 gap-4 p-4">
                  <div>
                    <h4 className="font-semibold mb-2">Domestic Tours</h4>
                    <Link
                      to="/tours/domestic"
                      className={`block py-1 px-2 rounded hover:bg-gray-800 ${isActive('/tours/domestic') ? 'bg-gray-700 text-yellow-400' : ''}`}
                      onClick={closeMenu}
                    >
                      🇵🇰 Domestic Tours
                    </Link>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">International Tours</h4>
                    <Link
                      to="/tours/international"
                      className={`block py-1 px-2 rounded hover:bg-gray-800 ${isActive('/tours/international') ? 'bg-gray-700 text-yellow-400' : ''}`}
                      onClick={closeMenu}
                    >
                      International Tours
                    </Link>
                  </div>
                </div>

                <div className="border-t border-gray-700 p-2">
                  <Link
                    to="/tours"
                    className={`block py-1 px-2 rounded hover:bg-gray-800 ${isActive('/tours') ? 'bg-gray-700 text-yellow-400' : ''}`}
                    onClick={closeMenu}
                  >
                    All Tours
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 4. Destinations */}
          <Link to="/destinations" className={`${isActive('/destinations') ? 'underline text-yellow-400' : 'hover:text-gray-400'}`}>
            Destinations
          </Link>

          {/* 5. Hotels */}
<Link
  to="/hotels"
  className={`${isActive('/hotels') ? 'underline text-yellow-400' : 'hover:text-gray-400'}`}
>
  Hotels
</Link>


          {/* 5. Contact */}
          <Link to="/contact" className={`${isActive('/contact') ? 'underline text-yellow-400' : 'hover:text-gray-400'}`}>
            Contact
          </Link>

          {/* Admin Links */}
          {isAdminLoggedIn && (
            <>
              <Link to="/admin/dashboard" className={`${isActive('/admin/dashboard') ? 'underline text-yellow-400' : 'hover:text-gray-400'}`}>
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Social Icons + WhatsApp & Location */}
        <div className="hidden md:flex items-center space-x-3">
          <a href="#" className="hover:text-blue-500"><FaFacebookF size={16} /></a>
          <a href="#" className="hover:text-pink-500"><FaInstagram size={16} /></a>
          <a href="#" className="hover:text-white"><SiTiktok size={16} /></a>
          <a href="#" className="hover:text-red-500"><FaYoutube size={18} /></a>
          <a href="https://wa.me/923043461111" target="_blank" rel="noopener noreferrer" className="bg-green-600 p-2 rounded-full hover:bg-green-700"><FaWhatsapp size={18} /></a>
          <a href="https://maps.app.goo.gl/T4hRfUVscPJhYGgs9?g_st=aw" target="_blank" rel="noopener noreferrer" className="bg-red-600 p-2 rounded-full hover:bg-red-700"><FaMapMarkerAlt size={18} /></a>
        </div>

        {/* Hamburger */}
        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
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
              Tours
              <FaChevronDown className={`transition-transform duration-300 ${tourMenuOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>

            {tourMenuOpen && (
              <div className="ml-4 mt-2 space-y-2">
                <Link to="/tours/domestic" onClick={closeMenu} className="block hover:text-yellow-400">🇵🇰 Domestic Tours</Link>
                <Link to="/tours/international" onClick={closeMenu} className="block hover:text-yellow-400">International Tours</Link>
                <Link to="/tours" onClick={closeMenu} className="block hover:text-yellow-400">All Tours</Link>
              </div>
            )}
          </div>

          <Link to="/destinations" onClick={closeMenu} className="block text-lg hover:text-yellow-400">Destinations</Link>
          <Link to="/contact" onClick={closeMenu} className="block text-lg hover:text-yellow-400">Contact</Link>

          {/* Mobile Socials + WhatsApp & Location */}
          <div className="flex justify-center gap-4 pt-6 border-t border-gray-700">
            <FaFacebookF size={20} />
            <FaInstagram size={20} />
            <SiTiktok size={20} />
            <FaYoutube size={22} />
            <a href="https://wa.me/923043461111" target="_blank" rel="noopener noreferrer" className="bg-green-600 p-2 rounded-full hover:bg-green-700"><FaWhatsapp size={18} /></a>
            <a href="https://maps.app.goo.gl/T4hRfUVscPJhYGgs9?g_st=aw" target="_blank" rel="noopener noreferrer" className="bg-red-600 p-2 rounded-full hover:bg-red-700"><FaMapMarkerAlt size={18} /></a>
          </div>
        </div>
      )}

      {/* ================= SLIDE-DOWN ANIMATION ================= */}
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
