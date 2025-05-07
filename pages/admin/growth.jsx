import { useEffect, useState } from "react";

export default function GrowthSuggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("/api/growth")
      .then(res => res.json())
      .then(data => setSuggestions(data.suggestions));
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>AIOS Growth Suggestions</h1>
      <ul>
        {suggestions.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
  );
}
