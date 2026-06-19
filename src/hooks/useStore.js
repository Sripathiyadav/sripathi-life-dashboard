import { useState, useCallback } from "react";
import { todayKey, PROJECTS, EXAM_SUBJECTS } from "../data/constants";

const KEYS = {
  totalXP: "sri_total_xp",
  streak: "sri_streak",
  lastActive: "sri_last_active",
  projects: "sri_projects",
  exams: "sri_exams",
  content: "sri_content",
  weeklyReviews: "sri_weekly_reviews",
  day: () => "sri_day_" + todayKey(),
};

function load(key, fallback) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function save(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* quota / private mode */ }
}

export function useStore() {
  const [totalXP, setTotalXPState] = useState(() => load(KEYS.totalXP, 0));
  const [streak, setStreakState] = useState(() => {
    const loaded = load(KEYS.streak, 0);
    const last = load(KEYS.lastActive, null);
    if (!last) return loaded;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yKey = yesterday.toISOString().slice(0, 10);
    if (last !== todayKey() && last !== yKey) return 0;
    return loaded;
  });
  const [dayData, setDayDataState] = useState(() => load(KEYS.day(), { mode: null, checked: {} }));
  const [projects, setProjectsState] = useState(() => load(KEYS.projects, PROJECTS));
  const [exams, setExamsState] = useState(() => load(KEYS.exams, EXAM_SUBJECTS));
  const [contentItems, setContentState] = useState(() => load(KEYS.content, []));
  const [weeklyReviews, setWeeklyState] = useState(() => load(KEYS.weeklyReviews, []));
  const [levelUpInfo, setLevelUpInfo] = useState(null);

  const setTotalXP = useCallback((val) => { setTotalXPState(val); save(KEYS.totalXP, val); }, []);
  const setStreak = useCallback((val) => { setStreakState(val); save(KEYS.streak, val); }, []);
  const setDayData = useCallback((val) => { setDayDataState(val); save(KEYS.day(), val); }, []);
  const setProjects = useCallback((val) => { setProjectsState(val); save(KEYS.projects, val); }, []);
  const setExams = useCallback((val) => { setExamsState(val); save(KEYS.exams, val); }, []);
  const setContent = useCallback((val) => { setContentState(val); save(KEYS.content, val); }, []);
  const setWeekly = useCallback((val) => { setWeeklyState(val); save(KEYS.weeklyReviews, val); }, []);

  const selectMode = useCallback((mode) => {
    const last = load(KEYS.lastActive, null);
    const today = todayKey();
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
    const yKey = yesterday.toISOString().slice(0, 10);
    if (last !== today) {
      const newStreak = (last === yKey) ? streak + 1 : 1;
      setStreak(newStreak);
      save(KEYS.lastActive, today);
    }
    setDayData({ mode, checked: {} });
  }, [streak, setStreak, setDayData]);

  const toggleHabit = useCallback((habit) => {
    const wasChecked = !!dayData.checked[habit.id];
    const newChecked = { ...dayData.checked, [habit.id]: !wasChecked };
    const xpDelta = wasChecked ? -habit.xp : habit.xp;
    const prevXP = totalXP;
    const newXP = Math.max(0, totalXP + xpDelta);

    // Level up detection
    const prevLvl = [0,100,300,600,1000,1500].filter(t => prevXP > t).length;
    const newLvl  = [0,100,300,600,1000,1500].filter(t => newXP  > t).length;
    if (newLvl > prevLvl) {
      const badges = ["Seedling","Spark","Live Wire","Iron Will","Launch Mode","Saturn Slayer"];
      setLevelUpInfo({ level: newLvl + 1, badge: badges[newLvl] });
      setTimeout(() => setLevelUpInfo(null), 3000);
    }
    setTotalXP(newXP);
    setDayData({ ...dayData, checked: newChecked });
  }, [dayData, totalXP, setTotalXP, setDayData]);

  const updateProject = useCallback((id, patch) => {
    const updated = projects.map(p => p.id === id ? { ...p, ...patch } : p);
    setProjects(updated);
  }, [projects, setProjects]);

  const updateExam = useCallback((id, patch) => {
    const updated = exams.map(e => e.id === id ? { ...e, ...patch } : e);
    setExams(updated);
  }, [exams, setExams]);

  const addContent = useCallback((item) => {
    const updated = [{ ...item, id: Date.now(), createdAt: todayKey() }, ...contentItems];
    setContent(updated);
  }, [contentItems, setContent]);

  const updateContent = useCallback((id, patch) => {
    setContent(contentItems.map(c => c.id === id ? { ...c, ...patch } : c));
  }, [contentItems, setContent]);

  const deleteContent = useCallback((id) => {
    setContent(contentItems.filter(c => c.id !== id));
  }, [contentItems, setContent]);

  const saveWeeklyReview = useCallback((review) => {
    const existing = weeklyReviews.findIndex(r => r.week === review.week);
    const updated = existing >= 0
      ? weeklyReviews.map((r, i) => i === existing ? review : r)
      : [review, ...weeklyReviews];
    setWeekly(updated);
  }, [weeklyReviews, setWeekly]);

  return {
    totalXP, streak, dayData, projects, exams, contentItems, weeklyReviews, levelUpInfo,
    selectMode, toggleHabit, updateProject, updateExam,
    addContent, updateContent, deleteContent, saveWeeklyReview,
  };
}
