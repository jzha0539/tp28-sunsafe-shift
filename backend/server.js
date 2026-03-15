import db from "./db.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const toneMap = {
  fair: "TYPE_I",
  medium: "TYPE_III",
  deep: "TYPE_IV",
};

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

db.query("SELECT 1")
  .then(() => console.log("MySQL connected successfully"))
  .catch((error) => console.error("MySQL connection failed:", error.message));

function getUvLevel(uv) {
  if (uv <= 2) return "Low";
  if (uv <= 5) return "Moderate";
  if (uv <= 7) return "High";
  if (uv <= 10) return "Very High";
  return "Extreme";
}

function getDamageTime(level) {
  if (level === "Low") return "about 60+ minutes";
  if (level === "Moderate") return "about 35-45 minutes";
  if (level === "High") return "about 20-30 minutes";
  if (level === "Very High") return "about 12-20 minutes";
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

app.get("/api/uv-by-coords", async (req, res) => {
  try {
    const lat = Number(req.query.lat);
    const lon = Number(req.query.lon);

    if (Number.isNaN(lat) || Number.isNaN(lon)) {
      return res.status(400).json({ error: "Invalid latitude or longitude" });
    }

    const uv = await getCurrentUv(lat, lon);
    const roundedUv = Math.round(Number(uv) * 10) / 10;
    const level = getUvLevel(roundedUv);

    res.json({
      city: "Current Location",
      uv: roundedUv,
      level,
      damageTime: getDamageTime(level),
      latitude: lat,
      longitude: lon,
    });
  } catch (error) {
    console.error("Failed to fetch UV by coordinates:", error.message);
    res.status(500).json({
      error: "Failed to fetch UV by coordinates",
      details: error.message,
    });
  }
});

app.get("/api/myths", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        myth_id AS id,
        myth_text AS myth,
        fact_text AS fact,
        category
      FROM myths
      ORDER BY myth_id
    `);

    res.json(rows);
  } catch (error) {
    console.error("Failed to load myths:", error.message);
    res.status(500).json({ error: "Failed to load myths" });
  }
});

app.get("/api/skin-profile", async (req, res) => {
  const tone = req.query.tone || "medium";
  const toneCode = toneMap[tone] || "TYPE_III";

  try {
    const [rows] = await db.query(
      `
      SELECT
        profile_id,
        tone_code,
        title,
        description AS text
      FROM skin_profiles
      WHERE tone_code = ?
      `,
      [toneCode]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Skin profile not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Failed to load skin profile:", error.message);
    res.status(500).json({ error: "Failed to load skin profile" });
  }
});

app.get("/api/visualisation-data", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        v.viz_id,
        v.chart_type,
        v.label_name,
        v.value_num,
        v.year_value,
        v.source_name,
        r.region_name,
        r.state_name
      FROM visualisation_data v
      LEFT JOIN regions r ON v.region_id = r.region_id
      ORDER BY v.viz_id
    `);

    res.json(rows);
  } catch (error) {
    console.error("Failed to load visualisation data:", error.message);
    res.status(500).json({ error: "Failed to load visualisation data" });
  }
});

app.get("/api/skin-uv-advice", async (req, res) => {
  const tone = req.query.tone || "medium";
  const uv = Number(req.query.uv || 5);
  const toneCode = toneMap[tone] || "TYPE_III";

  try {
    const [rows] = await db.query(
      `
      SELECT
        sp.profile_id,
        sp.tone_code,
        sp.title,
        sp.description AS text,
        sur.damage_time_minutes,
        sur.recommendation
      FROM skin_profiles sp
      JOIN skin_uv_rules sur ON sp.profile_id = sur.profile_id
      WHERE sp.tone_code = ?
        AND ? >= sur.uv_level_min
        AND ? <= sur.uv_level_max
      LIMIT 1
      `,
      [toneCode, uv, uv]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "No matching UV advice found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Failed to load skin UV advice:", error.message);
    res.status(500).json({ error: "Failed to load skin UV advice" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});