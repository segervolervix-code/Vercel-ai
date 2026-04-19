// pages/index.tsx
import { useState } from "react";

export default function Home() {
  const [mode, setMode] = useState<"chat" | "image">("chat");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const endpoint = mode === "chat" ? "/api/chat" : "/api/imagine";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();
      setResult(data.result || JSON.stringify(data, null, 2));
    } catch (err: any) {
      setResult("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="grid-overlay" />
      <main className="card">
        <header className="header">
          <h1>SEGERVOLERVIX AI CONSOLE</h1>
          <p>Futuristic interface · Secure proxy · Vercel-ready</p>
        </header>

        <section className="mode-switch">
          <button
            className={mode === "chat" ? "active" : ""}
            onClick={() => setMode("chat")}
          >
            Chat
          </button>
          <button
            className={mode === "image" ? "active" : ""}
            onClick={() => setMode("image")}
          >
            Image
          </button>
        </section>

        <form onSubmit={handleSubmit} className="form">
          <label>
            <span>{mode === "chat" ? "Chat prompt" : "Image prompt"}</span>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                mode === "chat"
                  ? "Ask anything…"
                  : "Describe the image you want…"
              }
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Processing…" : "Send to AI"}
          </button>
        </form>

        <section className="output">
          <h2>Output</h2>
          {loading && <div className="pulse">Contacting AI core…</div>}
          {!loading && result && (
            <pre className="result">
              {result}
            </pre>
          )}
          {!loading && !result && (
            <p className="hint">
              Output will appear here. Your request is routed securely through
              your own API.
            </p>
          )}
        </section>
      </main>

      <style jsx>{`
        .page {
          min-height: 100vh;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at top, #1bffff 0, #111827 40%, #020617 100%);
          color: #e5e7eb;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text",
            "Segoe UI", sans-serif;
          position: relative;
          overflow: hidden;
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(
              rgba(148, 163, 184, 0.08) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(148, 163, 184, 0.08) 1px,
              transparent 1px
            );
          background-size: 40px 40px;
          opacity: 0.6;
          pointer-events: none;
        }

        .card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 900px;
          margin: 2rem;
          padding: 2rem 2.5rem;
          border-radius: 1.5rem;
          background: radial-gradient(circle at top left, #0f172a, #020617);
          border: 1px solid rgba(148, 163, 184, 0.4);
          box-shadow: 0 0 40px rgba(56, 189, 248, 0.4),
            0 0 120px rgba(59, 130, 246, 0.3);
          backdrop-filter: blur(18px);
        }

        .card::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(56, 189, 248, 0.9),
            rgba(129, 140, 248, 0.7),
            rgba(236, 72, 153, 0.7)
          );
          -webkit-mask: linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.7;
          pointer-events: none;
        }

        .header h1 {
          font-size: 1.8rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin: 0 0 0.4rem;
          background: linear-gradient(to right, #e5e7eb, #38bdf8, #a855f7);
          -webkit-background-clip: text;
          color: transparent;
        }

        .header p {
          margin: 0;
          color: #9ca3af;
          font-size: 0.9rem;
        }

        .mode-switch {
          display: inline-flex;
          margin-top: 1.5rem;
          border-radius: 999px;
          padding: 0.2rem;
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(148, 163, 184, 0.5);
        }

        .mode-switch button {
          border: none;
          background: transparent;
          color: #9ca3af;
          padding: 0.4rem 1.2rem;
          border-radius: 999px;
          font-size: 0.85rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.18s ease-out;
        }

        .mode-switch button.active {
          background: radial-gradient(circle at top, #38bdf8, #1d4ed8);
          color: #0b1120;
          box-shadow: 0 0 18px rgba(56, 189, 248, 0.7);
        }

        .form {
          margin-top: 1.8rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form label span {
          display: block;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: #9ca3af;
          margin-bottom: 0.4rem;
        }

        .form textarea {
          width: 100%;
          min-height: 120px;
          border-radius: 1rem;
          border: 1px solid rgba(148, 163, 184, 0.6);
          background: radial-gradient(circle at top left, #020617, #020617);
          color: #e5e7eb;
          padding: 0.9rem 1rem;
          resize: vertical;
          font-size: 0.95rem;
          outline: none;
          box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.9);
        }

        .form textarea:focus {
          border-color: #38bdf8;
          box-shadow: 0 0 0 1px #38bdf8, 0 0 30px rgba(56, 189, 248, 0.4);
        }

        .form button {
          align-self: flex-end;
          margin-top: 0.4rem;
          padding: 0.7rem 1.6rem;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          background: linear-gradient(135deg, #22c55e, #38bdf8);
          color: #020617;
          box-shadow: 0 0 24px rgba(34, 197, 94, 0.6);
          transition: transform 0.12s ease-out, box-shadow 0.12s ease-out,
            filter 0.12s ease-out;
        }

        .form button:hover:not(:disabled) {
          transform: translateY(-1px) scale(1.01);
          box-shadow: 0 0 32px rgba(56, 189, 248, 0.8);
          filter: brightness(1.05);
        }

        .form button:disabled {
          opacity: 0.6;
          cursor: default;
          box-shadow: none;
        }

        .output {
          margin-top: 2rem;
          padding-top: 1.4rem;
          border-top: 1px solid rgba(55, 65, 81, 0.9);
        }

        .output h2 {
          margin: 0 0 0.8rem;
          font-size: 0.9rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #9ca3af;
        }

        .result {
          margin: 0;
          padding: 1rem 1.1rem;
          border-radius: 1rem;
          background: radial-gradient(circle at top left, #020617, #020617);
          border: 1px solid rgba(148, 163, 184, 0.6);
          color: #e5e7eb;
          font-size: 0.9rem;
          max-height: 320px;
          overflow: auto;
          white-space: pre-wrap;
        }

        .hint {
          margin: 0;
          color: #6b7280;
          font-size: 0.85rem;
        }

        .pulse {
          font-size: 0.9rem;
          color: #38bdf8;
          text-shadow: 0 0 12px rgba(56, 189, 248, 0.9);
          animation: pulse 1.4s ease-in-out infinite;
        }

        @keyframes pulse {
          0% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.4;
          }
        }

        @media (max-width: 640px) {
          .card {
            margin: 1.2rem;
            padding: 1.6rem 1.4rem;
          }

          .header h1 {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </div>
  );
}
