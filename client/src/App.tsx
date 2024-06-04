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
        <header className="flex flex-col mx-40">
          <Navbar />
        </header>
        <Sidebar />
      </DisplaySidebarProvider>
      <main className="flex flex-col mx-40">
        {isLoading || !expression ? (
          <Expression
            word={"Et kult uttrykk laster inn..."}
            example={`"Her kommer det et eksempel på bruk av utrykket"`}
            explanation={"Og en forklaring på hva uttrykket betyr"}
          />
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
