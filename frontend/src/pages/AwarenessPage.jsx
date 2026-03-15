import { useEffect, useMemo, useState } from "react";
import { BarChart3, Sun, AlertTriangle } from "lucide-react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import SectionCard from "../components/SectionCard";
import { API_BASE_URL } from "../utils/constants";

export default function AwarenessPage({ page, setPage }) {
  const [myths, setMyths] = useState([]);
  const [visualData, setVisualData] = useState([]);

  useEffect(() => {
    async function fetchMyths() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/myths`);
        const data = await res.json();

        if (!data.error) {
          setMyths(data);
        }
      } catch (error) {
        console.error("Myths fetch failed", error);
      }
    }

    fetchMyths();
  }, []);

  useEffect(() => {
    async function fetchVisualData() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/visualisation-data`);
        const data = await res.json();

        if (!data.error) {
          setVisualData(data);
        }
      } catch (error) {
        console.error("Visualisation data fetch failed", error);
      }
    }

    fetchVisualData();
  }, []);

  const barData = useMemo(() => {
    return visualData.filter((item) => item.chart_type === "bar");
  }, [visualData]);

  const trendData = useMemo(() => {
    const lineData = visualData.filter((item) => item.chart_type === "line");

    if (lineData.length > 0) {
      return lineData.map((item) => ({
        label: item.label_name,
        value: Number(item.value_num),
      }));
    }

    // fallback: if DB has no line data, reuse all records to still render something
    return visualData.slice(0, 6).map((item) => ({
      label: item.label_name,
      value: Number(item.value_num),
    }));
  }, [visualData]);

  const maxTrendValue = useMemo(() => {
    if (trendData.length === 0) return 100;
    return Math.max(...trendData.map((item) => item.value), 1);
  }, [trendData]);

  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-6 pb-28 pt-10">
        <SectionCard className="p-6 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-600">
            UV Impacts and Skin Myths
          </p>

          <h2 className="mt-3 text-4xl font-semibold text-slate-900 sm:text-5xl">
            Awareness and Insights
          </h2>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Explore simple visual summaries about UV behaviour, common
            misconceptions, and seasonal trend patterns.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-rose-100 p-3 text-rose-600">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900">
                    Behaviour snapshot
                  </h3>
                  <p className="text-sm text-slate-500">
                    Loaded from database
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {barData.length > 0 ? (
                  barData.map((item) => (
                    <div key={item.viz_id}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-slate-600">{item.label_name}</span>
                        <span className="font-semibold text-slate-800">
                          {Number(item.value_num)}
                        </span>
                      </div>

                      <div className="h-3 rounded-full bg-slate-100">
                        <div
                          className="h-3 rounded-full bg-gradient-to-r from-amber-400 to-rose-500"
                          style={{
                            width: `${Math.min(Number(item.value_num), 100)}%`,
                          }}
                        />
                      </div>

                      <div className="mt-2 text-xs text-slate-500">
                        {item.region_name || "Unknown region"} ·{" "}
                        {item.year_value || "N/A"} · {item.source_name || "Unknown source"}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">
                    No behaviour snapshot data available.
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-sky-100 p-3 text-sky-600">
                  <Sun className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900">
                    Seasonal UV trend
                  </h3>
                  <p className="text-sm text-slate-500">
                    Loaded from database
                  </p>
                </div>
              </div>

              <div className="mt-8 flex h-56 items-end gap-4 rounded-3xl bg-slate-50 p-5">
                {trendData.length > 0 ? (
                  trendData.map((item, index) => (
                    <div
                      key={`${item.label}-${index}`}
                      className="flex flex-1 flex-col items-center justify-end gap-3"
                    >
                      <div
                        className="w-full rounded-t-2xl bg-gradient-to-t from-sky-500 to-cyan-300"
                        style={{
                          height: `${Math.max((item.value / maxTrendValue) * 180, 12)}px`,
                        }}
                      />
                      <div className="text-center text-xs font-medium text-slate-500">
                        {item.label}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
                    No trend data available.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[1.8rem] bg-slate-50 p-6 ring-1 ring-slate-200">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-amber-100 p-3 text-amber-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">
                  Skin myths and facts
                </h3>
                <p className="text-sm text-slate-500">Loaded from backend data</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {myths.length > 0 ? (
                myths.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[1.4rem] bg-white p-5 shadow-sm ring-1 ring-slate-200"
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-500">
                      Myth
                    </p>
                    <p className="mt-2 text-base font-medium leading-7 text-slate-900">
                      {item.myth}
                    </p>

                    <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
                      Fact
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {item.fact}
                    </p>

                    {item.category && (
                      <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                        {item.category}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">
                  No myths available.
                </p>
              )}
            </div>
          </div>
        </SectionCard>
      </main>

      <BottomNav page={page} setPage={setPage} />
    </>
  );
}