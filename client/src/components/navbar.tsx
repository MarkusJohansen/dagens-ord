import { useNavigate } from "@tanstack/react-router";
import { useContext, useState, useEffect } from "react";
import { ColorContext } from "@/color-context";
import { useSearchContext } from "@/context/search-context";
import SearchBar from "./search-bar";
import { Navlink } from "./navlink";
import Streak from "./streak";
import { FaBars } from "react-icons/fa";
import Sidebar from "./sidebar";
import { Link } from "@tanstack/react-router";

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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav
        style={{ backgroundColor: color }}
        className="border-b-4 border-black shrink-0"
      >
        <div className="page-padding h-12 flex items-center justify-between">
          <Link to="/" className="font-black text-xs uppercase tracking-[0.25em] text-black hover:opacity-60 transition-opacity">
            ★ DAGENS ORD
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Navlink to="/om-prosjektet" label="Om prosjektet" />
            <Navlink to="/bidra" label="Bidra" />
            <Streak />
            <SearchBar
              query={query}
              setQuery={setQuery}
              handleSearch={handleSearch}
              color={color}
            />
          </div>

          {isMobile && (
            <div className="flex items-center gap-3">
              <Streak />
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="border-2 border-black p-1.5 shadow-brutal-sm bg-black text-white active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
              >
                <FaBars className="text-base" />
              </button>
            </div>
          )}
        </div>
      </nav>

      {isMobile && (
        <>
          <Sidebar
            sidebarOpen={sidebarOpen}
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            color={color}
            query={query}
            setQuery={setQuery}
            handleSearch={handleSearch}
          />
          <div
            className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
              sidebarOpen ? "opacity-60" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setSidebarOpen(false)}
          />
        </>
      )}
    </>
  );
};

export default Navbar;
