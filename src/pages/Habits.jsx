import { HABITS, MODES, getLevel, LEVELS } from "../data/constants";
import { Card, Label, SectionHeader, StatBox, XPBar, AstroNote } from "../components/UI";

export default function Habits({ appState }) {
  const { totalXP, streak, dayData } = appState;
  const { mode, checked } = dayData;
  const lvl = getLevel(totalXP);
  const nextLvl = LEVELS.find(l => l.level === lvl.level + 1);

  const categories = {
    "🌍 Every Day": HABITS.filter(h => h.modes.length === 3),
    "🔴 Work Day Only": HABITS.filter(h => h.modes.length === 1 && h.modes[0] === "work"),
    "🟢 Free Day": HABITS.filter(h => h.modes.includes("free") && !h.modes.includes("work")),
    "🟡 Exam Day": HABITS.filter(h => h.modes.includes("exam") && !h.modes.includes("free") && !h.modes.includes("work")),
  };

  const totalPossibleFree = HABITS.filter(h=>h.modes.includes("free")).reduce((s,h)=>s+h.xp,0);

  return (
    <div className="space-y-3 pb-6">
      <SectionHeader title="🏆 Habit Tracker" sub="XP system · streaks · level progression" />

      {/* Level card */}
      <Card style={{ background: "linear-gradient(135deg, #1a1a2e, #111)" }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-2xl font-bold text-white">{lvl.emoji} {lvl.badge}</div>
            <div className="text-xs text-gray-500 mt-0.5">Level {lvl.level} of 6</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-semibold text-purple-400">{totalXP}</div>
            <div className="text-xs text-gray-600">total XP</div>
          </div>
        </div>
        {nextLvl ? (
          <>
            <XPBar current={totalXP - lvl.min} max={nextLvl.min - lvl.min} color="#7f77dd" />
            <div className="text-xs text-gray-600 mt-1">{nextLvl.min - totalXP} XP to {nextLvl.emoji} {nextLvl.badge}</div>
          </>
        ) : (
          <div className="text-xs text-purple-400">🌌 Maximum level reached. Saturn Slayer.</div>
        )}
      </Card>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2">
        <StatBox label="day streak" value={`${streak}🔥`} color="#BA7517" />
        <StatBox label="best mode" value="Free" color="#639922" sub={`max ${totalPossibleFree} XP`} />
        <StatBox label="today" value={mode ? (MODES[mode]?.label || "—").split(" ")[0] : "—"} />
      </div>

      {/* XP by mode */}
      <Card>
        <Label>XP available by mode</Label>
        <div className="space-y-3">
          {[
            { label:"🔴 Work Day", max:45, color:"#E24B4A" },
            { label:"🟢 Free Day", max:165, color:"#639922" },
            { label:"🟡 Exam Day", max:125, color:"#BA7517" },
          ].map(m => (
            <div key={m.label}>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{m.label}</span><span>{m.max} XP max</span>
              </div>
              <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
                <div className="h-full rounded-full" style={{ width:`${Math.round(m.max/165*100)}%`, background:m.color }} />
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-600 mt-3">Weekly target: 400+ XP · 5 free days = 825 XP max</div>
      </Card>

      {/* Level progression */}
      <Card>
        <Label>Level progression</Label>
        <div className="space-y-2">
          {LEVELS.map(l => (
            <div key={l.level} className="flex items-center gap-3">
              <div className="w-6 text-center">{l.emoji}</div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-xs font-medium" style={{ color: totalXP >= l.min ? "#f0f0f0" : "#444" }}>
                    Lv {l.level} · {l.badge}
                  </span>
                  <span className="text-xs text-gray-600">{l.min}–{l.max === 9999 ? "∞" : l.max}</span>
                </div>
              </div>
              {totalXP >= l.min && <span className="text-green-500 text-xs">✓</span>}
            </div>
          ))}
        </div>
      </Card>

      {/* All habits by category */}
      {Object.entries(categories).map(([cat, habits]) => (
        <Card key={cat}>
          <Label>{cat}</Label>
          <div className="space-y-2">
            {habits.map(h => {
              const active = mode && h.modes.includes(mode);
              const done = !!checked[h.id];
              return (
                <div key={h.id} className="flex items-center gap-3 p-2 rounded-lg"
                  style={{ background: done ? "#0d1a06" : active ? "#1a1a1a" : "#111", opacity: !mode || active ? 1 : 0.4 }}>
                  <span className="text-base">{h.icon}</span>
                  <div className="flex-1">
                    <div className="text-xs font-medium" style={{ color: done ? "#86c144" : "#ccc" }}>
                      {h.label} {done && "✓"}
                    </div>
                    <div className="text-xs text-gray-600">{h.note}</div>
                  </div>
                  <div className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{ background: "#7f77dd22", color: "#7f77dd" }}>+{h.xp}</div>
                </div>
              );
            })}
          </div>
        </Card>
      ))}

      <AstroNote text="Chitra moon + Rohini sun = your perfectionism trap. The scatter pattern (start–dropout) is your core karmic challenge. Streaks break it. One habit maintained for 30 days beats 10 habits maintained for 3 days." />
    </div>
  );
}
