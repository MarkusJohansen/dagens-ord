import { GetNewExpression } from "./api/getNewExpression";
import Expression from "./components/expression";
import Navbar from "./components/navbar";

async function App() {
  const { expression } = await GetNewExpression();

  return (
    <main className="flex flex-col mx-40">
      <Navbar />
      {!expression ? (
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
