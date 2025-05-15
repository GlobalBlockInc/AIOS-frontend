import { useState } from "react";

export default function DonatePage() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Integrate Stripe or backend here in future
    console.log("Donation submitted:", { amount, message });
  };

  return (
    <div style={{ padding: "50px 20px", maxWidth: "800px", margin: "auto", fontFamily: "sans-serif" }}>
      <h1>Support the ThriveFund</h1>
      <p style={{ fontSize: "1.1em" }}>
        100% of donations go directly toward helping people pay for essentials like electricity, heating, or medical care — no overhead, no games.
      </p>

      {submitted ? (
        <div style={{ backgroundColor: "#d6ffe2", padding: "20px", borderRadius: "8px", marginTop: "30px" }}>
          <h3>Thank you for your kindness!</h3>
          <p>We’ll make sure every dollar is used to help someone in need.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
          <label style={labelStyle}>Donation Amount (USD)</label>
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 20"
            style={inputStyle}
            required
          />

          <label style={labelStyle}>Optional Message (shared with recipient)</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write something encouraging..."
            rows={4}
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>Donate Now</button>
        </form>
      )}
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginTop: "20px",
  fontWeight: "bold"
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  fontSize: "1em",
  border: "1px solid #ccc",
  borderRadius: "6px",
  marginTop: "6px"
};

const buttonStyle = {
  marginTop: "30px",
  padding: "12px 24px",
  backgroundColor: "#0070f3",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};
