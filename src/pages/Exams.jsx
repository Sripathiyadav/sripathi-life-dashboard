import { useState } from "react";
import { EXAM_SUBJECTS, NOTION_LINKS, daysUntil, hoursPerDayNeeded } from "../data/constants";
import { Card, Label, SectionHeader, XPBar, AstroNote, NotionLink } from "../components/UI";

export default function Exams({ appState }) {
  const { examSubjects, updateExam } = appState;
  const [openId, setOpenId] = useState(null);

  const getSubject = (id) => {
    const saved = (examSubjects && examSubjects[id]) || {};
    const base = EXAM_SUBJECTS.find(s => s.id === id) || {};
    return { ...base, ...saved };
  };

  const subjects = EXAM_SUBJECTS.map(s => getSubject(s.id));
  const totalStudied = subjects.reduce((s, sub) => s + (sub.studyHours || 0), 0);
  const totalTarget = subjects.reduce((s, sub) => s + (sub.targetHours || 25), 0);
  const earliestDate = subjects.filter(s => s.date).sort((a,b) => a.date.localeCompare(b.date))[0];
  const daysToFirst = earliestDate ? daysUntil(earliestDate.date) : null;
  const urgencyColor = daysToFirst === null ? "#555" : daysToFirst <= 7 ? "#E24B4A" : daysToFirst <= 14 ? "#BA7517" : "#639922";
  const noDates = subjects.every(s => !s.date);

  return (
    <div className="space-y-3 pb-6">
      <SectionHeader title="📚 Exam War Room" sub="ITSM · DS · ES — July 2026" />

      <div className="grid grid-cols-3 gap-2">
        <Card className="text-center">
          <div className="text-2xl font-bold" style={{ color: urgencyColor }}>
            {daysToFirst !== null ? daysToFirst : "?"}
          </div>
          <div className="text-xs text-gray-500 mt-1 leading-tight">days to first</div>
          {daysToFirst === null && <div className="text-xs text-red-400 mt-1">⚠️ set dates</div>}
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-green-400">{totalStudied}h</div>
          <div className="text-xs text-gray-500 mt-1">logged</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-gray-400">{Math.max(0,totalTarget-totalStudied)}h</div>
          <div className="text-xs text-gray-500 mt-1">remaining</div>
        </Card>
      </div>

      <Card>
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Overall progress</span><span>{totalStudied}h / {totalTarget}h</span>
        </div>
        <XPBar current={totalStudied} max={totalTarget} color="#BA7517" showLabel={false} />
      </Card>

      {noDates && (
        <Card style={{ borderColor:"#E24B4A88", background:"#1e1212" }}>
          <div className="text-sm text-red-400 font-semibold">⚠️ No exam dates set</div>
          <div className="text-xs text-gray-400 mt-1">Check your university portal TODAY. Tap each subject below to add the date. The daily hours calculator won't work without it.</div>
        </Card>
      )}

      {subjects.map(sub => {
        const pct = Math.min(100, Math.round(((sub.studyHours||0)/(sub.targetHours||25))*100));
        const days = sub.date ? daysUntil(sub.date) : null;
        const hpd = hoursPerDayNeeded(sub.targetHours||25, sub.studyHours||0, sub.date);
        const pctColor = pct >= 80 ? "#639922" : pct >= 40 ? "#BA7517" : "#E24B4A";
        const isOpen = openId === sub.id;

        return (
          <Card key={sub.id}>
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setOpenId(isOpen ? null : sub.id)}>
              <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                style={{ background:pctColor+"22", color:pctColor, border:`1.5px solid ${pctColor}` }}>
                {pct}%
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white">{sub.name||sub.code}</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {sub.studyHours||0}h / {sub.targetHours||25}h
                  {days !== null && <span className="ml-2" style={{color:days<=7?"#E24B4A":"#BA7517"}}>· {days}d left</span>}
                </div>
                {hpd && (
                  <div className="text-xs font-semibold mt-0.5" style={{color:parseFloat(hpd)>3?"#E24B4A":"#f5a623"}}>
                    → {hpd}h/day needed
                  </div>
                )}
                {!sub.date && <div className="text-xs text-red-500 mt-0.5">⚠️ No exam date</div>}
              </div>
              <span className="text-gray-600">{isOpen?"▲":"▼"}</span>
            </div>

            {isOpen && (
              <div className="mt-4 space-y-3 border-t border-gray-800 pt-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>Subject name</Label>
                    <input value={sub.name||""} onChange={e=>updateExam(sub.id,{name:e.target.value})}
                      placeholder="e.g. ITSM"
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg p-2 text-xs text-gray-200 focus:outline-none focus:border-gray-600" />
                  </div>
                  <div>
                    <Label>Exam date</Label>
                    <input type="date" value={sub.date||""} onChange={e=>updateExam(sub.id,{date:e.target.value})}
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg p-2 text-xs text-gray-200 focus:outline-none focus:border-gray-600" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>Hours studied</Label>
                    <input type="number" min={0} value={sub.studyHours||0}
                      onChange={e=>updateExam(sub.id,{studyHours:+e.target.value})}
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg p-2 text-xs text-gray-200 focus:outline-none focus:border-gray-600" />
                  </div>
                  <div>
                    <Label>Target hours</Label>
                    <input type="number" min={1} value={sub.targetHours||25}
                      onChange={e=>updateExam(sub.id,{targetHours:+e.target.value})}
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg p-2 text-xs text-gray-200 focus:outline-none focus:border-gray-600" />
                  </div>
                </div>

                {hpd && (
                  <div className="p-3 rounded-lg text-center"
                    style={{background:parseFloat(hpd)>3?"#1e1212":"#1a1200"}}>
                    <div className="text-3xl font-bold" style={{color:parseFloat(hpd)>3?"#E24B4A":"#f5a623"}}>
                      {hpd}h
                    </div>
                    <div className="text-xs text-gray-500 mt-1">per day needed to hit target</div>
                    {parseFloat(hpd)>3 && <div className="text-xs text-red-400 mt-1">⚠️ Critical — start immediately or increase daily sessions</div>}
                    {parseFloat(hpd)<=2 && <div className="text-xs text-green-400 mt-1">✅ Manageable — stay consistent</div>}
                  </div>
                )}

                <div>
                  <Label>Notes / weak areas</Label>
                  <textarea value={sub.notes||""} rows={3}
                    onChange={e=>updateExam(sub.id,{notes:e.target.value})}
                    placeholder="Weak topics, what to focus on..."
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg p-2 text-xs text-gray-300 resize-none focus:outline-none focus:border-gray-600" />
                </div>
                <XPBar current={sub.studyHours||0} max={sub.targetHours||25} color="#BA7517" />
              </div>
            )}
          </Card>
        );
      })}

      <Card style={{borderLeft:"2px solid #E24B4A"}}>
        <Label>Active recall rules</Label>
        <div className="space-y-1.5 text-xs mt-1">
          {[["❌","Highlighting = passive. Zero retention."],["❌","Re-reading notes = false familiarity."],
            ["✅","Write concepts from memory first, then check."],["✅","Feynman technique — teach it out loud."],
            ["✅","Past papers > notes. Always."],["✅","Hardest subject first when brain is fresh."]
          ].map(([icon,text],i)=>(
            <div key={i} className="flex gap-2" style={{color:icon==="✅"?"#639922":"#555"}}>
              <span className="flex-shrink-0">{icon}</span><span>{text}</span>
            </div>
          ))}
        </div>
      </Card>

      <NotionLink href={NOTION_LINKS.exams} label="Open Exam War Room in Notion" />
      <AstroNote text="34 days. Saturn test. The student who starts today has 3× the retention of the one who starts July 10. Past papers beat passive reading every time." />
    </div>
  );
}
