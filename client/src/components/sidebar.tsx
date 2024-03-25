import { useContext, useState } from "react";
import { SuggestionForm } from "./suggestionForm";
import { DisplaySidebarContext } from "../contexts/displaySidebarContext";

export const Sidebar = () => {
  const { displaySidebar, toggleSidebar } = useContext(DisplaySidebarContext);
  const [contentColor] = useState("white"); //TODO: exchange for a context value

  return (
    <div
      className={`h-screen w-1/4 absolute top-0 px-12 bg-dark-gray origin-left animate-slide-in ${
        !displaySidebar && "animate-slide-out"
      }`}
    >
      <button onClick={() => toggleSidebar()}>button</button>
      <div className="flex flex-col gap-20">
        <div>
          <h2 className={`text-${contentColor}`}>Bidra</h2>
          <hr className={`bg-${contentColor}`} />
          <p className={`text-${contentColor}`}>
            Vi ønsker dine ord og uttrykk! Gjerne send inn forslag til oss!
          </p>
        </div>
        <SuggestionForm />
      </div>
    </div>
  );
};
