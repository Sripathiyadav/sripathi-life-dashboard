import { useRef } from "react";
import { Card, Label, SectionHeader } from "../components/UI";

export default function Settings({ appState }) {
  const { exportData, importData, totalXP, streak } = appState;
  const fileRef = useRef();

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) importData(file);
  };

  const handleReset = () => {
    if (window.confirm("⚠️ This will delete ALL your data — XP, streaks, exams, everything. Are you sure?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-3 pb-6">
      <SectionHeader title="⚙️ Settings" sub="Backup · restore · data" />

      <Card style={{borderLeft:"2px solid #7f77dd"}}>
        <div className="text-xs text-gray-400 leading-relaxed">
          <span className="text-white font-medium">Why backup matters:</span> All your data lives in your browser's localStorage. If you clear browser data, switch devices, or reinstall Windows — it's gone. Export weekly as insurance.
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-2">
        <Card className="text-center">
          <div className="text-2xl font-bold text-purple-400">{totalXP}</div>
          <div className="text-xs text-gray-500 mt-1">total XP</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-amber-400">{streak}🔥</div>
          <div className="text-xs text-gray-500 mt-1">day streak</div>
        </Card>
      </div>

      <Card>
        <Label>Backup data</Label>
        <p className="text-xs text-gray-500 mb-3">Downloads a JSON file with all your XP, habits, exams, projects, content, and reviews. Save it to Google Drive or your phone.</p>
        <button onClick={exportData} className="btn-primary w-full">
          📥 Export backup JSON
        </button>
      </Card>

      <Card>
        <Label>Restore from backup</Label>
        <p className="text-xs text-gray-500 mb-3">Upload a previously exported JSON file. This will merge with your current data.</p>
        <input ref={fileRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
        <button onClick={() => fileRef.current?.click()} className="btn-ghost w-full">
          📤 Import backup JSON
        </button>
      </Card>

      <Card>
        <Label>Firebase migration (later)</Label>
        <p className="text-xs text-gray-500">
          When you're ready to move data to Firebase (after exams), you'll only need to edit <code className="text-gray-400 bg-gray-900 px-1 rounded">src/hooks/useStorage.js</code> — swap localStorage calls for Firestore. The rest of the app stays identical.
        </p>
      </Card>

      <Card style={{borderLeft:"2px solid #E24B4A"}}>
        <Label>Danger zone</Label>
        <p className="text-xs text-gray-500 mb-3">Wipes all data. Export a backup first.</p>
        <button onClick={handleReset}
          className="w-full text-xs py-2 rounded-lg border border-red-900 text-red-500 hover:bg-red-900 hover:text-red-300 transition-all">
          🗑️ Reset all data
        </button>
      </Card>
    </div>
  );
}
