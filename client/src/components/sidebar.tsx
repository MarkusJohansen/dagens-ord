import { Dispatch, SetStateAction } from "react";
import { Navlink } from "./navlink";
import SearchBar from "./search-bar";

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  color: string;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  handleSearch: () => void;
}

const Sidebar = ({
  sidebarOpen,
  toggleSidebar,
  color,
  query,
  setQuery,
  handleSearch,
}: SidebarProps) => {
  return (
    <div
      className={`fixed top-0 right-0 h-screen bg-white z-50 transition-transform duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{
        backgroundColor: color,
      }}
    >
      <div className="flex flex-col h-full w-64 p-4">
        <div className="flex justify-end">
          <button onClick={toggleSidebar} className="bg-transparent text-black active:bg-black active:bg-opacity-30 active:border-none">
            X
          </button>
        </div>
        <div className="flex-1">
          <div className="mb-4">
            <SearchBar
              query={query}
              setQuery={setQuery}
              handleSearch={handleSearch}
              color={color}
            />
          </div>
          <div className="mb-4" onClick={toggleSidebar}>
            <Navlink to="/om-prosjektet" label="Om prosjektet" />
          </div>
          <div className="mb-4" onClick={toggleSidebar}>
            <Navlink to="/bidra" label="Bidra" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
