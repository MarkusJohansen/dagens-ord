import { createLazyFileRoute } from "@tanstack/react-router";
import { useContext } from "react";
import { ColorContext } from "@/color-context";
import { useGetNsfwExpression } from "@/hooks/use-get-nsfw-expression";
import { useTypewriter } from "@/hooks/use-typewriter";

export const Route = createLazyFileRoute("/nsfw")({
  component: Nsfw,
});

function Nsfw() {
  const { color } = useContext(ColorContext);
  const { expression, isLoading } = useGetNsfwExpression();

  const word = isLoading || !expression ? "..." : expression.expression.toUpperCase();
  const example = isLoading || !expression
    ? '"Her kommer et eksempel på bruk av uttrykket"'
    : expression.example;
  const explanation = isLoading || !expression
    ? "Og en forklaring på hva uttrykket betyr"
    : expression.definition;

  const { displayed, done } = useTypewriter(word, 50);

  return (
    <div style={{ backgroundColor: color }} className="flex flex-col h-full">
      <div className="page-padding flex-1 flex items-center min-h-0 py-4 overflow-hidden">
        <h1
          className={`font-black uppercase leading-[0.85] break-words w-full ${
            !done ? "typewriter-cursor" : ""
          }`}
          style={{ fontSize: "clamp(3.5rem, 13vw, 16rem)" }}
        >
          {displayed || " "}
        </h1>
      </div>

      <div className="border-t-4 border-black shrink-0">
        <div className="page-padding grid grid-cols-1 md:grid-cols-2">
          <div className="py-5 md:border-r-2 border-black md:pr-10 border-b-2 md:border-b-0">
            <p className="font-black text-[10px] uppercase tracking-[0.3em] mb-2 opacity-40">
              EKSEMPEL
            </p>
            <p className="text-base md:text-lg font-medium italic leading-snug">
              {example}
            </p>
          </div>
          <div className="py-5 md:pl-10">
            <p className="font-black text-[10px] uppercase tracking-[0.3em] mb-2 opacity-40">
              FORKLARING
            </p>
            <p className="text-base md:text-lg font-medium leading-snug">
              {explanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
