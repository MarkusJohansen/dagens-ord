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
      className="page-padding min-h-screen w-screen flex items-center justify-center"
      style={{ backgroundColor: color }}
    >
      <div className="flex flex-col gap-6">
        <h1 className="font-logo">Om prosjektet</h1>
        <p>
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
        <p>
          Etter å ha notert ned og samlet inn en haug med utrykk på egenhånd, og
          stolt vist fram det lille prosjektet vårt, skjønte vi at vi at det er
          flere der ute som har en forkjærlighet for det norske språket. Derfor
          har vi lagt til rette for at du kan
          <Link
            className="underline  text-black hover:text-gray-500 active:text-gray-600 "
            to="/bidra"
          >
            {" "}
            bidra med dine egne utrykk
          </Link>
          . Vi gleder oss til å se hva dere har å by på!
        </p>
        <p>
          Hvis du har lyst til å bidra til prosjektet på en annen måte, kan du
          ta en titt på Github repoet vårt! Vi tar gjerne imot pull requests,
          issues og forslag til forbedringer.
        </p>
        <div className="flex gap-3 items-end mb-4">
          <p className="text-xl font-logo">Unike utrykk: </p>
          <p className="font-logo text-4xl font-bold">
            <ExpressionCount />
          </p>
        </div>
      </div>
    </div>
  );
}
