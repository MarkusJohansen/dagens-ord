import { createRootRoute, Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import { SiteMenu } from "../components/site-menu";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

function SecretCorner() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const isNsfw = pathname === "/nsfw";
  const [showWarning, setShowWarning] = useState(false);

  const handleClick = () => {
    if (isNsfw) {
      navigate({ to: "/" });
    } else {
      setShowWarning(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="fixed top-0 left-0 w-10 h-10 z-50 opacity-0"
        aria-hidden="true"
      />
      {showWarning && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4">
          <div className="bg-brutal-yellow border-4 border-black shadow-brutal-lg w-full max-w-sm flex flex-col gap-5 p-6">
            <div className="flex flex-col gap-2">
              <span className="font-black uppercase tracking-widest text-xs text-gray-600">Advarsel</span>
              <p className="font-black text-xl uppercase leading-tight">Voksent innhold</p>
              <p className="text-sm font-medium mt-1">
                Denne seksjonen inneholder innhold som kan være upassende. Fortsett på eget ansvar.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                className="brutal-btn bg-white text-black flex-1"
                onClick={() => setShowWarning(false)}
              >
                Avbryt
              </button>
              <button
                className="brutal-btn bg-black text-white flex-1"
                onClick={() => { setShowWarning(false); navigate({ to: "/nsfw" }); }}
              >
                Fortsett →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export const Route = createRootRoute({
  component: () => (
    <div className="h-screen flex flex-col overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      <SiteMenu />
      <SecretCorner />
      <div className="flex-1 overflow-y-auto flex flex-col">
        <Outlet />
      </div>
    </div>
  ),
});
