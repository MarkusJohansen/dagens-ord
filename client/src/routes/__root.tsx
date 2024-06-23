import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Navbar from "../components/navbar";
import { Toaster } from "react-hot-toast";

export const Route = createRootRoute({
  component: () => (
    <div className="flex-col">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
