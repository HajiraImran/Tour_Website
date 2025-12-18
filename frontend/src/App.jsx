import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Tours from './pages/Tours.jsx'
import Destinations from './pages/Destinations.jsx'
import BookingModal from './pages/BookingModal.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import DestinationDetail from "./pages/DestinationDetail";
import AdminRegistration from "./pages/AdminRegistration.jsx"; // path check karein
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard";





function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/bookingmodal" element={<BookingModal />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tours/category/:categoryName" element={<CategoryPage />} />
        <Route path="/destination/:slug" element={<DestinationDetail />} />
        <Route path="/admin/register" element={<AdminRegistration />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        




      </Routes>
      <Footer />
    </Router>
  )
}

export default App
