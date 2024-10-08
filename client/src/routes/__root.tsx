import { createRootRoute, Outlet } from "@tanstack/react-router";
import Navbar from "../components/navbar";
import { Toaster } from "react-hot-toast";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Outlet />
    </div>
  ),
});
