import { useState } from "react";
import { MODES, HABITS, LEVELS, getLevel } from "../data/constants";
import { Card, Label, XPBar, AstroNote, StatBox } from "../components/UI";

export default function Today({ appState }) {
  const { dayData, totalXP, streak, selectMode, toggleHabit, resetDay } = appState;
  const { mode, checked } = dayData;
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpInfo, setLevelUpInfo] = useState(null);

  const m = mode ? MODES[mode] : null;
  const habits = mode ? HABITS.filter(h => h.modes.includes(mode)) : [];
  const todayXP = habits.reduce((s, h) => s + (checked[h.id] ? h.xp : 0), 0);
  const doneCount = habits.filter(h => checked[h.id]).length;
  const lvl = getLevel(totalXP);
  const allDone = habits.length > 0 && doneCount === habits.length;
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-DE", { weekday:"long", day:"numeric", month:"long" });

  const handleToggle = (habit) => {
    const prevLvl = getLevel(totalXP).level;
    toggleHabit(habit.id, habit.xp);
    const newXP = totalXP + (checked[habit.id] ? -habit.xp : habit.xp);
    const newLvl = getLevel(Math.max(0, newXP)).level;
    if (newLvl > prevLvl) {
      const info = LEVELS.find(l => l.level === newLvl);
      setLevelUpInfo(info);
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }
  };

  return (
    <div className="space-y-3 pb-6">

      {showLevelUp && (
        <div className="card p-4 flex items-center gap-3" style={{ borderColor: "#7f77dd55" }}>
          <span className="text-2xl">{levelUpInfo?.emoji}</span>
          <div>
            <div className="text-sm font-semibold text-white">Level {levelUpInfo?.level} — {levelUpInfo?.badge}</div>
            <div className="text-xs text-gray-500">Saturn noticed. Keep going.</div>
          </div>
        </div>
      )}

      {/* Header */}
      <Card>
        <div className="flex justify-between items-start">
          <div>
            <div className="text-xs text-gray-500 mb-1">{dateStr}</div>
            <div className="text-xl font-semibold">Good morning, Sri 👋</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 mb-1">🔥 {streak} day streak</div>
            <div className="text-xs font-medium px-2 py-1 rounded-full bg-gray-800 text-gray-300">
              {lvl.emoji} Lv {lvl.level} · {lvl.badge}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-semibold text-white">{totalXP}</span>
            <span className="text-xs text-gray-500">/ 1500 XP to Saturn Slayer</span>
          </div>
          <div className="h-1 rounded-full bg-gray-800 overflow-hidden">
            <div className="h-full rounded-full bg-purple-500 transition-all duration-500"
              style={{ width: `${Math.min(100, Math.round(totalXP/15))}%` }} />
          </div>
          <div className="flex justify-between mt-1">
            {LEVELS.map(l => (
              <span key={l.level} className="text-xs"
                style={{ color: totalXP >= l.min ? "#7f77dd" : "#333" }}>
                {l.emoji}
              </span>
            ))}
          </div>
        </div>
      </Card>

      {/* Mode selector */}
      <Card>
        <Label>What's today?</Label>
        <div className="grid grid-cols-3 gap-2">
          {Object.values(MODES).map(md => (
            <button key={md.id} onClick={() => selectMode(md.id)}
              className="rounded-xl p-3 flex flex-col items-center gap-2 transition-all active:scale-95"
              style={{
                background: mode === md.id ? md.accentBg : "#1a1a1a",
                border: `${mode === md.id ? "1.5px" : "0.5px"} solid ${mode === md.id ? md.accent : "#2a2a2a"}`,
              }}>
              <span className="text-xl">{md.emoji}</span>
              <span className="text-xs font-medium text-center leading-tight"
                style={{ color: mode === md.id ? md.accentLight : "#666" }}>
                {md.label}
              </span>
            </button>
          ))}
        </div>
        {m && (
          <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium"
            style={{ background: m.accentBg, color: m.accentLight }}>
            {m.emoji} {m.tagline}
            <span className="ml-auto opacity-60">max {m.maxXP} XP</span>
          </div>
        )}
      </Card>

      {/* Habits */}
      {mode && (
        <>
          <Card>
            <div className="flex justify-between items-center mb-3">
              <Label>Today's habits</Label>
              <span className="text-xs text-gray-500">{doneCount}/{habits.length} done</span>
            </div>

            {allDone && (
              <div className="mb-3 p-3 rounded-lg flex items-center gap-3"
                style={{ background: "#0d1a06", border: "0.5px solid #639922aa" }}>
                <span className="text-lg">✅</span>
                <div>
                  <div className="text-sm font-medium text-green-400">All done for today</div>
                  <div className="text-xs text-gray-500">Saturn noticed. Rahu approves.</div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {habits.map(h => {
                const done = !!checked[h.id];
                return (
                  <div key={h.id} onClick={() => handleToggle(h)}
                    className="flex items-center gap-3 p-3 rounded-xl cursor-pointer active:scale-98 transition-all"
                    style={{
                      background: done ? m.accentBg : "#1a1a1a",
                      border: `0.5px solid ${done ? m.accent + "55" : "#2a2a2a"}`,
                      opacity: done ? 0.75 : 1,
                    }}>
                    <div className="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center transition-all"
                      style={{
                        background: done ? m.accent : "transparent",
                        border: `1.5px solid ${done ? m.accent : "#444"}`,
                      }}>
                      {done && <span className="text-white text-xs">✓</span>}
                    </div>
                    <span className="text-base flex-shrink-0">{h.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate"
                        style={{ color: done ? "#555" : "#f0f0f0", textDecoration: done ? "line-through" : "none" }}>
                        {h.label}
                      </div>
                      <div className="text-xs text-gray-600">{h.note}</div>
                    </div>
                    <div className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        background: done ? m.accent + "22" : "#222",
                        color: done ? m.accentLight : "#555",
                      }}>
                      +{h.xp}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4">
              <XPBar current={todayXP} max={m.maxXP} color={m.accent} />
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <StatBox label="earned today" value={todayXP} color={m.accent} />
            <StatBox label="remaining" value={Math.max(0, m.maxXP - todayXP)} />
          </div>

          <AstroNote text={m.astro} />

          <button onClick={resetDay} className="btn-ghost w-full text-xs">
            ↺ Switch day mode
          </button>
        </>
      )}

      {!mode && (
        <div className="text-center py-10 text-gray-600 text-sm">
          👆 Pick your mode to load today's tasks
        </div>
      )}
    </div>
  );
}
