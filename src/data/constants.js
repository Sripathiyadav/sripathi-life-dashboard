export const MODES = {
  work: { id:"work", label:"Work Day", emoji:"🔴", accent:"#E24B4A", accentBg:"#1e1212", accentLight:"#f87171", tagline:"Survive + 1 micro-win", maxXP:45,
    astro:"Rahu–Saturn tail. Every work day you still hit the non-negotiables is a point scored. Commute = German time." },
  free: { id:"free", label:"Free Day", emoji:"🟢", accent:"#639922", accentBg:"#0d1a06", accentLight:"#86c144", tagline:"Execute. No excuses.", maxXP:165,
    astro:"Jupiter in Cancer (3rd house) — tailwind active RIGHT NOW. Closes July 2026. Batch cook, batch film, batch apply." },
  exam: { id:"exam", label:"Exam Day", emoji:"🟡", accent:"#BA7517", accentBg:"#1a1200", accentLight:"#f5a623", tagline:"Study is the job.", maxXP:125,
    astro:"3 exams — ITSM, DS, ES. Past papers beat passive reading. Hardest subject first. Mercury antardasha rewards those who passed." },
};

export const HABITS = [
  { id:"german",   label:"German — 20 min",          icon:"🇩🇪", xp:15, modes:["work","free","exam"], note:"Commute counts. Non-negotiable." },
  { id:"water",    label:"2L water",                  icon:"💧", xp:5,  modes:["work","free","exam"], note:"Track with bottle." },
  { id:"sleep",    label:"In bed by midnight",        icon:"🌙", xp:10, modes:["work","free","exam"], note:"Saturn armor. Don't skip." },
  { id:"journal",  label:"1 sentence journal",        icon:"✍️", xp:5,  modes:["work","free","exam"], note:"One honest line." },
  { id:"micro",    label:"1 micro-task (30 min max)", icon:"⚡", xp:10, modes:["work"],               note:"Project / app / script. One thing." },
  { id:"gym",      label:"Gym / workout",             icon:"💪", xp:20, modes:["free"],               note:"Non-negotiable. Protect body." },
  { id:"project",  label:"Side project — 45 min",    icon:"🤖", xp:25, modes:["free"],               note:"One feature. No rabbit holes." },
  { id:"study1",   label:"Study block 1 — 90 min",   icon:"📚", xp:30, modes:["free","exam"],        note:"Active recall only. No highlights." },
  { id:"content",  label:"Content — film/edit/post",  icon:"📱", xp:20, modes:["free"],               note:"Batch 3 pieces. Locked until Aug 16." },
  { id:"apply",    label:"Job application sent",      icon:"📤", xp:15, modes:["free"],               note:"3/week minimum." },
  { id:"linkedin", label:"LinkedIn post/engage",      icon:"💼", xp:10, modes:["free"],               note:"Visibility compounds." },
  { id:"meal",     label:"Meal prep (2 days)",        icon:"🍳", xp:10, modes:["free"],               note:"Cook once, eat twice." },
  { id:"study2",   label:"Study block 2 — 90 min",   icon:"📖", xp:30, modes:["exam"],               note:"Past paper > notes. Always." },
  { id:"study3",   label:"Study block 3 — revision",  icon:"📝", xp:20, modes:["exam"],               note:"Weak subject focus." },
  { id:"movement", label:"Movement — 30 min",         icon:"🚶", xp:15, modes:["exam"],               note:"Clears cortisol." },
];

export const LEVELS = [
  { min:0,    max:100,  level:1, badge:"Seedling",     emoji:"🌱" },
  { min:101,  max:300,  level:2, badge:"Spark",        emoji:"🔥" },
  { min:301,  max:600,  level:3, badge:"Live Wire",    emoji:"⚡" },
  { min:601,  max:1000, level:4, badge:"Iron Will",    emoji:"🛡️" },
  { min:1001, max:1500, level:5, badge:"Launch Mode",  emoji:"🚀" },
  { min:1501, max:9999, level:6, badge:"Saturn Slayer",emoji:"🌌" },
];

