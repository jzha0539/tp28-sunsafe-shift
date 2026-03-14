import { Home, Search, User, BookOpen, BarChart3, Shield } from "lucide-react";

export default function BottomNav({ page, setPage }) {
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
              {active && (
                <span className="absolute inset-x-5 top-0 h-1 rounded-b-full bg-amber-500" />
              )}
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}