import { useContext } from "react";
import { GetNewExpression } from "./api/getNewExpression";
import Expression from "./components/expression";
import Navbar from "./components/navbar";
import { Sidebar } from "./components/sidebar";
import { ColorContext } from "./contexts/colorContext";
import { DisplaySidebarProvider } from "./contexts/displaySidebarContext";

function App() {
  const { color } = useContext(ColorContext);
  const { expression, isLoading } = GetNewExpression();

  return (
    <div
      style={{
        backgroundColor: color,
      }}
      className={`h-screen`}
    >
      <DisplaySidebarProvider>
        <header className="flex flex-col mx-20">
          <Navbar />
        </header>
        <Sidebar />
      </DisplaySidebarProvider>
      <main className="flex flex-col mx-20">
        {isLoading || !expression ? (
          <h1>Loading...</h1>
        ) : (
          <Expression
            word={expression.expression}
            example={expression.example}
            explanation={expression.definition}
          />
        )}
      </main>
    </div>
  );
}

export default App;
