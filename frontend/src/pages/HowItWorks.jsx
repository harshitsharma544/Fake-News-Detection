export default function HowItWorks() {
  return (
    <div style={{ padding: "2rem", color: "#e5e7eb" }}>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>How It Works</h2>

      <p style={{ maxWidth: "700px", lineHeight: "1.8" }}>
        ✔ Text is cleaned and preprocessed ✔ TF-IDF converts the article into
        numbers ✔ Logistic Regression finds patterns ✔ The model outputs whether
        text is <b>Fake</b> or <b>Real</b>
      </p>
    </div>
  );
}
