import { useEffect, useMemo, useState } from "react";
import { Sun, Shield, Shirt, Bell, MapPin, AlertTriangle, BarChart3 } from "lucide-react";

const cityOptions = ["Melbourne", "Geelong", "Bendigo", "Ballarat", "Gippsland"];

const uvLevels = [
  { label: "Low", range: "0-2", advice: "Basic protection is usually enough. Sunglasses are still recommended outdoors.", minutes: "about 60+ minutes" },
  { label: "Moderate", range: "3-5", advice: "Use sunscreen and a hat, and be more careful around midday.", minutes: "about 35-45 minutes" },
  { label: "High", range: "6-7", advice: "Limit direct sun exposure, reapply sunscreen, and seek shade when possible.", minutes: "about 20-30 minutes" },
  { label: "Very High", range: "8-10", advice: "Full sun protection is strongly recommended because skin damage can happen quickly.", minutes: "about 12-20 minutes" },
  { label: "Extreme", range: "11+", advice: "Avoid prolonged outdoor exposure and use maximum protection immediately.", minutes: "within about 10 minutes" },
];



function getUvMeta(uv) {
  if (uv <= 2) return { label: "Low", tone: "text-emerald-600", bg: "bg-emerald-50", ring: "ring-emerald-100" };
  if (uv <= 5) return { label: "Moderate", tone: "text-yellow-600", bg: "bg-yellow-50", ring: "ring-yellow-100" };
  if (uv <= 7) return { label: "High", tone: "text-orange-600", bg: "bg-orange-50", ring: "ring-orange-100" };
  if (uv <= 10) return { label: "Very High", tone: "text-red-600", bg: "bg-red-50", ring: "ring-red-100" };
  return { label: "Extreme", tone: "text-fuchsia-600", bg: "bg-fuchsia-50", ring: "ring-fuchsia-100" };
}

function getDosage(uv) {
  if (uv <= 2) return "1-1.5 finger lengths for light exposure";
  if (uv <= 5) return "About 2 finger lengths or 2-3 pumps";
  if (uv <= 7) return "About 2 finger lengths with reapplication every 2 hours";
  if (uv <= 10) return "About 2.5 finger lengths and reapply after sweating";
  return "Apply generously, avoid midday sun, and reapply frequently";
}

function getClothing(uv) {
  if (uv <= 2) return "Sunglasses and a light outer layer are generally enough.";
  if (uv <= 5) return "A wide-brim hat, sunglasses, and a light long-sleeve top are safer choices.";
  if (uv <= 7) return "Choose long sleeves, a hat, and shaded walking routes to reduce exposed skin.";
  if (uv <= 10) return "Prioritise UPF clothing, a wide-brim hat, and sunglasses, and avoid prolonged exposure in singlets or shorts.";
  return "Avoid extended time outside where possible and combine sun-protective clothing with strong shade strategies.";
}

