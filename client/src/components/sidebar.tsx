import { useContext } from "react";
import { SuggestionForm } from "./suggestionForm";
import { DisplaySidebarContext } from "../contexts/displaySidebarContext";
import { ColorContext } from "../contexts/colorContext";

export const Sidebar = () => {
  const { displaySidebar } = useContext(DisplaySidebarContext);
  const { color } = useContext(ColorContext);
  return (
    <div
      className={` z-0 h-screen w-full md:w-1/2 2xl:w-1/4 absolute top-0 px-12 bg-dark-gray origin-left animate-slide-in ${
        !displaySidebar && "animate-slide-out block"
      }`}
    >
      <div className="flex flex-col gap-20">
        <div>
          <h2 style={{ color: color }} className="font-logo">
            Bidra
          </h2>
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
