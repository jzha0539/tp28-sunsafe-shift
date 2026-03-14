import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import SectionCard from "../components/SectionCard";
import { resources } from "../data/resources";
import { ExternalLink } from "lucide-react";

export default function ResourcesPage({ page, setPage }) {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-6 pb-28 pt-10">
        <SectionCard className="p-6 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Awareness and Support
          </p>

          <h2 className="mt-3 text-4xl font-semibold text-slate-900 sm:text-5xl">
            Sun Protection Resources
          </h2>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Explore trusted organizations and educational resources related to UV
            exposure, protection, and skin health.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {resources.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className={`h-2 w-full bg-gradient-to-r ${item.accent}`} />

                  <div className="p-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                      <Icon className="h-8 w-8" />
                    </div>

                    <h3 className="mt-5 text-xl font-semibold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {item.description}
                    </p>

                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                    >
                      Visit site <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </main>

      <BottomNav page={page} setPage={setPage} />
    </>
  );
}