export const PROJECTS = [
  { id:"werkstudent", label:"Werkstudent Job Search",     icon:"💼", color:"#7f77dd", deadline:"2026-08-31", pct:15, weeklyTarget:"3 applications + 1 LinkedIn post",  astro:"Jupiter in Cancer closes July 2026. Every week of delay = wasted tailwind." },
  { id:"automator",   label:"Job Application Automator",  icon:"🤖", color:"#E24B4A", deadline:"2026-07-31", pct:15, weeklyTarget:"1 feature completed and tested",     astro:"This IS the Saturn antidote. Building visibility tools = fighting delayed recognition." },
  { id:"exams",       label:"Masters Exams (July 2026)",  icon:"🎓", color:"#BA7517", deadline:"2026-08-15", pct:5,  weeklyTarget:"6 study hours + 1 past paper",       astro:"Must start NOW. Saturn rewards early prep, not last-minute panic." },
  { id:"content",     label:"Content Creation (IG + YT)", icon:"📱", color:"#1D9E75", deadline:"2026-08-16", pct:0,  weeklyTarget:"LOCKED until Aug 16",                astro:"Mercury in Rahu rewards visible communication. Locked until after exams." },
  { id:"german",      label:"German Language (A2 → B1)",  icon:"🇩🇪", color:"#639922", deadline:"2027-01-31", pct:10, weeklyTarget:"20 min/day every single day",        astro:"Venus in Gemini = natural language talent. B1 = 3x job opportunities." },
  { id:"fabric",      label:"Cloud Fabric Certificate",   icon:"☁️", color:"#378ADD", deadline:"2026-12-31", pct:0,  weeklyTarget:"LOCKED until Aug 15",                astro:"Start AFTER exams. Focus is finite. Don't touch before August." },
];

export const EXAM_SUBJECTS = [
  { id:"s1", name:"ITSM", code:"ITSM", date:"", studyHours:0, targetHours:25, notes:"IT Service Management — past papers priority" },
  { id:"s2", name:"DS",   code:"DS",   date:"", studyHours:0, targetHours:25, notes:"Data Structures — practice problems daily" },
  { id:"s3", name:"ES",   code:"ES",   date:"", studyHours:0, targetHours:25, notes:"Embedded Systems — theory + lab work" },
];

export const CONTENT_IDEAS = [
  { pillar:"tech",   title:"Flutter state management in 60 sec",          format:"Reel" },
  { pillar:"tech",   title:"How I built a job automator with Claude API",  format:"YT Short" },
  { pillar:"tech",   title:"Cloud Fabric explained for beginners",         format:"Carousel" },
  { pillar:"life",   title:"A day in my life: job + masters + side project",format:"Reel" },
  { pillar:"life",   title:"Cooking Indian food with German ingredients",  format:"Reel" },
  { pillar:"life",   title:"German A2 → B1: what actually worked",        format:"YT Short" },
  { pillar:"career", title:"My CV before vs after the audit",              format:"Carousel" },
  { pillar:"career", title:"Job rejection — what I learned",              format:"YT Short" },
  { pillar:"career", title:"How to apply for Werkstudent as intl student", format:"Carousel" },
];

export const CONTENT_PILLARS = [
  { id:"tech",   label:"💻 Tech",            color:"#7f77dd", examples:["Flutter tip in 60s","How I built the job automator","Cloud Fabric explained simply"] },
  { id:"life",   label:"🇩🇪 Life in Germany", color:"#1D9E75", examples:["A day in my life: job + masters + side project","Cooking Indian food with German ingredients","German A2→B1: what actually worked"] },
  { id:"career", label:"🚀 Career",           color:"#BA7517", examples:["My CV before vs after","Job rejection — what I learned","How to apply for Werkstudent as intl student"] },
];

export const NOTION_LINKS = {
  hq:      "https://app.notion.com/p/3809a7371119810199d8eecd4251f937",
  habits:  "https://app.notion.com/p/3809a7371119810199d8eecd4251f937",
  exams:   "https://app.notion.com/p/3809a7371119819eaaa2ee36632b12af",
  content: "https://app.notion.com/p/3809a737111981019aa1f94d88bca641",
  weekly:  "https://app.notion.com/p/3809a737111981adb6d2c7a98dc78e7c",
  projects:"https://app.notion.com/p/3809a7371119810199d8eecd4251f937",
};

export const CONTENT_UNLOCK_DATE = "2026-08-16";
export const getLevel = (xp) => LEVELS.find(l => xp >= l.min && xp <= l.max) || LEVELS[0];
export const todayKey = () => new Date().toISOString().slice(0,10);
export const daysUntil = (dateStr) => {
  if (!dateStr) return null;
  return Math.ceil((new Date(dateStr) - new Date()) / 86400000);
};
export const hoursPerDayNeeded = (targetHours, studyHours, examDate) => {
  if (!examDate) return null;
  const daysLeft = daysUntil(examDate);
  if (!daysLeft || daysLeft <= 0) return null;
  const remaining = Math.max(0, targetHours - studyHours);
  return (remaining / daysLeft).toFixed(1);
};
