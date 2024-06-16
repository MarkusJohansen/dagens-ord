import { createLazyFileRoute } from "@tanstack/react-router";
import { useContext } from "react";
import { GetNewExpression } from "../api/getNewExpression";
import Expression from "../components/expression";
import { ColorContext } from "../contexts/colorContext";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { color } = useContext(ColorContext);
  const { expression, isLoading } = GetNewExpression();

  return (
    <div
      style={{
        backgroundColor: color,
      }}
      className=" min-h-screen flex flex-col"
    >
      <div className="page-padding flex-grow flex flex-col">
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
