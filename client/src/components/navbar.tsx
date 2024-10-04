import { useNavigate } from "@tanstack/react-router";
import { useContext, useState, useEffect } from "react";
import { ColorContext } from "@/color-context";
import Logo from "@/components/logo";
import { useSearchContext } from "@/context/search-context";
import SearchBar from "./search-bar";
import { Navlink } from "./navlink";
import Streak from "./streak";
import { FaBars } from "react-icons/fa";
import Sidebar from "./sidebar";

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
    setSidebarOpen(false);
  };

  // Check if the screen size is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
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

      {isMobile && (
        <>
          <Sidebar
            sidebarOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
            color={color}
            query={query}
            setQuery={setQuery}
            handleSearch={handleSearch}
          />

          <div
            className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
              sidebarOpen ? "opacity-50" : "opacity-0 pointer-events-none"
            }`}
            onClick={closeSidebar}
          />
        </>
      )}
    </>
  );
};

export default Navbar;
