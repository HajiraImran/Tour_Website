import React, { useState } from "react";

export default function ChatBot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);

    const userMsg = { sender: "user", text: message };
    setChat([...chat, userMsg]);

    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    const botMsg = { sender: "bot", text: data.reply };

    setChat([...chat, userMsg, botMsg]);
    setMessage("");
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white shadow-xl rounded-xl p-4">
      <h2 className="text-xl font-bold mb-2 text-center">💬 Chat With Us</h2>

      <div className="h-64 overflow-y-auto border p-2 rounded mb-3 bg-gray-50">
        {chat.map((msg, i) => (
          <p
            key={i}
            className={`p-2 my-1 rounded ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200"
            }`}
          >
            {msg.text}
          </p>
        ))}
        {loading && <p className="text-gray-500">Typing...</p>}
      </div>

      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
