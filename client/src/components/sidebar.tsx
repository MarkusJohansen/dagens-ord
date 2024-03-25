import { useContext } from "react";
import { SuggestionForm } from "./suggestionForm";
import { DisplaySidebarContext } from "../contexts/displaySidebarContext";
import { ColorContext } from "../contexts/colorContext";

export const Sidebar = () => {
  const { displaySidebar, toggleSidebar } = useContext(DisplaySidebarContext);
  const { color } = useContext(ColorContext);
  return (
    <div
      className={`h-screen w-1/4 absolute top-0 px-12 bg-dark-gray origin-left animate-slide-in ${
        !displaySidebar && "animate-slide-out"
      }`}
    >
      <button onClick={() => toggleSidebar()}>button</button>
      <div className="flex flex-col gap-20">
        <div>
          <h2 className={`text-${color}`}>Bidra</h2>
          <hr className={`bg-${color}`} />
          <p className={`text-${color}`}>
            Vi ønsker dine ord og uttrykk! Gjerne send inn forslag til oss!
          </p>
        </div>
        <SuggestionForm />
      </div>
    </div>
  );
};
