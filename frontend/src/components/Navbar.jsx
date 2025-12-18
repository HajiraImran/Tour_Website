import { Link } from 'react-router-dom'
import logo from '../assets/logos.png' // Adjust the path to your logo

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white p-4 flex justify-between items-center shadow-lg">
      {/* Logo + Brand Name */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Highland Escapes Logo" className="h-16 w-auto" />
        <span className="font-bold text-xl">Highland Escapes Travelers</span>
      </div>

      {/* Navigation Links */}
      <div className="space-x-4 hidden md:flex">
        <Link to="/" className="hover:underline hover:text-gray-400 transition duration-200">Home</Link>
        <Link to="/tours" className="hover:underline hover:text-gray-400 transition duration-200">Tours</Link>
        <Link to="/destinations" className="hover:underline hover:text-gray-400 transition duration-200">Destinations</Link>
        <Link to="/booking" className="hover:underline hover:text-gray-400 transition duration-200">Booking</Link>
        <Link to="/about" className="hover:underline hover:text-gray-400 transition duration-200">About</Link>
        <Link to="/contact" className="hover:underline hover:text-gray-400 transition duration-200">Contact</Link>
        <Link to="/admin/register">Register</Link>
        <Link to="/admin/login">Login</Link>
      </div>
    </nav>
  )
}
