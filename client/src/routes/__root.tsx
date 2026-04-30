import { createRootRoute, Outlet, Link, useRouterState } from "@tanstack/react-router";
import { SiteMenu } from "../components/site-menu";
import { Toaster } from "react-hot-toast";

function SecretCorner() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isNsfw = pathname === "/nsfw";
  return (
    <Link
      to={isNsfw ? "/" : "/nsfw"}
      className="fixed top-0 left-0 w-10 h-10 z-50 opacity-0"
      aria-hidden="true"
    />
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
