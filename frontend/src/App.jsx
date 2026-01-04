import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Tours from './pages/Tours.jsx'
import Destinations from './pages/Destinations.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import DestinationDetail from "./pages/DestinationDetail.jsx"

import AdminLogin from "./pages/AdminLogin.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx"
import AdminRoute from "./components/AdminRoute.jsx" // naya secure route
import TourDetails from "./pages/TourDetails.jsx";
import InternationalTours from "./pages/InternationalTours";
import DomesticTours from "./pages/DomesticTours.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx" // ✅ ADD THIS
import TermsPolicies from './pages/TermsPolicies';
import Hotels from "./pages/Hotels";







function App() {
  return (
    <Router>
      <Navbar />
      <WhatsAppButton />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/:id" element={<TourDetails />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tours/category/:categoryName" element={<CategoryPage />} />
        <Route path="/destination/:slug" element={<DestinationDetail />} />
        <Route path="/tours/international" element={<InternationalTours />} />
        <Route path="/tours/domestic" element={<DomesticTours />} />
        <Route path="/terms-policies" element={<TermsPolicies />} />
          <Route path="/hotels" element={<Hotels />} />




        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
