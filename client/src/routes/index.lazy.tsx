import { createLazyFileRoute } from "@tanstack/react-router";
import { useContext } from "react";
import { useGetNewExpression } from "@/hooks/use-get-random-expression";
import { ColorContext } from "@/color-context";
import { useTypewriter } from "@/hooks/use-typewriter";
import { useFitText } from "@/hooks/use-fit-text";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { color } = useContext(ColorContext);
  const { expression, isLoading } = useGetNewExpression();

  const word = expression?.expression.toUpperCase() ?? "";
  const example = expression?.example ?? "";
  const explanation = expression?.definition ?? "";

  const { displayed, done } = useTypewriter(word, 50);
  const { ref, fontSize } = useFitText(word);

  return (
    <div style={{ backgroundColor: color }} className="flex flex-col h-full">
      <div className="page-padding flex-1 flex items-center min-h-0 py-4 overflow-hidden">
        <h1
          ref={ref}
          className={`font-black uppercase leading-[0.85] whitespace-nowrap ${!done ? "typewriter-cursor" : ""}`}
          style={{ fontSize }}
        >
          {displayed || " "}
        </h1>
      </div>

      <div className="md:border-t-4 border-black shrink-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="pl-5 md:pl-10 lg:pl-32 border-t-2 md:border-t-0 border-black py-5 md:border-r-2 md:pr-10">
            <p className="font-black text-[10px] uppercase tracking-[0.3em] mb-2 opacity-40">EKSEMPEL</p>
            <p className="text-base md:text-lg font-medium italic leading-snug">{example}</p>
          </div>
          <div className="pl-5 md:pl-10 lg:pl-32 border-t-2 md:border-t-0 border-black py-5">
            <p className="font-black text-[10px] uppercase tracking-[0.3em] mb-2 opacity-40">FORKLARING</p>
            <p className="text-base md:text-lg font-medium leading-snug">{explanation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
