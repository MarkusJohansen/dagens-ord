import { createLazyFileRoute } from "@tanstack/react-router";
import { useContext } from "react";
import { ColorContext } from "@/color-context";
import { SearchResults } from "@/components/search-results";

export const Route = createLazyFileRoute("/sok")({
  component: Index,
});

function Index() {
  const { color } = useContext(ColorContext);

  return (
    <div
      style={{
        backgroundColor: color,
      }}
      className=" min-h-screen flex flex-col"
    >
      <div className="page-padding flex-grow flex flex-col">
        <main className="flex-grow flex flex-col items-center justify-center ">
            <SearchResults />
        </main>
      </div>
    </div>
  );
}
