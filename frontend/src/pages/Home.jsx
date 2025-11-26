// src/pages/Home.jsx
import { useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8000";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState("tfidf"); // "tfidf" or "bert"

  const handleCheck = async () => {
    setError("");
    setResult(null);

    if (!text.trim()) {
      setError("Please paste a news headline or article.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/predict`, {
        text,
        model, // send selected model to backend
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Check backend and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        background: "#f1f5f9",
        minHeight: "100vh",
        color: "#0f172a",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
        📰 AI Fake News Classifier
      </h1>
      <p style={{ maxWidth: "650px", marginBottom: "1rem", color: "#475569" }}>
        Paste a news headline or short article. Choose a model and the system
        will predict whether it&apos;s <b>Fake</b> or <b>Real</b>.
      </p>

      {/* Model selector */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ marginRight: "0.5rem", fontWeight: 600 }}>Model:</label>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          style={{
            padding: "0.4rem 0.6rem",
            borderRadius: "6px",
            border: "1px solid #cbd5e1",
            background: "#ffffff",
          }}
        >
          <option value="tfidf">TF-IDF + Logistic Regression</option>
          <option value="bert">DistilBERT (Transformers)</option>
        </select>
      </div>

      <textarea
        rows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste news article here..."
        style={{
          width: "100%",
          maxWidth: "700px",
          padding: "1rem",
          background: "#ffffff",
          border: "1px solid #cbd5e1",
          borderRadius: "10px",
          color: "#0f172a",
          fontSize: "1rem",
        }}
      />

      {error && (
        <p style={{ color: "#b91c1c", marginTop: "0.75rem" }}>{error}</p>
      )}

      <button
        onClick={handleCheck}
        disabled={loading}
        style={{
          marginTop: "1rem",
          padding: "0.8rem 1.5rem",
          borderRadius: "8px",
          background: loading
            ? "#9ca3af"
            : "linear-gradient(90deg, #22c55e, #16a34a)",
          border: "none",
          color: "white",
          fontWeight: 600,
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "1rem",
        }}
      >
        {loading ? "Checking..." : "Check Authenticity"}
      </button>

      {result && (
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            borderRadius: "10px",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            maxWidth: "700px",
          }}
        >
          <p style={{ marginBottom: "0.3rem" }}>
            <b>Prediction:</b>{" "}
            <span
              style={{
                fontWeight: 700,
                color:
                  result.label?.toLowerCase() === "fake"
                    ? "#ea580c"
                    : "#16a34a",
              }}
            >
              {result.label ? result.label.toUpperCase() : "N/A"}
            </span>
          </p>

          <p style={{ marginBottom: "0.3rem", color: "#475569" }}>
            <b>Confidence:</b>{" "}
            {typeof result.confidence === "number"
              ? (result.confidence * 100).toFixed(2) + "%"
              : "N/A"}
          </p>

          <p style={{ marginBottom: "0.3rem", color: "#64748b" }}>
            <b>Used model:</b>{" "}
            {result.used_model === "bert"
              ? "DistilBERT (Transformers)"
              : "TF-IDF + Logistic Regression"}
          </p>

          <p
            style={{
              fontSize: "0.85rem",
              color: "#94a3b8",
              marginTop: "0.5rem",
            }}
          >
            ⚠️ This is an AI-based estimate. Always verify news from trusted
            sources.
          </p>
        </div>
      )}
    </div>
  );
}
