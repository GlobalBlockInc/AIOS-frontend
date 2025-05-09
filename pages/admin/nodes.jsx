import { useState, useEffect } from "react";

export default function NodeDashboard() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    fetch("/api/admin/nodes").then(res => res.json()).then(setNodes);
  }, []);

  return (
    <div>
      <h2>Node Provider Dashboard</h2>
      <table>
        <thead><tr><th>Node</th><th>Uptime</th><th>Total Paid</th></tr></thead>
        <tbody>
          {nodes.map(node => (
            <tr key={node.id}>
              <td>{node.id}</td>
              <td>{node.uptime}</td>
              <td>${node.totalPaid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
