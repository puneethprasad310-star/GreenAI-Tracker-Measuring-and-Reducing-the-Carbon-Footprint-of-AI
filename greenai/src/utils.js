// 🔹 Carbon Calculation
export const calculateMetrics = (time, power) => {
  const energy = time * power;
  const carbon = energy * 0.475;
  return { energy, carbon };
};

// 🔹 Green Score
export const getGreenScore = (carbon) => {
  if (carbon < 20) return "A";
  if (carbon < 50) return "B";
  if (carbon < 100) return "C";
  return "D";
};

// 🔹 Optimization Suggestions
export const getSuggestions = (carbon) => {
  if (carbon > 100) return "Use smaller model or reduce epochs";
  if (carbon > 50) return "Apply pruning or quantization";
  return "Model is efficient";
};

// 🔹 Model Comparison
export const compareModels = (modelA, modelB) => {
  if (!modelA || !modelB) return "";

  return modelA.carbon > modelB.carbon
    ? `${modelB.model_name} is more efficient`
    : `${modelA.model_name} is more efficient`;
};

// 🔹 Smart Scheduling
export const getBestTime = () => {
  const hour = new Date().getHours();
  return hour <= 6
    ? "Best time to run (low carbon)"
    : "Run at night for better efficiency";
};

// 🔹 Inference Impact
export const calculateInference = (requests, energyPerReq) => {
  const totalEnergy = requests * energyPerReq;
  const carbon = totalEnergy * 0.475;
  return { totalEnergy, carbon };
};

// 🔹 Report Generator
export const generateReport = (model) => {
  return `
Model: ${model.model_name}
Energy: ${model.energy}
Carbon: ${model.carbon}
Score: ${model.green_score}
`;
};