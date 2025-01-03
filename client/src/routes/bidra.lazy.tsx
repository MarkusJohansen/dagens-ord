import { createLazyFileRoute } from "@tanstack/react-router";
import clsx from "clsx";
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
      className={clsx(
        "page-padding flex-1 h-full w-screen",
        "flex flex-col items-center justify-center"
      )}
      style={{ backgroundColor: color }}
    >
      <div className="flex flex-col gap-10 w-full lg:w-2/3 xl:w-1/2 backdrop-brightness-100 lg:border lg:border-black lg:shadow-xl p-10 rounded-md">
        <div>
          <h1 className="font-logo text-4xl mb-5">Send oss dine uttrykk!</h1>
          <p className="">
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
