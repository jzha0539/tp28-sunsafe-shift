import { Sparkles, Sun } from "lucide-react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import SectionCard from "../components/SectionCard";

export default function HomePage({ setPage }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-6 pb-28 pt-10 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700 ring-1 ring-amber-200">
              <Sparkles className="h-4 w-4" />
              Sun safety for young Victorians
            </span>
            <h2 className="mt-6 max-w-3xl font-serif text-5xl leading-tight text-slate-900 sm:text-7xl">
              Daily UV awareness with a calmer, cleaner experience.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              SunSense helps users check UV conditions, understand skin protection needs,
              and access trusted sun safety resources in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => setPage("uv")}
                className="rounded-full bg-slate-900 px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-700"
              >
                Check UV now
              </button>
              <button
                onClick={() => setPage("skin")}
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Find skin profile
              </button>
            </div>
          </div>

          <SectionCard className="overflow-hidden p-0">
            <div className="bg-gradient-to-br from-sky-500 via-cyan-400 to-amber-300 p-8 text-white">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/20 p-3">
                  <Sun className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-white/80">
                    Featured overview
                  </p>
                  <h3 className="text-2xl font-semibold">Protect earlier, not later</h3>
                </div>
              </div>
              <p className="mt-6 max-w-md text-base leading-7 text-white/90">
                View live UV conditions, get human-readable risk guidance, and explore
                resources that support prevention-focused behaviour.
              </p>
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-3">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Core feature</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">Real-time UV</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Education</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">
                  Skin type guidance
                </p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Awareness</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">
                  Trusted resources
                </p>
              </div>
            </div>
          </SectionCard>
        </div>
      </main>

      <BottomNav page="home" setPage={setPage} />
    </>
  );
}