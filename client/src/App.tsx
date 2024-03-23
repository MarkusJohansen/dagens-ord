import Navbar from "./components/navbar";
import { Sidebar } from "./components/sidebar";
import { DisplaySidebarProvider } from "./contexts/displaySidebarContext";

function App() {
  return (
    <main className="relative">
      <DisplaySidebarProvider>
        <header className="flex flex-col mx-40">
          <Navbar />
        </header>
        <Sidebar />
      </DisplaySidebarProvider>
    </main>
  );
}

export default App;
