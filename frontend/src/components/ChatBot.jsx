import React, { useState, useRef, useEffect } from "react";

const predefinedAnswers = {
  "hello": "Hi! How can I assist you with your travel plans today?",
  "tours": "We offer Beach, Mountain, City, and International tours.",
  "pricing": "Our packages start from $299. Contact us for custom quotes!",
  "guides": "We have expert guides ready to make your trip memorable.",
};

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! I am your travel assistant. Ask me anything." },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); // toggle chat visibility
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text: input }]);

    const key = input.toLowerCase();
    const answer = predefinedAnswers[key] || "Sorry, I didn't understand that. Try asking about tours, guides, or pricing.";

    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: answer }]);
    }, 500);

    setInput("");
  };

  const handleClear = () => {
    setMessages([
      { from: "bot", text: "Hello! I am your travel assistant. Ask me anything." },
    ]);
    setInput("");
    // Optionally close chat on clear:
    // setIsOpen(false);
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat icon when closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition"
        >
          💬
        </button>
      )}

      {/* Chat window when open */}
      {isOpen && (
        <div className="w-80 bg-white shadow-xl rounded-xl flex flex-col overflow-hidden">
          <div className="bg-gray-800 text-white p-3 font-semibold flex justify-between items-center">
            <span>Travel Assistant</span>
            <div className="flex space-x-2">
              <button
                onClick={handleClear}
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs rounded"
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 text-xs rounded"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="flex-1 p-3 overflow-y-auto h-64 space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`${msg.from === "bot" ? "text-left" : "text-right"}`}
              >
                <div
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.from === "bot"
                      ? "bg-gray-200 text-gray-800"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex border-t border-gray-300">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 outline-none"
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 py-2 font-semibold"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
