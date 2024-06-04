import { useContext } from "react";
import { ColorContext } from "../contexts/colorContext";
import { DisplaySidebarContext } from "../contexts/displaySidebarContext";
import { clsx } from "clsx";

interface HamburgerButtonProps {
  onClick: () => void;
}

export const HamburgerButton = ({ onClick }: HamburgerButtonProps) => {
  const { displaySidebar } = useContext(DisplaySidebarContext);
  const { color } = useContext(ColorContext);

  return (
    <button
      onClick={onClick}
      id="hamburger-button"
      className="relative h-8 w-8 hover:cursor-pointer p-0 rounded bg-transparent hover:bg-semi-transparent z-50"
    >
      <div
        style={{ "--color": color } as React.CSSProperties}
        id="hamburger-button-lines"
        className={clsx(
          "w-8 h-1 rounded absolute top-4 -mt-0.5 transition-all duration-500",
          "before:content-[''] before:w-8 before:h-1 before:rounded before:absolute before:transition-all before:duration-500 before:-translate-x-4 before:-translate-y-3",
          "after:content-[''] after:w-8 after:h-1 after:rounded after:absolute after:transition-all after:duration-500 after:-translate-x-4 after:translate-y-3",
          displaySidebar
            ? "before:bg-[var(--color)] after:bg-[var(--color)]"
            : "bg-dark-gray before:bg-dark-gray after:bg-dark-gray"
        )}
      ></div>
    </button>
  );
};
