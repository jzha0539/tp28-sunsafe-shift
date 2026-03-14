import React, { useEffect, useMemo, useState } from "react";
import {
  Home,
  Search,
  User,
  BookOpen,
  Sun,
  MapPin,
  Shield,
  Globe,
  Pill,
  Info,
  ExternalLink,
  Sparkles,
  BarChart3,
  AlertTriangle,
  Bell,
  Shirt,
} from "lucide-react";

const API_BASE_URL = "http://127.0.0.1:5050";

const cityOptions = ["Melbourne", "Geelong", "Bendigo", "Ballarat", "Gippsland"];

const skinCards = [
  { key: "very-fair", label: "Very Fair", type: "Type I", color: "#eadfdb" },
  { key: "fair", label: "Fair", type: "Type II", color: "#ddd3c3" },
  { key: "light", label: "Light", type: "Type III", color: "#e5cf89" },
  { key: "medium", label: "Medium", type: "Type IV", color: "#dfb293" },
  { key: "tan", label: "Tan", type: "Type V", color: "#bd9567" },
  { key: "dark", label: "Dark", type: "Type VI", color: "#4a3d3a" },
];

const toneMap = {
  "very-fair": "fair",
  fair: "fair",
  light: "medium",
  medium: "medium",
  tan: "deep",
  dark: "deep",
};

const uvLabelClass = {
  Low: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
  Moderate: "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200",
  High: "bg-orange-100 text-orange-700 ring-1 ring-orange-200",
  "Very High": "bg-rose-100 text-rose-700 ring-1 ring-rose-200",
  Extreme: "bg-fuchsia-100 text-fuchsia-700 ring-1 ring-fuchsia-200",
};

const awarenessCharts = [
  { label: "High UV months", value: 78 },
  { label: "Young adults skipping sunscreen", value: 46 },
  { label: "People relying on cloudy weather myths", value: 38 },
  { label: "Daily shade-seeking behaviour", value: 57 },
];

const heatTrend = [
  { month: "Jan", uv: 10.2 },
  { month: "Feb", uv: 9.1 },
  { month: "Mar", uv: 7.4 },
  { month: "Apr", uv: 5.8 },
  { month: "May", uv: 3.6 },
  { month: "Jun", uv: 2.8 },
];

const resources = [
  {
    title: "Cancer Council Australia",
    description:
      "Official Australian guidance on UV, skin cancer prevention, and sunscreen recommendations.",
    icon: Shield,
    accent: "from-rose-500 to-orange-400",
    link: "https://www.cancer.org.au/cancer-information/causes-and-prevention/sun-safety",
  },
  {
    title: "Australian Bureau of Meteorology",
    description:
      "Check UV forecasts, weather conditions, and environmental alerts across Australia.",
    icon: Sun,
    accent: "from-sky-500 to-cyan-400",
    link: "https://www.bom.gov.au/uv/",
  },
  {
    title: "World Health Organization",
    description:
      "Global public health information on UV exposure, skin health, and prevention.",
    icon: Globe,
    accent: "from-blue-600 to-indigo-500",
    link: "https://www.who.int/news-room/questions-and-answers/item/radiation-ultraviolet-(uv)",
  },
  {
    title: "SunSmart",
    description:
      "Practical sun safety advice for daily protection and behaviour change among young people.",
    icon: Pill,
    accent: "from-amber-500 to-yellow-400",
    link: "https://www.sunsmart.com.au/",
  },
];

function AppShell({ children }) {
  return <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50 text-slate-800">{children}</div>;
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-4">
        <h1 className="text-3xl font-serif tracking-[0.22em] text-slate-800 sm:text-4xl">
          Sun<span className="text-amber-500">Sense</span>
          <span className="ml-2 text-xl">☀️</span>
        </h1>
      </div>
    </header>
  );
}

