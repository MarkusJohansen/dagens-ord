import { createLazyFileRoute } from "@tanstack/react-router";
import { useContext } from "react";
import { ColorContext } from "@/color-context";
import { SuggestionForm } from "@/components/suggestion-form";

export const Route = createLazyFileRoute("/bidra")({
  component: Contribute,
});

function Contribute() {
  const { color } = useContext(ColorContext);
  return (
    <div
      className="page-padding flex-1 h-full w-screen flex flex-col items-center justify-center py-16"
      style={{ backgroundColor: color }}
    >
      <div className="flex flex-col gap-8 w-full lg:w-2/3 xl:w-1/2 border-4 border-black shadow-brutal-lg p-8 bg-white">
        <div>
          <h1 className="font-black text-4xl uppercase tracking-tight mb-3">
            Send oss dine uttrykk!
          </h1>
          <div className="w-16 border-t-4 border-black mb-4" />
          <p className="font-medium leading-relaxed">
            Vi i Dagens Ord teamet ønsker å samle inn morsomme ord og uttrykk,
            og spør derfor om deres bidrag. Vi klarer bare å skrape sammen ett
            et fåtall ord og uttrykk på egenhånd, og vi er derfor avhengige av
            eksterne bidrag for å gjøre denne nettsiden så morsom som den kan
            bli! Vi ser frem til å høre fra ordsmedene der ute!
          </p>
        </div>
        <SuggestionForm />
      </div>
    </div>
  );
}
