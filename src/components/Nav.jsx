import { NavLink } from "react-router-dom";

const NAV = [
  { to:"/",         icon:"⚡", label:"Today"    },
  { to:"/habits",   icon:"🏆", label:"Habits"   },
  { to:"/projects", icon:"📦", label:"Projects" },
  { to:"/exams",    icon:"📚", label:"Exams"    },
  { to:"/content",  icon:"📱", label:"Content"  },
  { to:"/settings", icon:"⚙️", label:"Settings" },
];

export default function Nav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50"
      style={{background:"#0a0a0a", borderTop:"0.5px solid #1e1e1e"}}>
      <div className="flex max-w-lg mx-auto">
        {NAV.map(n=>(
          <NavLink key={n.to} to={n.to} end={n.to==="/"}
            className={({isActive})=>`flex-1 flex flex-col items-center py-2.5 gap-0.5 transition-all ${isActive?"opacity-100":"opacity-30"}`}>
            {({isActive})=>(
              <>
                <span className="text-base leading-none">{n.icon}</span>
                <span className="text-xs" style={{color:isActive?"#7f77dd":"#777",fontWeight:isActive?500:400}}>
                  {n.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
      <div style={{height:"env(safe-area-inset-bottom,0px)"}} />
    </nav>
  );
}