function BottomNav({ page, setPage }) {
  const items = [
    { key: "home", label: "Home", icon: Home },
    { key: "uv", label: "UV Search", icon: Search },
    { key: "skin", label: "Skin Type", icon: User },
    { key: "awareness", label: "Awareness", icon: BarChart3 },
    { key: "protection", label: "Protection", icon: Shield },
    { key: "resources", label: "Resources", icon: BookOpen },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-6">
        {items.map((item) => {
          const Icon = item.icon;
          const active = page === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setPage(item.key)}
              className={`relative flex flex-col items-center justify-center gap-1 py-3 text-sm transition ${
                active ? "text-amber-600" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {active && <span className="absolute inset-x-5 top-0 h-1 rounded-b-full bg-amber-500" />}
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function SectionCard({ children, className = "" }) {
  return <div className={`rounded-[2rem] border border-white bg-white/85 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.18)] backdrop-blur ${className}`}>{children}</div>;
}

function HomePage({ setPage }) {
  return (
    <AppShell>
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
              SunSense helps users check UV conditions, understand skin protection needs, and access trusted sun safety resources in one place.
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
                  <p className="text-sm uppercase tracking-[0.18em] text-white/80">Featured overview</p>
                  <h3 className="text-2xl font-semibold">Protect earlier, not later</h3>
                </div>
              </div>
              <p className="mt-6 max-w-md text-base leading-7 text-white/90">
                View live UV conditions, get human-readable risk guidance, and explore resources that support prevention-focused behaviour.
              </p>
            </div>
            <div className="grid gap-4 p-6 sm:grid-cols-3">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Core feature</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">Real-time UV</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Education</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">Skin type guidance</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Awareness</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">Trusted resources</p>
              </div>
            </div>
          </SectionCard>
        </div>
      </main>
      <BottomNav page="home" setPage={setPage} />
    </AppShell>
  );
}

function UvPage({ page, setPage }) {
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
        if (!data.error) setUvData(data);
      } catch (error) {
        console.error("UV fetch failed", error);
      }
    }
    fetchUvData();
  }, [city]);

  const badgeClass = uvLabelClass[uvData.level] || "bg-slate-100 text-slate-700 ring-1 ring-slate-200";

  return (
    <AppShell>
      <Header />
      <main className="mx-auto max-w-6xl px-6 pb-28 pt-10">
        <SectionCard className="p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[.95fr_1.05fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">US1.1 Localised UV Alert</p>
              <h2 className="mt-3 text-4xl font-semibold text-slate-900 sm:text-5xl">Track UV Levels</h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Select a Victorian location to view current UV conditions and immediate protection guidance.
              </p>

              <div className="mt-8 rounded-[1.75rem] bg-slate-50 p-4 ring-1 ring-slate-200">
                <label className="mb-3 block text-sm font-medium text-slate-500">Choose location</label>
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
                  <p className="text-sm uppercase tracking-[0.18em] text-white/65">Current result</p>
                  <h3 className="mt-2 text-3xl font-semibold">{uvData.city}</h3>
                </div>
                <span className={`rounded-full px-4 py-2 text-sm font-semibold ${badgeClass}`}>{uvData.level}</span>
              </div>
              <div className="mt-10 flex items-end gap-4">
                <div className="text-7xl font-bold leading-none">{uvData.uv}</div>
                <div className="pb-2 text-white/70">UV Index</div>
              </div>
              <div className="mt-8 rounded-3xl bg-white/10 p-5 text-sm leading-7 text-white/90 ring-1 ring-white/10">
                UV in {uvData.city} is currently <strong>{uvData.level}</strong>. Skin may begin to experience damage in <strong>{uvData.damageTime}</strong>. Sunscreen, shade, and protective clothing are recommended now.
              </div>
            </div>
          </div>
        </SectionCard>
      </main>
      <BottomNav page={page} setPage={setPage} />
    </AppShell>
  );
}

function SkinPage({ page, setPage }) {
  const [selectedCard, setSelectedCard] = useState("medium");
  const backendTone = toneMap[selectedCard] || "medium";
  const [profile, setProfile] = useState({
    title: "Medium skin tone",
    text: "Medium skin may not burn as fast, but long-term UV exposure can still cause pigmentation and skin damage.",
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/skin-profile?tone=${backendTone}`);
        const data = await res.json();
        if (!data.error) setProfile(data);
      } catch (error) {
        console.error("Skin profile fetch failed", error);
      }
    }
    fetchProfile();
  }, [backendTone]);

  return (
    <AppShell>
      <Header />
      <main className="mx-auto max-w-6xl px-6 pb-28 pt-10">
        <SectionCard className="p-6 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">US2.2 Skin Tone and UV Absorption</p>
          <h2 className="mt-3 text-4xl font-semibold text-slate-900 sm:text-5xl">Find Your Skin Profile</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Choose the skin tone that best matches you to view personalized protection guidance.
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
                      <div className="text-xl font-semibold text-slate-900">{item.label}</div>
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
                <h3 className="text-2xl font-semibold text-slate-900">{profile.title}</h3>
                <p className="mt-3 text-lg leading-8 text-slate-700">{profile.text}</p>
                <p className="mt-4 text-sm leading-7 text-slate-500">
                  This tool provides general sun safety guidance. Protection needs can also vary based on time outdoors, clothing, sunscreen use, and current UV level.
                </p>
              </div>
            </div>
          </div>
        </SectionCard>
      </main>
      <BottomNav page={page} setPage={setPage} />
    </AppShell>
  );
}

