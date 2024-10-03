import { useNavigate } from "@tanstack/react-router";
import { useContext, useState, useEffect } from "react";
import { ColorContext } from "@/color-context";
import Logo from "@/components/logo";
import { useSearchContext } from "@/context/search-context";
import SearchBar from "./search-bar";
import { Navlink } from "./navlink";
import Streak from "./streak";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const { color } = useContext(ColorContext);
  const navigate = useNavigate({ from: "/" });
  const [query, setQuery] = useState<string>("");
  const { search } = useSearchContext();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleSearch = () => {
    search(query);
    navigate({ to: "/sok" });
  };

  // Check if the screen size is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Initialize the state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <nav style={{ backgroundColor: color }}>
        <div className="page-padding py-2 flex flex-row w-full justify-between items-center">
          <div className="flex items-center gap-14">
            <Logo onClick={() => setSidebarOpen(false)} />
            <div className="hidden md:flex gap-6">
              <Navlink to="/om-prosjektet" label="Om prosjektet" />
              <Navlink to="/bidra" label="Bidra" />
            </div>
          </div>
          <div className="hidden md:flex">
            <Streak />
            <SearchBar
              query={query}
              setQuery={setQuery}
              handleSearch={handleSearch}
              color={color}
            />
          </div>
          {/* Hamburger Button for Mobile */}
          {isMobile && (
            <div className="flex">
              <Streak />
              <button style={{ color: color }} onClick={toggleSidebar}>
                <FaBars className="text-xl" />
              </button>
            </div>
          )}

        </div>
        <hr className="w-full m-0" />
      </nav>

      {/* Sidebar for Mobile */}
      {isMobile && (
        <Sidebar
          style={{
            position: "fixed",
            backgroundColor: color,
          }}
          className={`h-screen top-0 right-0 transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <Menu>
            <MenuItem>
            {/* Fikse så den lukker seg når du søker */}
              <SearchBar
                query={query}
                setQuery={setQuery}
                handleSearch={handleSearch}
                color={color}
              />
            </MenuItem>
            <MenuItem onClick={toggleSidebar}>
              <Navlink to="/om-prosjektet" label="Om prosjektet" />
            </MenuItem>
            <MenuItem onClick={toggleSidebar}>
              <Navlink to="/bidra" label="Bidra" />
            </MenuItem>
            <MenuItem onClick={toggleSidebar}>
              <button onClick={toggleSidebar} className="text-sm">
                Lukk
              </button>
            </MenuItem>
          </Menu>
          <div>
          </div>
        </Sidebar>
      )}
    </>
  );
};

export default Navbar;
