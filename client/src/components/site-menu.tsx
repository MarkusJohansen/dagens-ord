import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useSearchContext } from "@/context/search-context";
import Streak from "./streak";

export const SiteMenu = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { search } = useSearchContext();
  const navigate = useNavigate();

  const close = () => setOpen(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    search(query);
    navigate({ to: "/sok" });
    setQuery("");
    close();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") close();
  };

  return (
    <>
      {/* Floating button — always visible */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <Streak />
        <button
          onClick={() => setOpen(true)}
          className="border-2 border-black bg-black text-white font-black text-[10px] uppercase tracking-[0.3em] px-3 py-2 shadow-brutal hover:bg-white hover:text-black transition-colors"
        >
          MENU
        </button>
      </div>

      {/* Full-screen overlay */}
      <div
        className={`fixed inset-0 bg-black z-[100] flex flex-col transition-opacity duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Close */}
        <div className="page-padding flex justify-between items-center pt-5 pb-4 border-b-2 border-white border-opacity-20 shrink-0">
          <span className="font-black text-[10px] uppercase tracking-[0.3em] text-white opacity-40">
            ★ DAGENS ORD
          </span>
          <button
            onClick={close}
            className="border-2 border-white text-white font-black text-[10px] uppercase tracking-[0.3em] px-3 py-2 hover:bg-white hover:text-black transition-colors"
          >
            LUKK ✕
          </button>
        </div>

        {/* Nav links — massive */}
        <nav className="page-padding flex-1 flex flex-col justify-center gap-0">
          {[
            { to: "/", label: "HJEM" },
            { to: "/om-prosjektet", label: "OM OSS" },
            { to: "/bidra", label: "BIDRA" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={close}
              className="font-black uppercase leading-[0.85] text-white block border-t-2 border-white border-opacity-10 py-4 hover:text-black hover:bg-white transition-colors px-2 -mx-2"
              style={{ fontSize: "clamp(3.5rem, 12vw, 11rem)" }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Search bar at the bottom */}
        <div className="page-padding pb-8 pt-4 border-t-2 border-white border-opacity-20 shrink-0">
          <p className="font-black text-[10px] uppercase tracking-[0.3em] text-white opacity-40 mb-3">
            SØK
          </p>
          <div className="flex">
            <input
              autoFocus={open}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="SKRIV HER..."
              className="flex-1 h-12 px-4 bg-transparent border-2 border-white text-white placeholder:text-white placeholder:opacity-30 font-black uppercase tracking-wide text-sm focus:outline-none focus:bg-white focus:text-black focus:placeholder:text-black transition-colors"
            />
            <button
              onClick={handleSearch}
              className="h-12 px-6 bg-white text-black font-black text-xs uppercase tracking-[0.2em] border-2 border-white border-l-0 hover:bg-black hover:text-white transition-colors"
            >
              SØK →
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
