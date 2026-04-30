import { useState } from "react";
import { Link } from "@tanstack/react-router";
import Streak from "./streak";

export const SiteMenu = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <Streak />
        <button
          onClick={() => setOpen(true)}
          className="border-2 border-black bg-black text-white font-black text-[10px] uppercase tracking-[0.3em] px-3 py-2 shadow-brutal hover:bg-white hover:text-black transition-colors"
        >
          MENU
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-black z-[100] flex flex-col transition-opacity duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="page-padding flex justify-end items-center pt-5 pb-4 border-b-2 border-white border-opacity-20 shrink-0">
          <button
            onClick={close}
            className="border-2 border-white text-white font-black text-[10px] uppercase tracking-[0.3em] px-3 py-2 hover:bg-white hover:text-black transition-colors"
          >
            LUKK ✕
          </button>
        </div>

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
      </div>
    </>
  );
};
