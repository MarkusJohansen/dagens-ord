import Navbar from "./components/navbar";
import { Sidebar } from "./components/sidebar";

function App() {
  return (
    <main className="relative">
      <header className="flex flex-col mx-40">
        <Navbar />
      </header>
      <Sidebar />
    </main>
  );
}

export default App;
