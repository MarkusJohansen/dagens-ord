import { createRootRoute, Outlet } from "@tanstack/react-router";
import { SiteMenu } from "../components/site-menu";
import { Toaster } from "react-hot-toast";

export const Route = createRootRoute({
  component: () => (
    <div className="h-screen flex flex-col overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      <SiteMenu />
      <div className="flex-1 overflow-y-auto flex flex-col">
        <Outlet />
      </div>
    </div>
  ),
});
