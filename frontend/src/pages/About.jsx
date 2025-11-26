export default function About() {
  return (
    <div
      style={{
        padding: "2rem",
        color: "#e5e7eb",
        background: "#020617",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem", color: "white" }}>
        About
      </h2>

      <p style={{ maxWidth: "700px", lineHeight: "1.8", color: "#cbd5e1" }}>
        This AI-powered Fake News Detector uses machine learning and natural
        language processing to classify whether a given news headline or article
        is likely to be real or fake.
      </p>

      <p style={{ maxWidth: "700px", marginTop: "1rem", color: "#cbd5e1" }}>
        It is trained on a large dataset using TF-IDF vectorization and Logistic
        Regression to deliver high-accuracy predictions.
      </p>
    </div>
  );
}
