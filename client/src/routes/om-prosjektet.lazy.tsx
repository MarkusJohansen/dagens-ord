import { ColorContext } from "@/color-context";
import { ExpressionCount } from "@/components/expression-counter";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useContext } from "react";

export const Route = createLazyFileRoute("/om-prosjektet")({
  component: About,
});

function About() {
  const { color } = useContext(ColorContext);
  return (
    <div
      className="page-padding flex-1 w-screen flex flex-col items-center py-16"
      style={{ backgroundColor: color }}
    >
      <div className="flex flex-col gap-6 w-full lg:w-2/3 xl:w-1/2 border-4 border-black shadow-brutal-lg p-8 bg-white">
        <h1 className="font-black text-4xl uppercase tracking-tight">
          Om prosjektet
        </h1>
        <div className="w-16 border-t-4 border-black" />
        <p className="font-medium leading-relaxed">
          Det var en kald vår. Året var 2024 og to informatikk studenter med en
          sær humor basert på spesielle ordtak, utrykk og ord, får en visjon..
          En visjon om å lage en nettside som samler alle disse "utrykkene" på
          ett sted. Rett og slett en liten hyllest til det norske språk. Dagens
          Ord var født. Konseptet "Dagens Ord" er veldig simpelt. Hver dag får
          du servert ett artig ordtak, utrykk eller ord som du kanskje ikke har
          hørt før. Sakte, men sikkert, beriker du ditt eget ordforråd og
          kanskje du flirer litt når du åpner siden vår. Vi håper ihvertfall
          det.
        </p>
        <p className="font-medium leading-relaxed">
          Etter å ha notert ned og samlet inn en haug med utrykk på egenhånd,
          og stolt vist fram det lille prosjektet vårt, skjønte vi at vi at det
          er flere der ute som har en forkjærlighet for det norske språket.
          Derfor har vi lagt til rette for at du kan{" "}
          <Link
            className="font-black underline decoration-2 underline-offset-2 text-black hover:bg-black hover:text-white px-1 transition-colors"
            to="/bidra"
          >
            bidra med dine egne utrykk
          </Link>
          . Vi gleder oss til å se hva dere har å by på!
        </p>
        <p className="font-medium leading-relaxed">
          Hvis du har lyst til å bidra til prosjektet på en annen måte, kan du
          ta en titt på{" "}
          <a
            className="font-black underline decoration-2 underline-offset-2 text-black hover:bg-black hover:text-white px-1 transition-colors"
            href="https://github.com/MarkusJohansen/dagens-ord"
          >
            Github repoet vårt
          </a>
          ! Vi tar gjerne imot pull requests, issues og forslag til
          forbedringer.
        </p>
        <div className="border-t-4 border-black pt-4 flex gap-4 items-end">
          <span className="font-black uppercase tracking-widest text-sm">Unike utrykk:</span>
          <span className="font-black text-5xl leading-none">
            <ExpressionCount />
          </span>
        </div>
      </div>
    </div>
  );
}
