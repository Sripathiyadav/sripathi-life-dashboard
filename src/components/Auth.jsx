import { useState } from "react";

const PASSWORD = "8790"; // change this to your own password

export default function Auth({ children }) {
  const [unlocked, setUnlocked] = useState(() => {
    return sessionStorage.getItem("sri_auth") === "yes";
  });
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  if (unlocked) return children;

  const handleSubmit = () => {
    if (input === PASSWORD) {
      sessionStorage.setItem("sri_auth", "yes");
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "#0a0a0a" }}>
      <div className="w-full max-w-xs">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">⚡</div>
          <div className="text-xl font-semibold text-white">Sri OS</div>
          <div className="text-xs text-gray-500 mt-1">Personal command center</div>
        </div>
        <div className="space-y-3">
          <input
            type="password"
            value={input}
            onChange={e => { setInput(e.target.value); setError(false); }}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            placeholder="Enter password"
            autoFocus
            className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-sm text-gray-200 focus:outline-none focus:border-purple-500 text-center tracking-widest"
          />
          {error && (
            <div className="text-xs text-red-400 text-center">Wrong password</div>
          )}
          <button onClick={handleSubmit} className="btn-primary w-full">
            Unlock
          </button>
        </div>
      </div>
    </div>
  );
}
