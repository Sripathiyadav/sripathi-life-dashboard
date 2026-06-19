export function Card({ children, className = "", style = {} }) {
  return (
    <div className={`card p-4 ${className}`} style={style}>
      {children}
    </div>
  );
}

export function Label({ children }) {
  return <div className="label mb-2">{children}</div>;
}

export function XPBar({ current, max, color, showLabel = true }) {
  const pct = Math.min(100, Math.round((current / max) * 100));
  return (
    <div>
      {showLabel && (
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{current} / {max} XP</span>
          <span>{pct}%</span>
        </div>
      )}
      <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

export function Badge({ children, color = "#7f77dd" }) {
  return (
    <span className="text-xs font-medium px-2 py-0.5 rounded-full"
      style={{ background: color + "22", color }}>
      {children}
    </span>
  );
}

export function ProgressRing({ pct, size = 48, color = "#7f77dd", children }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} stroke="#222" strokeWidth={5} fill="none" />
        <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth={5} fill="none"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.5s ease" }} />
      </svg>
      <div className="absolute text-xs font-medium" style={{ color }}>{children}</div>
    </div>
  );
}

export function StatBox({ label, value, sub, color = "#f0f0f0" }) {
  return (
    <div className="bg-gray-900 rounded-xl p-3">
      <div className="label mb-1">{label}</div>
      <div className="text-2xl font-medium" style={{ color }}>{value}</div>
      {sub && <div className="text-xs text-gray-500 mt-0.5">{sub}</div>}
    </div>
  );
}

export function SectionHeader({ title, sub }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
    </div>
  );
}

export function AstroNote({ text }) {
  return (
    <div className="mt-3 p-3 rounded-lg text-xs text-gray-400 leading-relaxed"
      style={{ background: "#7f77dd11", borderLeft: "2px solid #7f77dd44" }}>
      ✨ {text}
    </div>
  );
}

export function EmptyState({ emoji, title, sub }) {
  return (
    <div className="text-center py-12">
      <div className="text-4xl mb-3">{emoji}</div>
      <div className="text-sm font-medium text-gray-300">{title}</div>
      {sub && <div className="text-xs text-gray-500 mt-1">{sub}</div>}
    </div>
  );
}

export function NotionLink({ href, label = "Open in Notion" }) {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors mt-2"
      style={{ textDecoration: "none" }}>
      <span style={{ fontSize: 14 }}>📓</span>
      {label} ↗
    </a>
  );
}
