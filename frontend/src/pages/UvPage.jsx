import { useEffect, useState } from "react";
import { Search, MapPin } from "lucide-react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import SectionCard from "../components/SectionCard";
import { API_BASE_URL, cityOptions } from "../utils/constants";
import { uvLabelClass } from "../utils/helpers";

export default function UvPage({ page, setPage }) {
  const [city, setCity] = useState("Melbourne");
  const [uvData, setUvData] = useState({
    city: "Melbourne",
    uv: 5.2,
    level: "Moderate",
    damageTime: "about 35–45 minutes",
  });
  
  useEffect(() => {
    async function fetchUvData() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/uv?city=${city}`);
        const data = await res.json();
        if (!data.error) {
          setUvData(data);
        }
      } catch (error) {
        console.error("UV fetch failed", error);
      }
    }
  
    fetchUvData();
  }, [city]);


  const badgeClass =
    uvLabelClass[uvData.level] ||
    "bg-slate-100 text-slate-700 ring-1 ring-slate-200";

  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-6 pb-28 pt-10">
        <SectionCard className="p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[.95fr_1.05fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
                US1.1 Localised UV Alert
              </p>
              <h2 className="mt-3 text-4xl font-semibold text-slate-900 sm:text-5xl">
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
                    className="w-full bg-transparent px-5 py-4 text-base outline-none"
                  >
                    {cityOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <button className="flex w-20 items-center justify-center bg-slate-900 text-white">
                    <Search className="h-5 w-5" />
                  </button>
                </div>

                <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-sky-600 px-5 py-4 text-base font-medium text-white transition hover:bg-sky-700">
                  <MapPin className="h-5 w-5" />
                  Use current location
                </button>
              </div>
            </div>

            <div className="rounded-[1.8rem] bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 p-8 text-white shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-white/65">
                    Current result
                  </p>
                  <h3 className="mt-2 text-3xl font-semibold">
                    {uvData.city}
                  </h3>
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${badgeClass}`}
                >
                  {uvData.level}
                </span>
              </div>

              <div className="mt-10 flex items-end gap-4">
                <div className="text-7xl font-bold leading-none">
                  {uvData.uv}
                </div>
                <div className="pb-2 text-white/70">UV Index</div>
              </div>

              <div className="mt-8 rounded-3xl bg-white/10 p-5 text-sm leading-7 text-white/90 ring-1 ring-white/10">
                UV in {uvData.city} is currently <strong>{uvData.level}</strong>.
                Skin may begin to experience damage in{" "}
                <strong>{uvData.damageTime}</strong>. Sunscreen, shade, and
                protective clothing are recommended now.
              </div>
            </div>
          </div>
        </SectionCard>
      </main>

      <BottomNav page={page} setPage={setPage} />
    </>
  );
}