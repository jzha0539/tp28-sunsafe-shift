import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import SectionCard from "../components/SectionCard";
import { API_BASE_URL } from "../utils/constants";
import { skinCards, toneMap } from "../data/skinCards";

export default function SkinPage({ page, setPage }) {
  const [selectedCard, setSelectedCard] = useState("medium");
  const backendTone = toneMap[selectedCard] || "medium";

  const [profile, setProfile] = useState({
    title: "Medium skin tone",
    text: "Medium skin may not burn as fast, but long-term UV exposure can still cause pigmentation and skin damage.",
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/skin-profile?tone=${backendTone}`
        );
        const data = await res.json();

        if (!data.error) {
          setProfile(data);
        }
      } catch (error) {
        console.error("Skin profile fetch failed", error);
      }
    }

    fetchProfile();
  }, [backendTone]);

  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-6 pb-28 pt-10">
        <SectionCard className="p-6 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
            US2.2 Skin Tone and UV Absorption
          </p>

          <h2 className="mt-3 text-4xl font-semibold text-slate-900 sm:text-5xl">
            Find Your Skin Profile
          </h2>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Choose the skin tone that best matches you to view personalized
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

          <div className="mt-8 rounded-[1.8rem] bg-slate-50 p-6 ring-1 ring-slate-200">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-blue-100 p-3 text-blue-700">
                <Info className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900">
                  {profile.title}
                </h3>

                <p className="mt-3 text-lg leading-8 text-slate-700">
                  {profile.text}
                </p>

                <p className="mt-4 text-sm leading-7 text-slate-500">
                  This tool provides general sun safety guidance. Protection
                  needs can also vary based on time outdoors, clothing,
                  sunscreen use, and current UV level.
                </p>
              </div>
            </div>
          </div>
        </SectionCard>
      </main>

      <BottomNav page={page} setPage={setPage} />
    </>
  );
}