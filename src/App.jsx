import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppState } from "./hooks/useStorage";
import Nav from "./components/Nav";
import Today from "./pages/Today";
import Habits from "./pages/Habits";
import Projects from "./pages/Projects";
import Content from "./pages/Content";
import Exams from "./pages/Exams";
import Weekly from "./pages/Weekly";
import Settings from "./pages/Settings";
import Auth from "./components/Auth";

export default function App() {
  const appState = useAppState();

  return (
    <Auth>
      <BrowserRouter>
        <div
          className="max-w-lg mx-auto px-3 pt-4"
          style={{ paddingBottom: "90px" }}
        >
          <Routes>
            <Route path="/" element={<Today appState={appState} />} />
            <Route path="/habits" element={<Habits appState={appState} />} />
            <Route path="/projects" element={<Projects appState={appState} />} />
            <Route path="/exams" element={<Exams appState={appState} />} />
            <Route path="/content" element={<Content appState={appState} />} />
            <Route path="/weekly" element={<Weekly appState={appState} />} />
            <Route path="/settings" element={<Settings appState={appState} />} />
          </Routes>
        </div>
        <Nav />
      </BrowserRouter>
    </Auth>
  );
}