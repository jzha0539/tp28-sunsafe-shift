import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

const myths = [
  {
    myth: "You do not need sunscreen on cloudy days",
    fact: "UVA can still pass through clouds, so skin damage can still accumulate.",
  },
  {
    myth: "People with darker skin cannot be harmed by UV",
    fact: "Different skin tones experience different levels of risk, but everyone can be affected by UV exposure.",
  },
  {
    myth: "A high SPF number is all that matters",
    fact: "Protection also depends on broad-spectrum coverage, application amount, reapplication, and protective clothing.",
  },
];

const skinProfiles = {
  fair: {
    title: "Fair skin tone",
    text: "Fairer skin can burn more quickly and often needs stronger protection during high UV periods.",
  },
  medium: {
    title: "Medium skin tone",
    text: "Medium skin may not burn as fast, but long-term UV exposure can still cause pigmentation and skin damage.",
  },
  deep: {
    title: "Deep skin tone",
    text: "Deeper skin tones may have a lower risk of immediate sunburn, but UVA-related ageing and long-term damage are still important concerns.",
  },
};

function getUvLevel(uv) {
  if (uv <= 2) return "Low";
  if (uv <= 5) return "Moderate";
  if (uv <= 7) return "High";
  if (uv <= 10) return "Very High";
  return "Extreme";
}

function getDamageTime(level) {
  if (level === "Low") return "about 60+ minutes";
  if (level === "Moderate") return "about 35–45 minutes";
  if (level === "High") return "about 20–30 minutes";
  if (level === "Very High") return "about 12–20 minutes";
  return "within about 10 minutes";
}

async function getCoordinates(city) {
  const response = await axios.get("https://geocoding-api.open-meteo.com/v1/search", {
    params: {
      name: city,
      count: 1,
      language: "en",
      format: "json",
    },
  });

  const result = response.data?.results?.[0];

  if (!result) {
    throw new Error(`Could not find coordinates for city: ${city}`);
  }

  return {
    name: result.name,
    latitude: result.latitude,
    longitude: result.longitude,
    country: result.country,
  };
}

async function getCurrentUv(latitude, longitude) {
  const response = await axios.get("https://air-quality-api.open-meteo.com/v1/air-quality", {
    params: {
      latitude,
      longitude,
      current: "uv_index",
      timezone: "auto",
    },
  });

  const uv = response.data?.current?.uv_index;

  if (uv === undefined || uv === null) {
    throw new Error("UV index not found in API response");
  }

  return uv;
}

app.get("/", (req, res) => {
  res.send("TP28 backend is running");
});

app.get("/api/uv", async (req, res) => {
  try {
    const city = req.query.city || "Melbourne";

    const location = await getCoordinates(city);
    const uv = await getCurrentUv(location.latitude, location.longitude);

    const roundedUv = Math.round(Number(uv) * 10) / 10;
    const level = getUvLevel(roundedUv);

    res.json({
      city: location.name,
      country: location.country,
      uv: roundedUv,
      level,
      damageTime: getDamageTime(level),
      latitude: location.latitude,
      longitude: location.longitude,
    });
  } catch (error) {
    console.error("Failed to fetch real UV data:", error.message);

    res.status(500).json({
      error: "Failed to fetch UV data",
      details: error.message,
    });
  }
});

app.get("/api/myths", (req, res) => {
  res.json(myths);
});

app.get("/api/skin-profile", (req, res) => {
  const tone = req.query.tone || "medium";
  res.json(skinProfiles[tone] || skinProfiles.medium);
});

app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});