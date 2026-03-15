import { useEffect, useState } from "react";
import { Info, ShieldAlert, SunMedium, MapPin } from "lucide-react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import SectionCard from "../components/SectionCard";
import { API_BASE_URL } from "../utils/constants";
import { skinCards, toneMap } from "../data/skinCards";

export default function SkinPage({ page, setPage }) {
  const [selectedCard, setSelectedCard] = useState("medium");
  const backendTone = toneMap[selectedCard] || "medium";

  const [currentUvData, setCurrentUvData] = useState({
    city: "Melbourne",
    uv: 6.5,
    level: "High",
  });

  const [advice, setAdvice] = useState({
    title: "Medium skin tone",
    text: "Medium skin may not burn as fast, but long-term UV exposure can still cause pigmentation and skin damage.",
    damage_time_minutes: 30,
    recommendation: "Use sunscreen and protective clothing.",
  });

  useEffect(() => {
    const savedUv = localStorage.getItem("currentUvData");

    if (savedUv) {
      try {
        const parsed = JSON.parse(savedUv);
        if (parsed?.uv !== undefined) {
          setCurrentUvData(parsed);
        }
      } catch (error) {
        console.error("Failed to parse saved UV data", error);
      }
    }
  }, []);

  useEffect(() => {
    async function fetchAdvice() {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/skin-uv-advice?tone=${backendTone}&uv=${currentUvData.uv}`
        );
        const data = await res.json();

        if (!data.error) {
          setAdvice(data);
        }
      } catch (error) {
        console.error("Skin UV advice fetch failed", error);
      }
    }

    fetchAdvice();
  }, [backendTone, currentUvData.uv]);

  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-6 pb-28 pt-10">
        <SectionCard className="p-6 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
            Skin Tone and UV Absorption
          </p>

          <h2 className="mt-3 text-4xl font-semibold text-slate-900 sm:text-5xl">
            Find Your Skin Profile
          </h2>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Choose the skin tone that best matches you and compare it with the
            latest UV result from your UV Search page to view more personalized
            protection guidance.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {skinCards.map((item) => {
              const active = selectedCard === item.key;

              return (
                <button
                  key={item.key}
                  onClick={() => setSelectedCard(item.key)}
                  className={`rounded-[1.6rem] border p-5 text-left transition ${
                    active
                      ? "border-amber-400 bg-amber-50 ring-2 ring-amber-200"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="h-14 w-14 rounded-full border-4 border-white shadow"
                      style={{ backgroundColor: item.color }}
                    />
                    <div>
                      <div className="text-xl font-semibold text-slate-900">
                        {item.label}
                      </div>
                      <div className="text-sm text-slate-500">{item.type}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-amber-100 p-3 text-amber-700">
                  <SunMedium className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900">
                    Current UV result
                  </h3>
                  <p className="text-sm text-slate-500">
                    Reused from the UV Search page
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-[1.4rem] bg-slate-50 p-5 ring-1 ring-slate-200">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="h-4 w-4" />
                  {currentUvData.city}
                </div>

                <div className="mt-4 text-5xl font-bold text-slate-900">
                  {currentUvData.uv}
                </div>

                <div className="mt-2 inline-flex rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                  {currentUvData.level}
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-500">
                  This UV result is automatically reused from the most recent
                  search in the UV Search page.
                </p>
              </div>
            </div>

            <div className="rounded-[1.8rem] bg-slate-50 p-6 ring-1 ring-slate-200">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-blue-100 p-3 text-blue-700">
                  <Info className="h-6 w-6" />
                </div>

                <div className="w-full">
                  <h3 className="text-2xl font-semibold text-slate-900">
                    {advice.title}
                  </h3>

                  <p className="mt-3 text-lg leading-8 text-slate-700">
                    {advice.text}
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-600">
                        Estimated damage time
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-slate-900">
                        {advice.damage_time_minutes} minutes
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-rose-600">
                        <ShieldAlert className="h-4 w-4" />
                        Recommendation
                      </div>
                      <p className="mt-2 text-sm leading-7 text-slate-700">
                        {advice.recommendation}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-slate-500">
                    This advice combines your selected skin profile with the UV
                    result currently stored from the UV Search page.
                  </p>
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