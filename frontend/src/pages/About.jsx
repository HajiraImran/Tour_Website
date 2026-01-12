import {
  FaShieldAlt,
  FaLeaf,
  FaSuitcase,
  FaUsers,
  FaBriefcase,
  FaHeart,
  FaGlobeAmericas,
  FaMountain,
  FaMapMarkedAlt,
  FaClock,
  FaHotel
} from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip as PieTooltip,
  ResponsiveContainer as PieResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as BarTooltip,
  ResponsiveContainer as BarResponsiveContainer,
} from "recharts";

export default function AboutPage() {
  const pieData = [
    { name: "Domestic Tours", value: 60, color: "#1E40AF" },
    { name: "International Tours", value: 30, color: "#059669" },
    { name: "Custom Packages", value: 10, color: "#9333EA" },
  ];

  const barData = [
    { name: "Destinations", value: 50 },
    { name: "Tours Organized", value: 500 },
    { name: "Happy Travelers", value: 1000 },
    { name: "Hotels Partnered", value: 200 },
    { name: "Tour Packages", value: 150 },
    { name: "Customer Support", value: 24 },
  ];

  const achievements = [
    { icon: <FaGlobeAmericas />, title: "100+ Destinations" },
    { icon: <FaMountain />, title: "1000+ Tours Organized" },
    { icon: <FaUsers />, title: "1000+ Happy Travelers" },
    { icon: <FaHotel />, title: "200+ Hotels Partnered" },
    { icon: <FaMapMarkedAlt />, title: "500+ Tour Packages" },
    { icon: <FaClock />, title: "24/7 Customer Support" },
  ];

  return (
    <div className="text-gray-800 font-sans">

      {/* HERO */}
      <section
        className="h-[70vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')" }}
      >
        <div className="bg-black/60 w-full h-full flex items-center justify-center text-center px-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About Highland Escapes Travelers
            </h1>
            <p className="text-white max-w-2xl mx-auto">
              Premium travel experiences built on trust, safety, and authenticity.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <Section title="About Us">
        Highland Escapes Travelers Pvt. Ltd. is a professional travel and tourism
        company dedicated to delivering premium, well-planned travel experiences.
        We specialize in both domestic and international tour operations, offering
        journeys that combine comfort, safety, and cultural authenticity.
        <br /><br />
        Our customer-focused approach ensures every itinerary is designed with
        care, transparency, and attention to detail. At Highland Escapes, travel
        is more than reaching a destination, it’s about discovery, connection,
        and lasting memories.
      </Section>

      {/* MISSION & VISION */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 space-y-20">

          {/* Mission */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <video
  src="/videos/tour7.mp4"
  autoPlay
  loop
  muted
  playsInline
  className="rounded-3xl shadow-xl object-cover w-full h-80 md:h-96"
></video>

            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
               To serve travelers through thoughtfully curated journeys that blend comfort, safety, adventure, and cultural immersion. Every trip is designed to create lasting memories and authentic experiences, inspiring meaningful connections with destinations and people along the way. We believe travel should enrich lives, spark curiosity, and leave a lasting impact, which is why each journey is crafted with passion, precision, and personalized care-turning every experience into a story worth remembering.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="flex flex-col md:flex-row items-center gap-10 md:flex-row-reverse">
            <div className="flex-1">
             <img
  src="/images/vision.jpg"
  alt="Vision"
  className="rounded-3xl shadow-xl object-cover w-full h-80 md:h-96"
/>

            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To become a trusted and innovative travel brand, setting new standards in experiential tourism while expanding across Pakistan and global destinations. We aim to redefine the way people explore the world by delivering exceptional, immersive, and meaningful travel experiences. Through continuous innovation, responsible tourism, and a deep respect for local cultures, we strive to build lasting relationships with travelers and partners alike-becoming a name synonymous with quality, trust, and unforgettable journeys.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SAFETY & RESPONSIBLE TOURISM */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Safety & Responsible Tourism</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <FaShieldAlt className="text-4xl text-white mb-4" />
              <h3 className="font-semibold text-xl mb-2 text-white">Traveler Safety</h3>
              <p className="text-white">
                Traveler safety is our top priority. We follow strict safety
                standards supported by experienced guides, safety kits,
                first-aid measures, and reliable arrangements.
              </p>
            </Card>
            <Card>
              <FaLeaf className="text-4xl text-white mb-4" />
              <h3 className="font-semibold text-xl mb-2 text-white">Responsible Tourism</h3>
              <p className="text-white">
                We practice ethical tourism by respecting local cultures,
                protecting the environment, and supporting local communities.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            <Card icon={<FaSuitcase />} text="Customized Holidays" />
            <Card icon={<FaUsers />} text="Group Tours" />
            <Card icon={<FaBriefcase />} text="Corporate & MICE Travel" />
            <Card icon={<FaHeart />} text="Honeymoon Packages" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Our Stats</h2>
          <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
We take pride in our journey. Here are some key statistics that reflect our experience and commitment.
Each number tells a story of trust, excellence, and unforgettable travel experiences crafted with care.
From first-time explorers to seasoned travelers, our growing community inspires us to raise the bar every day.          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <ChartCard>
              <h3 className="text-2xl font-bold mb-6">Tours Breakdown</h3>
              <PieResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    outerRadius={100}
                    label={({ name, percent }) => `${name}: ${(percent*100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <PieTooltip />
                </PieChart>
              </PieResponsiveContainer>
            </ChartCard>
            <ChartCard>
              <h3 className="text-2xl font-bold mb-6">Travel Statistics</h3>
              <BarResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />
                  <XAxis dataKey="name" stroke="#ffffff99" />
                  <YAxis stroke="#ffffff99" />
                  <Bar dataKey="value" fill="#facc15" />
                  <BarTooltip />
                </BarChart>
              </BarResponsiveContainer>
            </ChartCard>
            <ChartCard>
              <h3 className="text-2xl font-bold mb-6">Tours Growth</h3>
              <BarResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { year: 2019, tours: 200 },
                    { year: 2020, tours: 300 },
                    { year: 2021, tours: 400 },
                    { year: 2022, tours: 500 },
                    { year: 2023, tours: 600 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />
                  <XAxis dataKey="year" stroke="#ffffff99" />
                  <YAxis stroke="#ffffff99" />
                  <Bar dataKey="tours" fill="#10B981" />
                  <BarTooltip />
                </BarChart>
              </BarResponsiveContainer>
            </ChartCard>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-10">Our Achievements</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {achievements.map((item, i) => (
              <Card key={i}>
                <div className="text-5xl mb-4">{item.icon}</div>
                <p className="text-xl text-white">{item.title}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

// Reusable section
function Section({ title, children }) {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700 leading-relaxed">{children}</p>
      </div>
    </section>
  );
}

// Reusable card
function Card({ children, icon, text }) {
  return (
    <div className="bg-gradient-to-r from-gray-800 via-black to-gray-900 text-white p-6 rounded-3xl shadow-xl flex flex-col items-center justify-center hover:-translate-y-2 hover:shadow-2xl transition">
      {icon && <div className="text-3xl mb-3">{icon}</div>}
      {text && <p className="font-semibold text-white text-center">{text}</p>}
      {children}
    </div>
  );
}

// Chart card wrapper
function ChartCard({ children }) {
  return (
    <div className="rounded-3xl shadow-xl p-8 bg-gradient-to-r from-gray-800 via-black to-gray-900 text-white">
      {children}
    </div>
  );
}
