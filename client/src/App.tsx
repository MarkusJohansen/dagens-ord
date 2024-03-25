import { useContext } from "react";
import Navbar from "./components/navbar";
import { Sidebar } from "./components/sidebar";
import { ColorContext } from "./contexts/colorContext";
import { DisplaySidebarProvider } from "./contexts/displaySidebarContext";

function App() {
  const { color } = useContext(ColorContext);

  return (
    <div
      style={{
        backgroundColor: `${color}`,
      }}
      className={`h-screen`}
    >
      <DisplaySidebarProvider>
        <header className="flex flex-col mx-40">
          <Navbar />
        </header>
        <Sidebar />
      </DisplaySidebarProvider>
    </div>
  );
}

export default App;
