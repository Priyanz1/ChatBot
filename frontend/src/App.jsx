import React, { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!question.trim() || loading) return;

    const currentQuestion = question;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: currentQuestion }
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question: currentQuestion
        })
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.answer || "kuch answer ni aayo"
        }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "kuch error aa gayo bhai" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl h-[90vh] bg-white rounded-3xl shadow-2xl border border-pink-100 overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-400 text-white px-6 py-4 flex items-center gap-4 shadow">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl">
            💖
          </div>
          <div>
            <h1 className="text-xl font-bold">Your Love</h1>
            <p className="text-sm text-pink-50">Online</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-gradient-to-b from-white to-pink-50">
          {messages.length === 0 && !loading && (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-400 text-sm">Start the conversation 💬</p>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-md ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-md"
                    : "bg-white border border-pink-100 text-gray-800 rounded-bl-md"
                }`}
              >
                <p className="text-[11px] font-bold uppercase tracking-wide opacity-70 mb-1">
                  {msg.sender === "user" ? "You" : "AI"}
                </p>
                <p className="text-sm leading-6">{msg.text}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] px-4 py-3 rounded-2xl rounded-bl-md shadow-md bg-white border border-pink-100 text-gray-800">
                <p className="text-[11px] font-bold uppercase tracking-wide opacity-70 mb-2">
                  AI
                </p>
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce [animation-delay:0.15s]"></span>
                  <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce [animation-delay:0.3s]"></span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-pink-100 bg-white">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="message likho..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-gray-50 text-sm"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-md hover:scale-105 active:scale-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;