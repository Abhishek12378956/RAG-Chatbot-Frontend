import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ChatWindow from "./components/ChatWindow";
import ResetButton from "./components/ResetButton";
import { getHistory, postChat, resetSession } from "./services/api";

function App() {
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Initialize or load existing session from localStorage
    const existing = localStorage.getItem("sessionId");
    const sid = existing || uuidv4();
    setSessionId(sid);
    if (!existing) localStorage.setItem("sessionId", sid);

    // Load history
    (async () => {
      try {
        const data = await getHistory(sid);
        setMessages(data.messages || []);
      } catch (e) {
        console.warn("Failed to load history", e);
      }
    })();
  }, []);

  const handleSend = async (text) => {
    if (!text.trim()) return;
    setError("");

    const userMsg = {
      id: uuidv4(),
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await postChat({ message: text, sessionId });

      // Simulate streaming typing effect
      const assistantMsg = {
        id: uuidv4(),
        role: "assistant",
        content: "",
        timestamp: new Date().toISOString(),
        sources: res.sources || [],
      };

      setMessages((prev) => [...prev, assistantMsg]);

      await typeOutResponse(res.response, (chunk) => {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...assistantMsg,
            content: chunk,
          };
          return updated;
        });
      });
    } catch (e) {
      console.error(e);
      setError(e?.response?.data?.error || "Failed to get response");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      await resetSession(sessionId);
      setMessages([]);
      setError("");
    } catch (e) {
      setError("Failed to reset session");
    }
  };

  return (
    <div className="app">
      <header className="app__header">
        <div className="brand">
          <span className="brand__logo">📰</span>
          <div className="brand__text">
            <h1>News RAG Chatbot</h1>
            <p>Ask about the latest news with sources</p>
          </div>
        </div>
        <ResetButton onReset={handleReset} disabled={loading} />
      </header>

      {error && <div className="alert alert--error">{error}</div>}

      <main className="app__main">
        <ChatWindow messages={messages} onSend={handleSend} loading={loading} />
      </main>

      <footer className="app__footer">
        <p>Built with RAG • Qdrant • Jina • Gemini</p>
      </footer>
    </div>
  );
}

async function typeOutResponse(fullText, onChunk) {
  const delay = 8; // ms per character
  let buffer = "";
  for (let i = 0; i < fullText.length; i++) {
    buffer += fullText[i];
    if (i % 3 === 0) {
      onChunk(buffer);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  onChunk(fullText);
}

export default App;
