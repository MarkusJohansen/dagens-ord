import { GetNewExpression } from "./api/getNewExpression";
import Expression from "./components/expression";
import Navbar from "./components/navbar";
import { Sidebar } from "./components/sidebar";
import { DisplaySidebarProvider } from "./contexts/displaySidebarContext";

function App() {
  const { expression, isLoading } = GetNewExpression();

  return (
    <main className="relative">
      <DisplaySidebarProvider>
        <header className="flex flex-col mx-40">
          <Navbar />
        </header>
        <Sidebar />
      </DisplaySidebarProvider>
      <div className="flex flex-col mx-40">
        {isLoading || !expression ? (
          <h1>Loading...</h1>
        ) : (
          <Expression
            word={expression.expression}
            example={expression.example}
            explanation={expression.definition}
          />
        )}
      </div>
    </main>
  );
}

export default App;
