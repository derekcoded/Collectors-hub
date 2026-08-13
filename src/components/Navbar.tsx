import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/marketplace", label: "Marketplace" },
  { to: "/community", label: "Community Feed" },
  { to: "/collection", label: "My Collection" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-800 bg-ink-900 text-paper-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <NavLink to="/marketplace" className="flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-display text-xl font-semibold tracking-tight">Collector's Hub</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-brass-400 sm:inline">Est. Catalog</span>
        </NavLink>

        <nav className="hidden gap-1 sm:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-sm px-3 py-2 text-sm font-medium transition ${
                  isActive ? "bg-paper-50 text-ink-900" : "text-paper-100 hover:bg-ink-800"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-sm border border-ink-700 sm:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="font-mono text-lg leading-none">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-ink-800 px-4 py-3 sm:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-sm px-3 py-2 text-sm font-medium ${isActive ? "bg-paper-50 text-ink-900" : "text-paper-100 hover:bg-ink-800"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
