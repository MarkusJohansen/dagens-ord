import { createLazyFileRoute } from "@tanstack/react-router";
import { useContext } from "react";
import { ColorContext } from "@/color-context";
import { SearchResults } from "@/components/search-results";

export const Route = createLazyFileRoute("/sok")({
  component: Search,
});

function Search() {
  const { color } = useContext(ColorContext);

  return (
    <div
      style={{ backgroundColor: color }}
      className="flex flex-col flex-1 h-full"
    >
      <div className="page-padding border-b-2 border-black flex items-center py-2 shrink-0">
        <span className="font-black text-[10px] uppercase tracking-[0.3em] opacity-60">
          SØKERESULTATER
        </span>
      </div>
      <div className="page-padding flex-1 flex flex-col items-start justify-start py-10">
        <SearchResults />
      </div>
    </div>
  );
}
