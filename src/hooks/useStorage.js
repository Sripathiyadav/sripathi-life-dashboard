import { useState, useEffect } from "react";

// Firebase-ready architecture — to migrate later, replace the localStorage
// calls below with Firestore reads/writes. The hook interface stays identical.

/** Normalize legacy array or null localStorage values into an id-keyed map. */
export function normalizeIdMap(value, fallback = {}) {
  if (value == null || typeof value !== "object") return fallback;
  if (Array.isArray(value)) {
    return Object.fromEntries(
      value.filter((item) => item && item.id).map((item) => [item.id, item])
    );
  }
  return value;
}

export function useStorage(key, defaultValue, normalize) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      const parsed = stored !== null ? JSON.parse(stored) : defaultValue;
      return normalize ? normalize(parsed) : parsed;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // localStorage may be unavailable (private mode, quota exceeded)
    }
  }, [key, value]);

  return [value, setValue];
}

export function useAppState() {
  const todayKey = new Date().toISOString().slice(0, 10);

  const [totalXP, setTotalXP]             = useStorage("sri_total_xp", 0);
  const [streak, setStreak]               = useStorage("sri_streak", 0);
  const [lastActive, setLastActive]       = useStorage("sri_last_active", "");
  const [dayData, setDayData]             = useStorage(`sri_day_${todayKey}`, { mode: null, checked: {} });
  const [projects, setProjects]           = useStorage("sri_projects", {}, normalizeIdMap);
  const [examSubjects, setExamSubjects]   = useStorage("sri_exams", {}, normalizeIdMap);
  const [contentItems, setContentItems]   = useStorage("sri_content", []);
  const [weeklyReviews, setWeeklyReviews] = useStorage("sri_reviews", []);
  const [weekXPLog, setWeekXPLog]         = useStorage("sri_week_xp", {});

  // streak check on mount
  useEffect(() => {
    if (!lastActive || lastActive === todayKey) return;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (lastActive < yesterday.toISOString().slice(0, 10)) {
      setStreak(0);
    }
  }, [lastActive, setStreak, todayKey]);

  // auto-log XP per week
  const getWeekKey = () => {
    const d = new Date();
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(new Date().setDate(diff)).toISOString().slice(0, 10);
  };

  const selectMode = (mode) => {
    const prev = dayData.mode;
    if (prev !== mode) {
      setDayData({ mode, checked: {} });
    }
    if (lastActive !== todayKey) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      setStreak(s => lastActive === yesterday.toISOString().slice(0, 10) ? s + 1 : 1);
      setLastActive(todayKey);
    }
  };

  const toggleHabit = (habitId, xp) => {
    const wasChecked = !!dayData.checked[habitId];
    const delta = wasChecked ? -xp : xp;
    setDayData(d => ({ ...d, checked: { ...d.checked, [habitId]: !wasChecked } }));
    setTotalXP(x => Math.max(0, x + delta));
    // track weekly XP
    const wk = getWeekKey();
    setWeekXPLog(log => ({ ...log, [wk]: Math.max(0, (log[wk] || 0) + delta) }));
  };

  const resetDay = () => setDayData({ mode: null, checked: {} });

  const updateProject = (id, updates) => {
    setProjects(prev => ({
      ...prev,
      [id]: { ...(prev[id] || {}), ...updates, lastUpdated: new Date().toISOString().slice(0,10) }
    }));
  };

  const updateExam = (id, updates) => {
    setExamSubjects(prev => ({ ...prev, [id]: { ...(prev[id] || {}), ...updates } }));
  };

  const addContentItem = (item) => {
    setContentItems(prev => [{ ...item, id: Date.now(), createdAt: todayKey }, ...prev]);
  };

  const updateContentItem = (id, updates) => {
    setContentItems(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  const deleteContentItem = (id) => {
    setContentItems(prev => prev.filter(i => i.id !== id));
  };

  const saveWeeklyReview = (review) => {
    setWeeklyReviews(prev => {
      const filtered = prev.filter(r => r.weekKey !== review.weekKey);
      return [review, ...filtered].slice(0, 12);
    });
  };

  // Export all data to JSON
  const exportData = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      version: "2.0",
      totalXP, streak, lastActive,
      dayData, projects, examSubjects,
      contentItems, weeklyReviews, weekXPLog,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sri-os-backup-${todayKey}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import data from JSON
  const importData = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.totalXP !== undefined) setTotalXP(data.totalXP);
        if (data.streak !== undefined) setStreak(data.streak);
        if (data.projects) setProjects(normalizeIdMap(data.projects));
        if (data.examSubjects) setExamSubjects(normalizeIdMap(data.examSubjects));
        if (data.contentItems) setContentItems(data.contentItems);
        if (data.weeklyReviews) setWeeklyReviews(data.weeklyReviews);
        if (data.weekXPLog) setWeekXPLog(data.weekXPLog);
        alert("✅ Data imported successfully!");
      } catch { alert("❌ Invalid backup file."); }
    };
    reader.readAsText(file);
  };

  return {
    totalXP, streak, dayData, weekXPLog,
    projects, examSubjects, contentItems, weeklyReviews,
    selectMode, toggleHabit, resetDay,
    updateProject, updateExam,
    addContentItem, updateContentItem, deleteContentItem,
    saveWeeklyReview, exportData, importData,
    getWeekKey,
  };
}