export default function SunscreenWebsite() {
  const [city, setCity] = useState("Melbourne");
const [skinTone, setSkinTone] = useState("medium");
const [reminder, setReminder] = useState(120);

const [uvData, setUvData] = useState({
  city: "Melbourne",
  uv: 9,
  level: "Very High",
  damageTime: "about 12-20 minutes",
});

const [myths, setMyths] = useState([]);
const [profile, setProfile] = useState({
  title: "Medium skin tone",
  text: "Medium skin may not burn as fast, but long-term UV exposure can still cause pigmentation and skin damage.",
});

const uv = uvData.uv;
const uvMeta = useMemo(() => getUvMeta(uv), [uv]);

useEffect(() => {
  async function fetchUvData() {
    try {
      const response = await fetch(`http://127.0.0.1:5050/api/uv?city=${city}`);
      const data = await response.json();
      setUvData(data);
    } catch (error) {
      console.error("Failed to fetch UV data:", error);
    }
  }

  fetchUvData();
}, [city]);

useEffect(() => {
  async function fetchMyths() {
    try {
      const response = await fetch("http://127.0.0.1:5050/api/myths");
      const data = await response.json();
      setMyths(data);
    } catch (error) {
      console.error("Failed to fetch myths:", error);
    }
  }

  fetchMyths();
}, []);

useEffect(() => {
  async function fetchSkinProfile() {
    try {
      const response = await fetch(`http://127.0.0.1:5050/api/skin-profile?tone=${skinTone}`);
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error("Failed to fetch skin profile:", error);
    }
  }

  fetchSkinProfile();
}, [skinTone]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-yellow-50 text-slate-800">
      <section className="relative overflow-hidden border-b border-orange-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.25),transparent_28%),radial-gradient(circle_at_left,rgba(253,186,116,0.2),transparent_25%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white/70 px-5 py-4 shadow-sm ring-1 ring-orange-100 backdrop-blur">
            <div>
              <div className="text-lg font-bold text-slate-900">TP28 SunSafe Shift</div>
              <div className="text-sm text-slate-500">The Generational Shift in Sun-Safety Attitudes</div>
            </div>
            <nav className="flex flex-wrap gap-2 text-sm text-slate-600">
              <a href="#uv-tracker" className="rounded-full px-3 py-1 hover:bg-orange-50">UV Tracker</a>
              <a href="#awareness" className="rounded-full px-3 py-1 hover:bg-orange-50">Awareness</a>
              <a href="#prevention" className="rounded-full px-3 py-1 hover:bg-orange-50">Prevention</a>
              <a href="#tp28-scope" className="rounded-full px-3 py-1 hover:bg-orange-50">TP28 Scope</a>
            </nav>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-1 text-sm shadow-sm backdrop-blur">
                <Sun className="h-4 w-4 text-orange-500" />
                TP28 design direction | A UV awareness platform for young people in Victoria aged 16-25
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                TP28 SunSafe Shift
                <span className="block text-orange-500">Turning UV risk into simple daily actions</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                This version is designed around the TP28 onboarding concept: the target audience is young people in Victoria, and the core issue is that tanning culture and social media trends can reduce sun-safety awareness. The homepage therefore focuses on risk alerts, awareness building, and practical prevention guidance instead of a commercial product-store experience.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#uv-tracker" className="rounded-2xl bg-orange-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:-translate-y-0.5">
                  Explore key features
                </a>
                <a href="#awareness" className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
                  View education section
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Must Have", "Localised UV index with human-language alerts"],
                ["Must Have", "Visual explanations of UV risk and skin myths"],
                ["Should Have", "Skin tone and UV understanding tool"],
                ["Must Have", "Protective clothing suggestions"],
              ].map(([tag, text]) => (
                <div key={text} className="rounded-[28px] bg-white p-6 shadow-xl ring-1 ring-orange-100">
                  <div className="text-sm font-medium text-orange-500">{tag}</div>
                  <p className="mt-3 text-base font-semibold text-slate-900">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="uv-tracker" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-orange-500">Epic 1.0</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Track UV Levels</h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-slate-600">
            This section turns a UV number into a clear personal risk message so users can quickly understand why protection matters right now.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] bg-white p-8 shadow-lg ring-1 ring-slate-100">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="h-4 w-4" /> Simulated Victoria location
                </div>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">Choose a Victorian region</h3>
              </div>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
              >
                {cityOptions.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className={`mt-6 rounded-[28px] p-6 ring-1 ${uvMeta.bg} ${uvMeta.ring}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">Current UV Index</p>
                  <div className={`mt-2 text-5xl font-bold ${uvMeta.tone}`}>{uv}</div>
                </div>
                <div className={`rounded-full px-4 py-2 text-sm font-semibold ${uvMeta.bg} ${uvMeta.tone}`}>
                  {uvMeta.label}
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-700">
               <span className="inline-flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <span>
                    Human alert: UV in <strong>{uvData.city}</strong> is currently{" "}
                  <strong>{uvData.level}</strong>. Skin may begin to experience damage in{" "}
                  <strong>{uvData.damageTime}</strong>, so sunscreen, shade, and protective
                    clothing are recommended now.
                  </span>
                </span>
              </p>
            </div>
          </div>

          <div className="rounded-[28px] bg-slate-900 p-8 text-white shadow-xl">
            <div className="flex items-center gap-2 text-sm text-orange-300">
              <Shield className="h-4 w-4" /> Protection guidance by UV level
            </div>
            <div className="mt-6 space-y-4">
              {uvLevels.map((item) => (
                <div key={item.label} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold">{item.label}</span>
                    <span className="text-sm text-slate-300">UV {item.range}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.advice}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="awareness" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-orange-500">Epic 2.0</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Raising Awareness</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              This section uses simple educational visuals and myth-busting content to explain UV harm in a more engaging way for younger audiences.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[28px] bg-white p-8 shadow-lg ring-1 ring-slate-100">
              <div className="mb-6 flex items-center gap-2 text-sm font-medium text-orange-500">
                <BarChart3 className="h-4 w-4" /> Visualisation 1: UV risk trend example
              </div>
              <div className="space-y-4">
                {[25, 40, 58, 76, 92].map((value, index) => (
                  <div key={value}>
                    <div className="mb-2 flex justify-between text-sm text-slate-600">
                      <span>{["Low UV", "Moderate", "High", "Very High", "Extreme"][index]}</span>
                      <span>{value}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-slate-100">
                      <div className="h-3 rounded-full bg-orange-400" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-600">
                This placeholder can later be replaced with real data visualisations, such as Australian skin cancer trends, UV intensity patterns, or changing attitudes toward tanning among young people.
              </p>
            </div>

            <div className="rounded-[28px] bg-orange-50 p-8 shadow-lg ring-1 ring-orange-100">
              <div className="mb-6 text-sm font-medium text-orange-600">Visualisation 2: Breaking sun-safety myths</div>
              <div className="space-y-4">
                {myths.map((item) => (
                  <div key={item.myth} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-orange-100">
                    <div className="text-sm font-semibold text-slate-900">Myth: {item.myth}</div>
                    <div className="mt-2 text-sm leading-6 text-slate-600">Fact: {item.fact}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[28px] bg-slate-900 p-8 text-white shadow-xl">
            <div className="text-sm font-medium uppercase tracking-[0.2em] text-orange-300">US2.2</div>
            <h3 className="mt-2 text-2xl font-bold">Skin tone and UV understanding tool</h3>
            <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <label className="text-sm text-slate-300">Choose a skin tone</label>
                <select
                  value={skinTone}
                  onChange={(e) => setSkinTone(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none"
                >
                  <option value="fair" className="text-slate-900">Fair skin tone</option>
                  <option value="medium" className="text-slate-900">Medium skin tone</option>
                  <option value="deep" className="text-slate-900">Deep skin tone</option>
                </select>
              </div>
              <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                <div className="text-lg font-semibold">{profile.title}</div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{profile.text}</p>
                <p className="mt-3 text-sm leading-6 text-orange-200">
                  With a current UV level of {uv} in {city}, sun protection is still important regardless of skin tone. The site encourages users not to assume they are safe just because they burn less easily.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="prevention" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-orange-500">Epic 3.0</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Prevention Tools</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[28px] bg-white p-8 shadow-lg ring-1 ring-slate-100">
            <div className="flex items-center gap-2 text-sm font-medium text-orange-500">
              <Shield className="h-4 w-4" /> US3.1 Sunscreen amount guidance
            </div>
            <div className="mt-5 text-3xl font-bold text-slate-900">{getDosage(uv)}</div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              This feature gives users a more concrete idea of how much sunscreen to apply under different UV conditions.
            </p>
          </div>

          <div className="rounded-[28px] bg-white p-8 shadow-lg ring-1 ring-slate-100">
            <div className="flex items-center gap-2 text-sm font-medium text-orange-500">
              <Bell className="h-4 w-4" /> US3.2 Reapplication reminder
            </div>
            <label className="mt-5 block text-sm text-slate-500">Reminder interval (minutes)</label>
            <input
              type="range"
              min="60"
              max="180"
              step="15"
              value={reminder}
              onChange={(e) => setReminder(Number(e.target.value))}
              className="mt-3 w-full"
            />
            <div className="mt-3 text-3xl font-bold text-slate-900">Every {reminder} minutes</div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              This is currently a front-end prototype and can later be extended with browser notifications, calendar reminders, or mobile alerts.
            </p>
          </div>

          <div className="rounded-[28px] bg-white p-8 shadow-lg ring-1 ring-slate-100">
            <div className="flex items-center gap-2 text-sm font-medium text-orange-500">
              <Shirt className="h-4 w-4" /> US3.3 Protective clothing suggestions
            </div>
            <div className="mt-5 text-xl font-bold text-slate-900">Today’s recommendation for {city}</div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{getClothing(uv)}</p>
            <div className="mt-5 rounded-2xl bg-orange-50 p-4 text-sm text-slate-700 ring-1 ring-orange-100">
              Suggested items: wide-brim hat / sunglasses / long sleeves / UPF clothing / shaded route
            </div>
          </div>
        </div>
      </section>

      <section id="tp28-scope" className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold">This build is now organised around the TP28 concept</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              "Directly mapped to the TP28 epics: Track UV, Raising Awareness, and Prevention",
              "Prioritises must-have features such as local UV alerts, educational visualisations, and clothing advice",
              "Keeps should-have features such as skin tone guidance, sunscreen amount, and reapplication reminders",
              "Uses a youth-focused educational style for Victoria rather than a standard e-commerce sunscreen website",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                <p className="text-sm leading-6 text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className="text-lg font-bold text-slate-900">TP28 SunSafe Shift</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                A youth-focused onboarding prototype designed to raise awareness of harmful UV exposure in Victoria.
              </p>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">Mapped user stories</div>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <div>US1.1 Localised UV alert</div>
                <div>US2.1 UV impacts and skin myths</div>
                <div>US2.2 Skin tone and UV understanding</div>
                <div>US3.1 / US3.2 / US3.3 Prevention tools</div>
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">Build note</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                This prototype is designed to match the TP28 onboarding report so it can be extended into the final submitted build and acceptance-tested against LeanKit.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
