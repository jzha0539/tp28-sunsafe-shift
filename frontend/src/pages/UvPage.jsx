import { useEffect, useMemo, useState } from "react";
import { Search, MapPin, SunMedium } from "lucide-react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import SectionCard from "../components/SectionCard";
import { API_BASE_URL, cityOptions } from "../utils/constants";
import { uvLabelClass } from "../utils/helpers";

function getRingPercent(uv) {
  return Math.min((Number(uv) / 12) * 100, 100);
}

function formatHourLabel(timeString) {
  const date = new Date(timeString);
  const hour = date.getHours();
  return `${hour}:00`;
}

function filterDayTrend(trend = []) {
  const today = new Date().toDateString();

  return trend
    .filter((item) => {
      const d = new Date(item.time);
      const hour = d.getHours();
      return d.toDateString() === today && hour >= 6 && hour <= 19;
    })
    .map((item) => ({
      ...item,
      uv: Math.max(0, Number(item.uv || 0)),
    }));
}

export default function UvPage({ page, setPage }) {
  const [city, setCity] = useState("Melbourne");
  const [uvData, setUvData] = useState({
    city: "Melbourne",
    uv: 5.2,
    level: "Moderate",
    damageTime: "about 35-45 minutes",
  });
  const [trendData, setTrendData] = useState([]);
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    async function fetchUvData() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/uv?city=${city}`);
        const data = await res.json();

        if (!data.error) {
          setUvData(data);
          localStorage.setItem("currentUvData", JSON.stringify(data));
        }
      } catch (error) {
        console.error("UV fetch failed", error);
      }
    }

    async function fetchTrendData() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/uv-today?city=${city}`);
        const data = await res.json();

        if (!data.error) {
          setTrendData(filterDayTrend(data.trend));
        }
      } catch (error) {
        console.error("UV trend fetch failed", error);
      }
    }

    fetchUvData();
    fetchTrendData();
  }, [city]);

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const uvRes = await fetch(
            `${API_BASE_URL}/api/uv-by-coords?lat=${lat}&lon=${lon}`
          );
          const uv = await uvRes.json();

          if (!uv.error) {
            setUvData(uv);
            localStorage.setItem("currentUvData", JSON.stringify(uv));
          }

          const trendRes = await fetch(
            `${API_BASE_URL}/api/uv-today-by-coords?lat=${lat}&lon=${lon}`
          );
          const trend = await trendRes.json();

          if (!trend.error) {
            setTrendData(filterDayTrend(trend.trend));
          }
        } catch (error) {
          console.error("Current location UV fetch failed", error);
          alert("Unable to fetch UV for your current location.");
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        console.error("Geolocation error", error);
        alert("Unable to get your current location.");
        setLoadingLocation(false);
      }
    );
  };

  const badgeClass =
    uvLabelClass[uvData.level] ||
    "bg-slate-100 text-slate-700 ring-1 ring-slate-200";

  const ringPercent = useMemo(() => getRingPercent(uvData.uv), [uvData.uv]);

  const maxTrendUv = useMemo(() => {
    if (!trendData.length) return 12;
    return Math.max(...trendData.map((item) => item.uv), 1);
  }, [trendData]);

  return (
    <>
      <Header />

      <main className="mx-auto max-w-7xl px-4 pb-28 pt-10 sm:px-6">
        <SectionCard className="p-4 sm:p-6 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)] xl:grid-cols-[380px_minmax(0,1fr)]">
            <div className="min-w-0">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
                Localised UV Alert
              </p>

              <h2 className="mt-3 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
                Track UV Levels
              </h2>

              <p className="mt-4 text-lg leading-8 text-slate-600">
                Select a Victorian location to view current UV conditions and
                immediate protection guidance.
              </p>

              <div className="mt-8 rounded-[1.75rem] bg-slate-50 p-4 ring-1 ring-slate-200">
                <label className="mb-3 block text-sm font-medium text-slate-500">
                  Choose location
                </label>

                <div className="flex overflow-hidden rounded-full bg-white ring-1 ring-slate-200">
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="min-w-0 flex-1 bg-transparent px-5 py-4 text-base outline-none"
                  >
                    {cityOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    className="flex w-16 shrink-0 items-center justify-center bg-slate-900 text-white"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  disabled={loadingLocation}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-sky-600 px-5 py-4 text-base font-medium text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <MapPin className="h-5 w-5" />
                  {loadingLocation
                    ? "Detecting current location..."
                    : "Use current location"}
                </button>
              </div>
            </div>

            <div className="min-w-0 rounded-[1.8rem] bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 p-5 text-white shadow-xl sm:p-6 lg:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm uppercase tracking-[0.18em] text-white/65">
                    Current result
                  </p>
                  <h3 className="mt-2 truncate text-3xl font-semibold">
                    {uvData.city}
                  </h3>
                </div>

                <span
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${badgeClass}`}
                >
                  {uvData.level}
                </span>
              </div>

              <div className="mt-8 flex justify-center">
                <div
                  className="relative flex h-44 w-44 items-center justify-center rounded-full sm:h-48 sm:w-48"
                  style={{
                    background: `conic-gradient(
                      from 220deg,
                      #7c3aed 0%,
                      #8b5cf6 18%,
                      #ec4899 36%,
                      #f97316 56%,
                      #facc15 ${ringPercent}%,
                      rgba(255,255,255,0.14) ${ringPercent}%,
                      rgba(255,255,255,0.14) 100%
                    )`,
                  }}
                >
                  <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-slate-900/90 shadow-inner sm:h-36 sm:w-36">
                    <p className="text-sm uppercase tracking-[0.18em] text-white/65">
                      UV
                    </p>
                    <div className="mt-2 text-5xl font-bold leading-none sm:text-6xl">
                      {uvData.uv}
                    </div>
                    <div className="mt-3 text-xl font-semibold sm:text-2xl">
                      {uvData.level}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-3xl bg-white/10 p-4 text-sm leading-7 text-white/90 ring-1 ring-white/10 sm:p-5">
                <span className="mr-2 inline-flex align-middle text-amber-300">
                  <SunMedium className="h-5 w-5" />
                </span>
                Current UV Index is <strong>{uvData.uv}</strong>. Your skin may
                begin to experience damage in <strong>{uvData.damageTime}</strong>.
                Find shade, sunscreen, and protective clothing now.
              </div>

              <div className="mt-6 overflow-x-auto rounded-3xl bg-white/8 p-4 ring-1 ring-white/10 sm:p-5">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/75">
                    Today UV trend
                  </p>
                  <p className="whitespace-nowrap text-xs text-white/50">
                    6:00 – 19:00
                  </p>
                </div>

                <div className="flex h-28 min-w-[720px] items-end gap-2 sm:min-w-[820px] lg:min-w-0">
                  {trendData.map((item, index) => (
                    <div
                      key={`${item.time}-${index}`}
                      className="flex min-w-[22px] flex-1 flex-col items-center justify-end gap-2"
                    >
                      <div
                        className="w-full rounded-t-full bg-gradient-to-t from-orange-500 via-amber-400 to-cyan-300"
                        style={{
                          height: `${Math.max((item.uv / maxTrendUv) * 90, 4)}px`,
                        }}
                      />
                      <span className="text-[10px] text-white/55">
                        {new Date(item.time).getHours()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionCard>
      </main>

      <BottomNav page={page} setPage={setPage} />
    </>
  );
}