import { GetNewExpression } from "./api/getNewExpression";
import Expression from "./components/expression";
import Navbar from "./components/navbar";

function App() {
  const { expression, isLoading } = GetNewExpression();

  return (
    <main className="flex flex-col mx-40">
      <Navbar />
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
  );
}

export default App;
