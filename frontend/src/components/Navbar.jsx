import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        background: "#0f172a",
        borderBottom: "1px solid #1e293b",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <h2 style={{ color: "#22c55e", fontWeight: 700 }}>Fake News AI</h2>

      <div style={{ display: "flex", gap: "1.5rem" }}>
        <Link to="/" style={{ color: "#e2e8f0" }}>
          Home
        </Link>
        <Link to="/about" style={{ color: "#e2e8f0" }}>
          About
        </Link>
        <Link to="/how" style={{ color: "#e2e8f0" }}>
          How it Works
        </Link>
        <Link to="/contact" style={{ color: "#e2e8f0" }}>
          Contact
        </Link>
      </div>
    </nav>
  );
}
