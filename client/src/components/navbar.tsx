import { RxHamburgerMenu } from "react-icons/rx";
import logo from "../img/logo.png";
import { useContext } from "react";
import { DisplaySidebarContext } from "../contexts/displaySidebarContext";

const Navbar = () => {
  const { toggleSidebar } = useContext(DisplaySidebarContext);
  return (
    <nav className="flex flex-row w-full justify-between py-4">
      <button onClick={toggleSidebar}>show sidebar</button>
      <RxHamburgerMenu size={35} />
      <a
        href="/"
        className="text-black hover:text-black ml-auto flex flex-row items-center font-logo"
      >
        <div className="h-full flex text-2xl font-bold">Dagens</div>
        <div className="mx-2">
          <img src={logo} alt="logo" className="w-12" />
        </div>
      </a>
    </nav>
  );
};

export default Navbar;
