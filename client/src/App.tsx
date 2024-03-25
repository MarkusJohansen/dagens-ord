import { useContext } from "react";
import Navbar from "./components/navbar";
import { Sidebar } from "./components/sidebar";
import { ColorContext, ColorProvider } from "./contexts/colorContext";
import { DisplaySidebarProvider } from "./contexts/displaySidebarContext";

function App() {
  const { color } = useContext(ColorContext);

  return (
    <ColorProvider>
      <div
        style={{
          backgroundColor: `${color} !important`,
        }}
        className={`h-screen `}
      >
        z
        <DisplaySidebarProvider>
          <header className="flex flex-col mx-40">
            <Navbar />
          </header>
          <Sidebar />
        </DisplaySidebarProvider>
      </div>
    </ColorProvider>
  );
}

export default App;
