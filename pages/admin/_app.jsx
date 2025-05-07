import { useState } from "react";

function AdminApp({ Component, pageProps }) {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const checkPassword = () => {
    if (password === "Railroad5-Justifier6-Tubeless2-Audacious7-Slashing9") {
      setAuthenticated(true);
    } else {
      alert("Wrong password");
    }
  };

  if (!authenticated) {
    return (
      <div style={{ padding: 50 }}>
        <h1>Admin Access</h1>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={checkPassword}>Enter</button>
      </div>
    );
  }

  return <Component {...pageProps} />;
}

export default AdminApp;
