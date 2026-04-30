import { Navlink } from "./navlink";

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  color: string;
}

const Sidebar = ({ sidebarOpen, toggleSidebar, color }: SidebarProps) => {
  return (
    <div
      className={`fixed top-0 right-0 h-screen z-50 transition-transform duration-300 ease-in-out border-l-4 border-black ${
        sidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ backgroundColor: color }}
    >
      <div className="flex flex-col h-full w-64 p-5 gap-6">
        <div className="flex justify-end">
          <button
            onClick={toggleSidebar}
            className="border-2 border-black px-3 py-1 font-black text-sm shadow-brutal-sm bg-black text-white uppercase tracking-widest active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            LUKK ✕
          </button>
        </div>
        <div className="flex flex-col gap-4 border-t-2 border-black pt-4" onClick={toggleSidebar}>
          <Navlink to="/om-prosjektet" label="Om prosjektet" />
          <Navlink to="/bidra" label="Bidra" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
