export default function SectionCard({ children, className = "" }) {
    return (
      <div
        className={`rounded-[2rem] border border-white bg-white/85 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.18)] backdrop-blur ${className}`}
      >
        {children}
      </div>
    );
  }