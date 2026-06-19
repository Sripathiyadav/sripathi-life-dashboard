import { useState } from "react";

import { Card, Label, SectionHeader, Badge, EmptyState, NotionLink } from "../components/UI";
import { CONTENT_IDEAS, CONTENT_PILLARS, NOTION_LINKS } from "../data/constants";

const STATUSES = ["💡 Idea","✍️ Scripted","🎬 Filmed","✂️ Edited","✅ Posted"];
const FORMATS = ["Reel","YT Short","Carousel","Story","Long video"];
const PILLAR_COLORS = { tech:"#7f77dd", life:"#1D9E75", career:"#BA7517" };

export default function Content({ appState }) {
  const { contentItems, addContentItem, updateContentItem, deleteContentItem } = appState;
  const [tab, setTab] = useState("pipeline");
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState({ title:"", pillar:"tech", format:"Reel", status:"💡 Idea", platform:"IG" });

  const handleAdd = () => {
    if (!newItem.title.trim()) return;
    addContentItem(newItem);
    setNewItem({ title:"", pillar:"tech", format:"Reel", status:"💡 Idea", platform:"IG" });
    setShowAdd(false);
  };

  const grouped = STATUSES.reduce((acc, s) => {
    acc[s] = contentItems.filter(i => i.status === s);
    return acc;
  }, {});

  const [weekStart] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toISOString().slice(0, 10);
  });

  const weeklyStats = {
    posted: contentItems.filter(i => i.status === "✅ Posted" && i.createdAt >= weekStart).length,
    inProgress: contentItems.filter(i => i.status !== "✅ Posted" && i.status !== "💡 Idea").length,
    ideas: contentItems.filter(i => i.status === "💡 Idea").length,
  };

  return (
    <div className="space-y-3 pb-6">
      <SectionHeader title="📱 Content Pipeline" sub="New IG + YT — Tech & Life abroad angle" />
      <NotionLink href={NOTION_LINKS.content} label="Open Content Strategy in Notion" />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label:"Posted this week", value: weeklyStats.posted, color:"#639922" },
          { label:"In progress", value: weeklyStats.inProgress, color:"#BA7517" },
          { label:"Ideas banked", value: weeklyStats.ideas, color:"#7f77dd" },
        ].map(s => (
          <Card key={s.label} className="text-center">
            <div className="text-2xl font-semibold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-1 leading-tight">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Target reminder */}
      <Card style={{ borderColor: "#1D9E7555" }}>
        <div className="text-xs text-gray-400 leading-relaxed">
          🎯 <span className="text-white font-medium">Weekly target:</span> 2× IG posts + 1× YT Short · Batch film on free days · 3 pillars: Tech, Life in 🇩🇪, Career
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2">
        {["pipeline","ideas","strategy"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="text-xs px-3 py-1.5 rounded-lg capitalize transition-all"
            style={{ background: tab===t ? "#7f77dd" : "#1a1a1a", color: tab===t ? "#fff" : "#666" }}>
            {t}
          </button>
        ))}
      </div>

      {/* Pipeline tab */}
      {tab === "pipeline" && (
        <>
          <button onClick={() => setShowAdd(!showAdd)} className="btn-primary w-full">
            + Add content piece
          </button>

          {showAdd && (
            <Card>
              <Label>New piece</Label>
              <div className="space-y-2">
                <input value={newItem.title} onChange={e => setNewItem({...newItem, title:e.target.value})}
                  placeholder="Title / idea..."
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg p-2 text-sm text-gray-200 focus:outline-none focus:border-gray-600" />
                <div className="grid grid-cols-2 gap-2">
                  <select value={newItem.pillar} onChange={e => setNewItem({...newItem, pillar:e.target.value})}
                    className="bg-gray-900 border border-gray-800 rounded-lg p-2 text-xs text-gray-300">
                    {CONTENT_PILLARS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                  </select>
                  <select value={newItem.format} onChange={e => setNewItem({...newItem, format:e.target.value})}
                    className="bg-gray-900 border border-gray-800 rounded-lg p-2 text-xs text-gray-300">
                    {FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                  <select value={newItem.platform} onChange={e => setNewItem({...newItem, platform:e.target.value})}
                    className="bg-gray-900 border border-gray-800 rounded-lg p-2 text-xs text-gray-300">
                    <option value="IG">Instagram</option>
                    <option value="YT">YouTube</option>
                    <option value="Both">Both</option>
                  </select>
                  <select value={newItem.status} onChange={e => setNewItem({...newItem, status:e.target.value})}
                    className="bg-gray-900 border border-gray-800 rounded-lg p-2 text-xs text-gray-300">
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleAdd} className="btn-primary flex-1">Add</button>
                  <button onClick={() => setShowAdd(false)} className="btn-ghost flex-1">Cancel</button>
                </div>
              </div>
            </Card>
          )}

          {contentItems.length === 0 && (
            <EmptyState emoji="🎬" title="No content yet" sub="Add your first piece above" />
          )}

          {STATUSES.map(status => {
            const items = grouped[status] || [];
            if (items.length === 0) return null;
            return (
              <div key={status}>
                <div className="text-xs text-gray-500 mb-2 px-1">{status} ({items.length})</div>
                <div className="space-y-2">
                  {items.map(item => (
                    <Card key={item.id}>
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-white">{item.title}</div>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <Badge color={PILLAR_COLORS[item.pillar] || "#555"}>{item.pillar}</Badge>
                            <span className="text-xs text-gray-600">{item.format}</span>
                            <span className="text-xs text-gray-600">{item.platform}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <select value={item.status}
                            onChange={e => updateContentItem(item.id, { status: e.target.value })}
                            className="bg-gray-900 border border-gray-800 rounded text-xs p-1 text-gray-400">
                            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <button onClick={() => deleteContentItem(item.id)}
                            className="text-xs text-gray-700 hover:text-red-500 text-right">delete</button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </>
      )}

      {/* Ideas bank */}
      {tab === "ideas" && (
        <div className="space-y-2">
          <div className="text-xs text-gray-500 mb-3">Pre-loaded ideas — tap to add to pipeline</div>
          {CONTENT_IDEAS.map((idea, i) => (
            <Card key={i}>
              <div className="flex items-center gap-3">
                <Badge color={PILLAR_COLORS[idea.pillar] || "#555"}>{idea.pillar}</Badge>
                <div className="flex-1 text-sm text-gray-300">{idea.title}</div>
                <span className="text-xs text-gray-600">{idea.format}</span>
                <button onClick={() => {
                  addContentItem({ title:idea.title, pillar:idea.pillar, format:idea.format, status:"💡 Idea", platform: idea.format.includes("YT") ? "YT" : "IG" });
                  setTab("pipeline");
                }} className="text-xs text-purple-400 hover:text-purple-300">+ Add</button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Strategy */}
      {tab === "strategy" && (
        <div className="space-y-3">
          <Card>
            <Label>Account setup checklist</Label>
            <div className="space-y-2 text-sm">
              {[
                "Create new Instagram (@sripathi.dev or similar)",
                "Create YouTube channel — same name as IG",
                "Bio: Flutter dev | M.Eng in Germany 🇩🇪 | Indian dev abroad journey",
                "Profile photo: clean, well-lit (use your photography skills)",
                "Link in bio: portfolio site",
                "First 3 posts ready BEFORE going public",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-gray-400">
                  <span className="text-gray-700 flex-shrink-0">□</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <Label>3 content pillars — rotate weekly</Label>
            {CONTENT_PILLARS.map(p => (
              <div key={p.id} className="mb-3">
                <div className="text-sm font-medium mb-1" style={{ color: PILLAR_COLORS[p.id] }}>{p.label}</div>
                {p.examples.map((ex, i) => (
                  <div key={i} className="text-xs text-gray-500 py-0.5">• {ex}</div>
                ))}
              </div>
            ))}
          </Card>
          <Card>
            <Label>Hashtag strategy</Label>
            <div className="space-y-2 text-xs text-gray-400">
              <div><span className="text-gray-300">Tech:</span> #FlutterDev #MobileDev #DartLang #TechInGermany #IndianDeveloper</div>
              <div><span className="text-gray-300">Life:</span> #IndianInGermany #StudentInGermany #LifeAbroad #GermanyLife</div>
              <div><span className="text-gray-300">Career:</span> #Werkstudent #JobInGermany #TechCareer #DeveloperLife</div>
              <div className="text-gray-600 pt-1">Mix 5–6 niche + 2–3 broad. Don't use 30 — it looks like spam.</div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
