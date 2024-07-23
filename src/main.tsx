import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import "chimeracss/build/chimera-plain.css";
import { ColorProvider } from "@/color-context";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ColorProvider>
        <RouterProvider router={router} />
      </ColorProvider>
    </StrictMode>
  );
}
