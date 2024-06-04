import React, { createContext, useContext, useState } from "react";
import { ColorContext } from "./colorContext";

type DisplaySidebarContextType = {
  displaySidebar: boolean;
  toggleSidebar: () => void;
};

export const DisplaySidebarContext = createContext<DisplaySidebarContextType>({
  displaySidebar: false,
  toggleSidebar: () => {},
});

export const DisplaySidebarProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [displaySidebar, setDisplaySidebar] = useState(false);

  const toggleSidebar = () => {
    setDisplaySidebar(!displaySidebar);
    document
      .getElementById("hamburger-button")!
      .classList.toggle("toggle-button");
  };

  return (
    <DisplaySidebarContext.Provider value={{ displaySidebar, toggleSidebar }}>
      {children}
    </DisplaySidebarContext.Provider>
  );
};
