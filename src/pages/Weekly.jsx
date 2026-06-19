import { useState } from "react";
import { Card, Label, SectionHeader, NotionLink } from "../components/UI";
import { NOTION_LINKS } from "../data/constants";

const WEEK_TARGETS = [
  { key:"german",  label:"German (7 days)",          target:7,  unit:"days" },
  { key:"apps",    label:"Applications sent",         target:3,  unit:"apps" },
  { key:"project", label:"Side project sessions",     target:2,  unit:"sessions" },
  { key:"gym",     label:"Gym sessions",              target:3,  unit:"sessions" },
  { key:"content", label:"Content pieces published",  target:2,  unit:"pieces" },
  { key:"study",   label:"Study hours",               target:6,  unit:"hours" },
];

const THEMES = ["🔴 Movement (Rahu)","🔵 Discipline (Saturn)","🟢 Visibility (Mercury)"];
const BADGES = ["🌱 Seedling","🔥 Spark","⚡ Live Wire","🛡️ Iron Will","🚀 Launch Mode","🌌 Saturn Slayer"];

function getWeekKey() {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(new Date().setDate(diff)).toISOString().slice(0,10);
}

export default function Weekly({ appState }) {
  const { weeklyReviews, saveWeeklyReview, weekXPLog } = appState;
  const weekKey = getWeekKey();
  const autoXP = weekXPLog[weekKey] || 0;
  const existing = weeklyReviews.find(r => r.weekKey === weekKey) || {};

  const [form, setForm] = useState({
    weekKey, actuals:{}, whatWorked:"", whatBroke:"",
    nextWeekPriority:"", theme:"", badge:"", ...existing,
  });
  const [saved, setSaved] = useState(false);

  const update = (key, val) => setForm(f=>({...f,[key]:val}));
  const updateActual = (key, val) => setForm(f=>({...f, actuals:{...f.actuals,[key]:val}}));

  const handleSave = () => {
    saveWeeklyReview({...form, xpEarned: autoXP});
    setSaved(true);
    setTimeout(()=>setSaved(false), 2000);
  };

  const xpGrade = autoXP>=800?"S":autoXP>=600?"A":autoXP>=400?"B":autoXP>=200?"C":"D";
  const gradeColor = {S:"#7f77dd",A:"#639922",B:"#BA7517",C:"#E24B4A",D:"#555"};

  return (
    <div className="space-y-3 pb-6">
      <SectionHeader title="🌙 Weekly Review" sub="Every Sunday · 20 min · Non-negotiable" />

      <Card style={{borderLeft:"2px solid #7f77dd"}}>
        <p className="text-xs text-gray-400 leading-relaxed italic">
          "Rahu rewards movement. Saturn rewards discipline. Mercury rewards visibility. Pick the one most relevant to this week."
        </p>
      </Card>

      {/* Auto XP from tracking */}
      <Card>
        <Label>XP earned this week (auto-calculated)</Label>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="text-4xl font-bold text-purple-400">{autoXP}</div>
            <div className="text-xs text-gray-600 mt-1">tracked from habit checkoffs · target 400+</div>
            <div className="h-1.5 rounded-full bg-gray-800 mt-2 overflow-hidden">
              <div className="h-full rounded-full bg-purple-500 transition-all"
                style={{width:`${Math.min(100,Math.round(autoXP/8))}%`}} />
            </div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-black" style={{color:gradeColor[xpGrade]}}>{xpGrade}</div>
            <div className="text-xs text-gray-600 mt-1">grade</div>
          </div>
        </div>
      </Card>

      {/* Metrics */}
      <Card>
        <Label>Last week honest count</Label>
        <div className="space-y-3 mt-1">
          {WEEK_TARGETS.map(t => {
            const actual = form.actuals[t.key] || "";
            const num = parseInt(actual) || 0;
            const pct = Math.min(100, Math.round((num/t.target)*100));
            const color = pct>=100?"#639922":pct>=60?"#BA7517":"#E24B4A";
            return (
              <div key={t.key} className="flex items-center gap-3">
                <div className="text-xs text-gray-400 w-36 flex-shrink-0 leading-tight">{t.label}</div>
                <input type="number" min={0} value={actual}
                  onChange={e=>updateActual(t.key,e.target.value)}
                  placeholder="0"
                  className="w-12 bg-gray-900 border border-gray-800 rounded p-1.5 text-xs text-center text-gray-200 focus:outline-none" />
                <div className="text-xs text-gray-700">/{t.target}</div>
                <div className="flex-1 h-1.5 rounded-full bg-gray-800 overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{width:`${pct}%`,background:color}} />
                </div>
                <div className="text-xs w-8 text-right" style={{color}}>{pct}%</div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <Label>What actually worked this week?</Label>
        <textarea value={form.whatWorked} onChange={e=>update("whatWorked",e.target.value)}
          placeholder="Be specific. Not 'I was productive' — WHAT exactly worked?"
          rows={3}
          className="w-full bg-gray-900 border border-gray-800 rounded-lg p-2 text-xs text-gray-300 resize-none focus:outline-none focus:border-gray-600" />
      </Card>

      <Card>
        <Label>What broke down and why?</Label>
        <textarea value={form.whatBroke} onChange={e=>update("whatBroke",e.target.value)}
          placeholder="Pattern recognition, not self-judgment. What specifically failed?"
          rows={3}
          className="w-full bg-gray-900 border border-gray-800 rounded-lg p-2 text-xs text-gray-300 resize-none focus:outline-none focus:border-gray-600" />
      </Card>

      <Card>
        <Label>Next week — ONE non-negotiable priority</Label>
        <input value={form.nextWeekPriority} onChange={e=>update("nextWeekPriority",e.target.value)}
          placeholder="If everything else collapses, this happens..."
          className="w-full bg-gray-900 border border-gray-800 rounded-lg p-2 text-sm text-gray-200 focus:outline-none focus:border-gray-600" />
      </Card>

      <Card>
        <Label>This week's theme</Label>
        <div className="flex flex-wrap gap-2 mt-1">
          {THEMES.map(t=>(
            <button key={t} onClick={()=>update("theme",t)}
              className="text-xs px-3 py-1.5 rounded-full transition-all"
              style={{background:form.theme===t?"#7f77dd33":"#1a1a1a",color:form.theme===t?"#7f77dd":"#555",border:`0.5px solid ${form.theme===t?"#7f77dd":"#2a2a2a"}`}}>
              {t}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <Label>Badge earned</Label>
        <div className="flex flex-wrap gap-2 mt-1">
          {BADGES.map(b=>(
            <button key={b} onClick={()=>update("badge",b)}
              className="text-xs px-3 py-1.5 rounded-full transition-all"
              style={{background:form.badge===b?"#1a1a2e":"#1a1a1a",color:form.badge===b?"#7f77dd":"#555",border:`0.5px solid ${form.badge===b?"#7f77dd":"#2a2a2a"}`}}>
              {b}
            </button>
          ))}
        </div>
      </Card>

      <button onClick={handleSave} className="btn-primary w-full">
        {saved?"✅ Saved! Good work.":"Save this week's review (+25 XP)"}
      </button>

      <NotionLink href={NOTION_LINKS.weekly} label="Open Weekly Review in Notion" />

      {weeklyReviews.length > 0 && (
        <div>
          <div className="label mt-2 mb-2">Past reviews</div>
          <div className="space-y-2">
            {weeklyReviews.slice(0,6).map(r=>(
              <Card key={r.weekKey} className="cursor-pointer" onClick={()=>setForm({...r})}>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-300">Week of {r.weekKey}</div>
                  <div className="flex items-center gap-2">
                    {r.badge && <span className="text-xs">{r.badge}</span>}
                    <span className="text-xs font-medium text-purple-400">{r.xpEarned||r.autoXP||0} XP</span>
                  </div>
                </div>
                {r.nextWeekPriority && <div className="text-xs text-gray-600 mt-1 truncate">→ {r.nextWeekPriority}</div>}
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
