import Expression from "./components/expression";
import Navbar from "./components/navbar";

const word = "Apostlenes hester";
const example = "Dette er et eksempel på ordet";
const explanation = "Dette er en forklaring på ordet";

function App() {
  return (
    <main className="flex flex-col mx-40">
      <Navbar />
      <Expression word={word} example={example} explanation={explanation} />
    </main>
  );
}

export default App;
