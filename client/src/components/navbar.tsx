import logo from "../img/logo.png";
import { useContext } from "react";
import { DisplaySidebarContext } from "../contexts/displaySidebarContext";
import { HamburgerButton } from "./hamburger-button";

const Navbar = () => {
  const { toggleSidebar } = useContext(DisplaySidebarContext);
  return (
    <nav className="flex flex-row w-full justify-between py-4">
      <HamburgerButton onClick={toggleSidebar} />
      <div className="text-black hover:text-black ml-auto flex flex-row items-center font-logo">
        <div className="h-full flex text-2xl font-bold">Dagens</div>
        <div className="mx-2">
          <img src={logo} alt="logo" className="w-12" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