function AwarenessPage({ page, setPage }) {
  const [myths, setMyths] = useState([]);

  useEffect(() => {
    async function fetchMyths() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/myths`);
        const data = await res.json();
        if (!data.error) setMyths(data);
      } catch (error) {
        console.error("Myths fetch failed", error);
      }
    }
    fetchMyths();
  }, []);

  return (
    <AppShell>
      <Header />
      <main className="mx-auto max-w-6xl px-6 pb-28 pt-10">
        <SectionCard className="p-6 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-600">US2.1 UV Impacts and Skin Myths</p>
          <h2 className="mt-3 text-4xl font-semibold text-slate-900 sm:text-5xl">Awareness and Insights</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Explore simple visual summaries about UV behaviour, common misconceptions, and seasonal trend patterns.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-rose-100 p-3 text-rose-600">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900">Behaviour snapshot</h3>
                  <p className="text-sm text-slate-500">Illustrative awareness metrics</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {awarenessCharts.map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-slate-600">{item.label}</span>
                      <span className="font-semibold text-slate-800">{item.value}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-slate-100">
                      <div className="h-3 rounded-full bg-gradient-to-r from-amber-400 to-rose-500" style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-sky-100 p-3 text-sky-600">
                  <Sun className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900">Seasonal UV trend</h3>
                  <p className="text-sm text-slate-500">Illustrative Australia-focused trend line</p>
                </div>
              </div>
              <div className="mt-8 flex h-56 items-end gap-4 rounded-3xl bg-slate-50 p-5">
                {heatTrend.map((item) => (
                  <div key={item.month} className="flex flex-1 flex-col items-center justify-end gap-3">
                    <div className="w-full rounded-t-2xl bg-gradient-to-t from-sky-500 to-cyan-300" style={{ height: `${item.uv * 16}px` }} />
                    <div className="text-xs font-medium text-slate-500">{item.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[1.8rem] bg-slate-50 p-6 ring-1 ring-slate-200">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-amber-100 p-3 text-amber-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">Skin myths and facts</h3>
                <p className="text-sm text-slate-500">Loaded from backend data</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {myths.map((item, index) => (
                <div key={index} className="rounded-[1.4rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-500">Myth</p>
                  <p className="mt-2 text-base font-medium leading-7 text-slate-900">{item.myth}</p>
                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">Fact</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.fact}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </main>
      <BottomNav page={page} setPage={setPage} />
    </AppShell>
  );
}

function ProtectionPage({ page, setPage }) {
  const [reminder, setReminder] = useState(120);
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
        if (!data.error) setUvData(data);
      } catch (error) {
        console.error("UV fetch failed", error);
      }
    }
    fetchUvData();
  }, [city]);

  function getDosage(level) {
    if (level === "Low") return "Apply 2 pumps (or around 1 teaspoon for exposed areas) before going outside.";
    if (level === "Moderate") return "Apply 2–3 pumps and cover all exposed areas carefully.";
    if (level === "High") return "Apply 3 pumps or a generous layer, especially on face, neck, and arms.";
    if (level === "Very High") return "Apply 3–4 pumps or a full, even coat and reapply carefully.";
    return "Apply a full generous layer (3–4 pumps minimum) and combine with shade and protective clothing.";
  }

  function getClothing(level) {
    if (level === "Low") return ["Sunglasses", "Light hat", "Optional light layer"];
    if (level === "Moderate") return ["Sunglasses", "Wide-brim hat", "Light sleeves"];
    if (level === "High") return ["Wide-brim hat", "Long sleeves", "Sunglasses with UV protection"];
    if (level === "Very High") return ["Wide-brim hat", "Long sleeves", "Dense fabric or UPF clothing"];
    return ["UPF clothing", "Wide-brim hat", "Covered shoulders and arms"];
  }

  const clothing = getClothing(uvData.level);
  const dosage = getDosage(uvData.level);

  return (
    <AppShell>
      <Header />
      <main className="mx-auto max-w-6xl px-6 pb-28 pt-10">
        <SectionCard className="p-6 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">US3 Practical Protection Guidance</p>
          <h2 className="mt-3 text-4xl font-semibold text-slate-900 sm:text-5xl">Protection and Prevention</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Use current UV conditions to guide sunscreen amount, reapplication timing, and protective clothing choices.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-amber-100 p-3 text-amber-600">
                  <Sun className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">US3.1 Sunscreen Dosage</h3>
                  <p className="text-sm text-slate-500">Based on current UV level</p>
                </div>
              </div>
              <div className="mt-5 rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <label className="mb-2 block text-sm text-slate-500">Location for guidance</label>
                <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none">
                  {cityOptions.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="mt-5 rounded-3xl bg-amber-50 p-5 ring-1 ring-amber-100">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-700">Current UV: {uvData.level}</p>
                <p className="mt-3 text-base leading-7 text-slate-700">{dosage}</p>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-rose-100 p-3 text-rose-600">
                  <Bell className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">US3.2 Reapplication Reminder</h3>
                  <p className="text-sm text-slate-500">Set a sunscreen reminder interval</p>
                </div>
              </div>
              <div className="mt-6 rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
                <p className="text-sm text-slate-500">Reminder interval</p>
                <div className="mt-3 text-4xl font-semibold text-slate-900">{reminder} min</div>
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
                  Recommended baseline: every 2 hours, and sooner after swimming, sweating, or towel drying.
                </p>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-sky-100 p-3 text-sky-600">
                  <Shirt className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">US3.3 Clothing Advice</h3>
                  <p className="text-sm text-slate-500">Recommended by UV risk level</p>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {clothing.map((item) => (
                  <div key={item} className="rounded-2xl bg-sky-50 px-4 py-3 text-sm font-medium text-slate-700 ring-1 ring-sky-100">
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-600">
                Current guidance is based on <strong>{uvData.city}</strong> with a UV level of <strong>{uvData.level}</strong>.
              </p>
            </div>
          </div>
        </SectionCard>
      </main>
      <BottomNav page={page} setPage={setPage} />
    </AppShell>
  );
}

function ResourcesPage({ page, setPage }) {
  return (
    <AppShell>
      <Header />
      <main className="mx-auto max-w-6xl px-6 pb-28 pt-10">
        <SectionCard className="p-6 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Awareness and Support</p>
          <h2 className="mt-3 text-4xl font-semibold text-slate-900 sm:text-5xl">Sun Protection Resources</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Explore trusted organizations and educational resources related to UV exposure, protection, and skin health.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {resources.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className={`h-2 w-full bg-gradient-to-r ${item.accent}`} />
                  <div className="p-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
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
    </AppShell>
  );
}

export default function SunSenseMultiPageStyle() {
  const [page, setPage] = useState("home");

  const currentPage = useMemo(() => {
    switch (page) {
      case "uv":
        return <UvPage page={page} setPage={setPage} />;
      case "skin":
        return <SkinPage page={page} setPage={setPage} />;
      case "awareness":
        return <AwarenessPage page={page} setPage={setPage} />;
      case "protection":
        return <ProtectionPage page={page} setPage={setPage} />;
      case "resources":
        return <ResourcesPage page={page} setPage={setPage} />;
      default:
        return <HomePage setPage={setPage} />;
    }
  }, [page]);

  return <div className="min-h-screen">{currentPage}</div>;
}
