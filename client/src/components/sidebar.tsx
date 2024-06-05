import { useContext } from "react";
import { SuggestionForm } from "./suggestionForm";
import { DisplaySidebarContext } from "../contexts/displaySidebarContext";
import { ColorContext } from "../contexts/colorContext";
import clsx from "clsx";

export const Sidebar = () => {
  const { displaySidebar } = useContext(DisplaySidebarContext);
  const { color } = useContext(ColorContext);
  return (
    <div
      className={clsx(
        "z-0 min-h-full w-fit absolute top-0 bg-dark-gray origin-left animate-slide-in",
        !displaySidebar && "animate-slide-out block",
        "py-10 px-10 md:px-20 lg:px-40 "
      )}
    >
      <div className="flex flex-col gap-10">
        <div>
          <h1 style={{ color: color }} className="font-logo text-3xl">
            Bidra
          </h1>
          <hr style={{ backgroundColor: color }} />
          <p style={{ color: color }}>
            Vi ønsker dine ord og uttrykk! Gjerne send inn forslag til oss!
          </p>
        </div>
        <SuggestionForm />
      </div>
    </div>
  );
};
