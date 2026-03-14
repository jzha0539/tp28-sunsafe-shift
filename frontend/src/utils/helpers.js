export const uvLabelClass = {
    Low: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
    Moderate: "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200",
    High: "bg-orange-100 text-orange-700 ring-1 ring-orange-200",
    "Very High": "bg-rose-100 text-rose-700 ring-1 ring-rose-200",
    Extreme: "bg-fuchsia-100 text-fuchsia-700 ring-1 ring-fuchsia-200",
  };
  
  export const awarenessCharts = [
    { label: "High UV months", value: 78 },
    { label: "Young adults skipping sunscreen", value: 46 },
    { label: "People relying on cloudy weather myths", value: 38 },
    { label: "Daily shade-seeking behaviour", value: 57 },
  ];
  
  export const heatTrend = [
    { month: "Jan", uv: 10.2 },
    { month: "Feb", uv: 9.1 },
    { month: "Mar", uv: 7.4 },
    { month: "Apr", uv: 5.8 },
    { month: "May", uv: 3.6 },
    { month: "Jun", uv: 2.8 },
  ];
  
  export function getDosage(level) {
    if (level === "Low") {
      return "Apply 2 pumps (or around 1 teaspoon for exposed areas) before going outside.";
    }
    if (level === "Moderate") {
      return "Apply 2–3 pumps and cover all exposed areas carefully.";
    }
    if (level === "High") {
      return "Apply 3 pumps or a generous layer, especially on face, neck, and arms.";
    }
    if (level === "Very High") {
      return "Apply 3–4 pumps or a full, even coat and reapply carefully.";
    }
    return "Apply a full generous layer (3–4 pumps minimum) and combine with shade and protective clothing.";
  }
  
  export function getClothing(level) {
    if (level === "Low") return ["Sunglasses", "Light hat", "Optional light layer"];
    if (level === "Moderate") return ["Sunglasses", "Wide-brim hat", "Light sleeves"];
    if (level === "High") return ["Wide-brim hat", "Long sleeves", "Sunglasses with UV protection"];
    if (level === "Very High") return ["Wide-brim hat", "Long sleeves", "Dense fabric or UPF clothing"];
    return ["UPF clothing", "Wide-brim hat", "Covered shoulders and arms"];
  }