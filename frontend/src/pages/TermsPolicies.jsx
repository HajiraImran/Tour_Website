import React, { useState } from "react";
import logo from "../assets/logos.png";

const faqData = [
  {
    question: "What travel services do you offer?",
    answer: "We provide both domestic and international tours, customized itineraries, fixed departure trips, transportation, hotel bookings, and guided sightseeing."
  },
  {
    question: "How to book a trip?",
    answer: "You can book a trip online via our website or contact our office via WhatsApp, phone, or email. Payment can be made via cash, bank transfer, or cheque."
  },
  {
    question: "Where can I join the Northern areas trip from? (Fixed Departure Tour)",
    answer: "You can join from Islamabad. Departure timings and meeting points will be shared with all registered participants before the trip."
  },
  {
    question: "Will you provide train/ bus/ air tickets to travel to Islamabad and back to my city?",
    answer: "We can assist with transportation tickets if requested, but they are subject to availability and must be confirmed at the time of booking."
  },
  {
    question: "How many people are there in one trip? (Fixed Departure Tour)",
    answer: "Typically, the minimum group size is 10-12 people. Maximum depends on bus/hotel capacity."
  },
  {
    question: "What is the child policy for a tour?",
    answer: "Children are welcome. Prices depend on age and accommodation sharing. Please contact us for specific child rates."
  },
  {
    question: "What is tour refund or cancellation policy?",
    answer: "Refund policies depend on the type of tour and timing. See Terms & Conditions below for detailed refund rules."
  },
  {
    question: "In which city are you located?",
    answer: "Our office is located in Islamabad, Pakistan."
  }
];

export default function TermsPolicies() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">

      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-8 text-center">
        <img src={logo} alt="Highland Escapes Logo" className="h-20 w-auto mx-auto mb-4" />
        <h1 className="text-3xl font-bold">Terms & Policies</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto px-6 py-12 space-y-12">

        {/* Accordion FAQ */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqData.map((item, index) => (
              <div key={index} className="border border-gray-300 rounded">
                <button
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 flex justify-between items-center font-medium"
                  onClick={() => toggleFAQ(index)}
                >
                  {item.question}
                  <span className={`transition-transform ${openIndex === index ? "rotate-180" : "rotate-0"}`}>&#9660;</span>
                </button>
                {openIndex === index && (
                  <div className="px-4 py-3 border-t border-gray-300 text-gray-800">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Terms & Conditions */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Terms & Conditions</h2>
          <div className="space-y-4 leading-relaxed text-black">

            <h3 className="font-semibold text-gray-800">GROUP/FIXED DEPARTURE TOURS</h3>
            <p>Minimum number to carry out a trip is 10-12. In case a trip is called off due to low registration, members who have paid will be entitled to a 100% refund or transfer amount to the next trip.</p>
            <p>The above mentioned hotels are subject to availability during peak season.</p>
            <p>2 Person Sharing for ONLY Married Couple, Family, 2 Males, or 2 Females.</p>
            <p>Don't pollute the environment or you will be charged for it.</p>
            <p>Follow the team leader's orders and ethical integrity at all times.</p>
            <p>Members should report an hour before departure time. Late arrivals: bus leaves after 15 minutes.</p>
            <p>No refunds if members leave/exits during trip or due to natural disasters or unforeseen events.</p>
            <p>EVENTICA can cancel bookings or change terms at any time without notice.</p>
            <p>Personal weapons/drugs are strictly prohibited.</p>
            <p>Rooms are provided on Quad/4 persons sharing basis (including mattress).</p>
            <p>Bus/ Air/ Train tickets are subject to availability and confirmed after payment.</p>
            <p>Fare may change due to fuel price hikes.</p>

            <h3 className="font-semibold text-gray-800">PRIVATE/CUSTOMIZED Tours</h3>
            <p>Prices are net & exclusive of taxes. 50% payment at confirmation, remaining 50% before departure.</p>
            <p>Payment via CASH / BANK TRANSFER / CHEQUE.</p>
            <p>Original CNIC/Passport needed for all members.</p>
            <p>EVENTICA not responsible for personal injuries or loss of valuables.</p>

            <h3 className="font-semibold text-gray-800">Refund Policy</h3>
            <p>PRIVATE/CUSTOMIZED Tours: 10% service charges deducted for cash refund. Total can be adjusted within 3 months with 5% deduction.</p>
            <p>Hotels & Transport have specific refund rules depending on timing.</p>
            <p>GROUP/FIXED DEPARTURE TOURS: 90% refund if canceled 15 days before, 50% 7-14 days before, 25% 5 days before, 0% less than 5 days before.</p>

            <h3 className="font-semibold text-gray-800">Traveler's Instructions</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Keep original CNIC and photocopy if separate room needed.</li>
              <li>Travel lightly (max 10 KG) and carry a backpack.</li>
              <li>Keep thermals for extreme cold.</li>
              <li>Gents: 2-3 jeans, shirts, t-shirts, jacket, joggers.</li>
              <li>Ladies: 3-4 suits, couple of uppers, warm boots, shawl.</li>
              <li>Bring toiletries & water bottle.</li>
              <li>Carry raincoat/umbrella.</li>
              <li>Follow terms & conditions carefully.</li>
              <li>Be punctual; late arrivals may miss stops.</li>
              <li>Travel like a family, stay safe, respect locals.</li>
            </ul>

          </div>
        </section>

      </main>
    </div>
  );
}
