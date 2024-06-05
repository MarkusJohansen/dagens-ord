import { useContext } from "react";
import { GetNewExpression } from "./api/getNewExpression";
import Expression from "./components/expression";
import Navbar from "./components/navbar";
import { Sidebar } from "./components/sidebar";
import { ColorContext } from "./contexts/colorContext";

function App() {
  const { color } = useContext(ColorContext);
  const { expression, isLoading } = GetNewExpression();

  return (
    <div
      style={{
        backgroundColor: color,
      }}
      className="min-h-screen flex flex-col"
    >
      <Sidebar />
      <div className="px-10 md:px-20 lg:px-40 flex-grow flex flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center ">
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
    </div>
  );
}

export default App;
