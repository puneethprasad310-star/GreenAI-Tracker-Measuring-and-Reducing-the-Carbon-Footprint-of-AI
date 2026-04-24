import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

import {
  calculateMetrics,
  getGreenScore,
  getSuggestions,
  compareModels,
  getBestTime,
  generateReport
} from "./utils";

function App() {
  const [model, setModel] = useState("");
  const [time, setTime] = useState("");
  const [power, setPower] = useState("");
  const [data, setData] = useState([]);

  // ✅ ONLY ONE handleSubmit
  const handleSubmit = async () => {
    const { energy, carbon } = calculateMetrics(time, power);
    const score = getGreenScore(carbon);
    const suggestion = getSuggestions(carbon);

    await addDoc(collection(db, "models"), {
      model_name: model,
      training_time: Number(time),
      gpu_power: Number(power),
      energy,
      carbon,
      green_score: score,
      suggestion,
      created_at: new Date()
    });

    alert("Saved!");
  };

  // 🔄 Real-time data
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "models"), (snapshot) => {
      setData(snapshot.docs.map(doc => doc.data()));
    });

    return () => unsub();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>GreenAI Tracker 🌱</h2>

      <input placeholder="Model Name" onChange={e => setModel(e.target.value)} />
      <br /><br />

      <input placeholder="Training Time" onChange={e => setTime(e.target.value)} />
      <br /><br />

      <input placeholder="GPU Power" onChange={e => setPower(e.target.value)} />
      <br /><br />

      <button onClick={handleSubmit}>Submit</button>

      <hr />

      <h3>Dashboard</h3>

      {data.map((item, i) => (
        <div key={i}>
          <p><b>{item.model_name}</b></p>
          <p>Energy: {item.energy}</p>
          <p>CO₂: {item.carbon}</p>
          <p>Score: {item.green_score}</p>
          <p>Suggestion: {item.suggestion}</p>
          <p>Best Time: {getBestTime()}</p>

          <button onClick={() => alert(generateReport(item))}>
            Generate Report
          </button>

          <hr />
        </div>
      ))}

      {/* ⚖️ Comparison */}
      {data.length >= 2 && (
        <h4>{compareModels(data[0], data[1])}</h4>
      )}
    </div>
  );
}

export default App;