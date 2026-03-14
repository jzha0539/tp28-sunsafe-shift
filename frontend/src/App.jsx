import { useState } from "react";
import HomePage from "./pages/HomePage";
import UvPage from "./pages/UvPage";
import SkinPage from "./pages/SkinPage";
import AwarenessPage from "./pages/AwarenessPage";
import ProtectionPage from "./pages/ProtectionPage";
import ResourcesPage from "./pages/ResourcesPage";

function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50 text-slate-800">
      {children}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");

  switch (page) {
    case "uv":
      return (
        <AppShell>
          <UvPage page={page} setPage={setPage} />
        </AppShell>
      );
    case "skin":
      return (
        <AppShell>
          <SkinPage page={page} setPage={setPage} />
        </AppShell>
      );
    case "awareness":
      return (
        <AppShell>
          <AwarenessPage page={page} setPage={setPage} />
        </AppShell>
      );
    case "protection":
      return (
        <AppShell>
          <ProtectionPage page={page} setPage={setPage} />
        </AppShell>
      );
    case "resources":
      return (
        <AppShell>
          <ResourcesPage page={page} setPage={setPage} />
        </AppShell>
      );
    default:
      return (
        <AppShell>
          <HomePage page={page} setPage={setPage} />
        </AppShell>
      );
  }
}