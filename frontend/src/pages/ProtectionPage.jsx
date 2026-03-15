import { useEffect, useState } from "react";
import { Sun, Bell, Shirt } from "lucide-react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import SectionCard from "../components/SectionCard";
import { API_BASE_URL, cityOptions } from "../utils/constants";
import { getDosage, getClothing } from "../utils/helpers";

export default function ProtectionPage({ page, setPage }) {
  const [reminder, setReminder] = useState(120);
  const [city, setCity] = useState("Melbourne");
  const [uvData, setUvData] = useState({
    city: "Melbourne",
    uv: 5.2,
    level: "Moderate",
    damageTime: "about 35-45 minutes",
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

  const clothing = getClothing(uvData.level);
  const dosage = getDosage(uvData.level);

  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-6 pb-28 pt-10">
        <SectionCard className="p-6 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            Practical Protection Guidance
          </p>

          <h2 className="mt-3 text-4xl font-semibold text-slate-900 sm:text-5xl">
            Protection and Prevention
          </h2>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Use current UV conditions to guide sunscreen amount, reapplication
            timing, and protective clothing choices.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-amber-100 p-3 text-amber-600">
                  <Sun className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    Sunscreen Dosage
                  </h3>
                  <p className="text-sm text-slate-500">
                    Based on current UV level
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <label className="mb-2 block text-sm text-slate-500">
                  Location for guidance
                </label>

                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none"
                >
                  {cityOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5 rounded-3xl bg-amber-50 p-5 ring-1 ring-amber-100">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-700">
                  Current UV: {uvData.level}
                </p>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  {dosage}
                </p>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-rose-100 p-3 text-rose-600">
                  <Bell className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    Reapplication Reminder
                  </h3>
                  <p className="text-sm text-slate-500">
                    Set a sunscreen reminder interval
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
                <p className="text-sm text-slate-500">Reminder interval</p>
                <div className="mt-3 text-4xl font-semibold text-slate-900">
                  {reminder} min
                </div>

                <input
                  type="range"
                  min="60"
                  max="180"
                  step="15"
                  value={reminder}
                  onChange={(e) => setReminder(Number(e.target.value))}
                  className="mt-5 w-full"
                />

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Recommended baseline: every 2 hours, and sooner after
                  swimming, sweating, or towel drying.
                </p>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-sky-100 p-3 text-sky-600">
                  <Shirt className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    Clothing Advice
                  </h3>
                  <p className="text-sm text-slate-500">
                    Recommended by UV risk level
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {clothing.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-sky-50 px-4 py-3 text-sm font-medium text-slate-700 ring-1 ring-sky-100"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-600">
                Current guidance is based on <strong>{uvData.city}</strong> with
                a UV level of <strong>{uvData.level}</strong>.
              </p>
            </div>
          </div>
        </SectionCard>
      </main>

      <BottomNav page={page} setPage={setPage} />
    </>
  );
}