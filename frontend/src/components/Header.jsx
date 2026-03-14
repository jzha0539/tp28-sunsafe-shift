export default function Header() {
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