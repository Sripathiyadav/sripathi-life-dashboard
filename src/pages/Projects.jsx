import { useState } from "react";
import { PROJECTS, NOTION_LINKS, daysUntil } from "../data/constants";
import { Card, Label, AstroNote, SectionHeader, Badge, ProgressRing, NotionLink } from "../components/UI";

const STATUS_OPTIONS = ["🔴 Not started","🟡 In progress","🟢 On track","⏸️ Paused","✅ Done"];
const STATUS_COLOR = {"🔴 Not started":"#E24B4A","🟡 In progress":"#BA7517","🟢 On track":"#639922","⏸️ Paused":"#555","✅ Done":"#7f77dd"};
const STALE_DAYS = 7;

export default function Projects({ appState }) {
  const { projects, updateProject } = appState;
  const [expanded, setExpanded] = useState(null);

  const getP = (id) => (projects && projects[id]) || {};
  const today = new Date().toISOString().slice(0,10);

  const isStale = (proj) => {
    const p = getP(proj.id);
    if (!p.lastUpdated) return false;
    const locked = proj.id === "fabric" || proj.id === "content";
    if (locked) return false;
    const days = Math.ceil((new Date(today) - new Date(p.lastUpdated)) / 86400000);
    return days >= STALE_DAYS;
  };

  return (
    <div className="space-y-3 pb-6">
      <SectionHeader title="📦 Project Board" sub="All 6 streams — no hiding from reality" />
      <NotionLink href={NOTION_LINKS.projects} label="Open Project Board in Notion" />

      {PROJECTS.map(proj => {
        const p = getP(proj.id);
        const pct = p.pct ?? proj.pct;
        const status = p.status || "🔴 Not started";
        const isOpen = expanded === proj.id;
        const locked = proj.id === "fabric" || proj.id === "content";
        const stale = isStale(proj);
        const days = proj.deadline ? daysUntil(proj.deadline) : null;
        const urgent = days !== null && days <= 14 && !locked;

        return (
          <Card key={proj.id}
            style={{
              opacity: locked ? 0.55 : 1,
              borderColor: stale ? "#E24B4A55" : urgent ? "#BA751755" : undefined,
            }}>

            {stale && (
              <div className="text-xs text-red-400 mb-2 flex items-center gap-1">
                🔴 Stale — no update in {STALE_DAYS}+ days. What's the blocker?
              </div>
            )}

            <div className="flex items-start gap-3 cursor-pointer" onClick={() => setExpanded(isOpen ? null : proj.id)}>
              <ProgressRing pct={pct} size={46} color={proj.color}>{pct}%</ProgressRing>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-white">{proj.icon} {proj.label}</span>
                  {locked && <Badge color="#555">Locked</Badge>}
                  {stale && <Badge color="#E24B4A">Stale</Badge>}
                </div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{background:(STATUS_COLOR[status]||"#555")+"22", color:STATUS_COLOR[status]||"#555"}}>
                    {status}
                  </span>
                  {days !== null && (
                    <span className="text-xs" style={{color: urgent?"#E24B4A":"#555"}}>
                      {days}d left
                    </span>
                  )}
                  {p.lastUpdated && (
                    <span className="text-xs text-gray-700">updated {p.lastUpdated}</span>
                  )}
                </div>
              </div>
              <span className="text-gray-600 text-sm">{isOpen?"▲":"▼"}</span>
            </div>

            {isOpen && (
              <div className="mt-4 space-y-3 border-t border-gray-800 pt-4">
                <div>
                  <Label>Progress %</Label>
                  <div className="flex items-center gap-3">
                    <input type="range" min={0} max={100} value={pct}
                      onChange={e => updateProject(proj.id, {pct:+e.target.value})}
                      className="flex-1 accent-purple-500" disabled={locked} />
                    <span className="text-sm font-medium w-10 text-right" style={{color:proj.color}}>{pct}%</span>
                  </div>
                </div>

                <div>
                  <Label>Status</Label>
                  <div className="flex flex-wrap gap-2">
                    {STATUS_OPTIONS.map(s => (
                      <button key={s} onClick={() => !locked && updateProject(proj.id, {status:s})}
                        className="text-xs px-3 py-1 rounded-full transition-all"
                        style={{
                          background: status===s ? (STATUS_COLOR[s]||"#555")+"33" : "#1a1a1a",
                          color: status===s ? (STATUS_COLOR[s]||"#aaa") : "#555",
                          border: `0.5px solid ${status===s ? (STATUS_COLOR[s]||"#555") : "#2a2a2a"}`,
                        }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Weekly target</Label>
                  <div className="text-xs text-gray-400 p-2 rounded-lg bg-gray-900">{proj.weeklyTarget}</div>
                </div>

                <div>
                  <Label>Next action</Label>
                  <input type="text" value={p.nextAction||""}
                    onChange={e => updateProject(proj.id, {nextAction:e.target.value})}
                    placeholder="One concrete next step..."
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg p-2 text-xs text-gray-200 focus:outline-none focus:border-gray-600"
                    disabled={locked} />
                </div>

                <div>
                  <Label>Notes</Label>
                  <textarea value={p.notes||""} rows={3}
                    onChange={e => updateProject(proj.id, {notes:e.target.value})}
                    placeholder="What's blocking you?"
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg p-2 text-xs text-gray-300 resize-none focus:outline-none focus:border-gray-600"
                    disabled={locked} />
                </div>

                <AstroNote text={proj.astro} />
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
