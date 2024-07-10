import { useContext, useState } from "react";
import { ColorContext } from "@/color-context";
import { useSuggest } from "@/hooks/use-suggest";

export const SuggestionForm = () => {
  const { color } = useContext(ColorContext);
  const [word, setWord] = useState("");
  const [example, setExample] = useState("");
  const [explanation, setExplanation] = useState("");
  const { suggest } = useSuggest({
    id: 0,
    expression: word,
    example,
    definition: explanation,
  });

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="word" className="text-dark-gray">
        Ord eller uttrykk:
        <input
          type="text"
          name="expression"
          placeholder="En vinge"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className={`border-dark-gray text-dark-gray placeholder:text-light-gray`}
          style={{ background: color }}
        />
      </label>
      <label htmlFor="example" className="text-dark-gray">
        Eksempel:
        <input
          type="text"
          name="example"
          placeholder="Skal du ha deg en vinge eller?"
          value={example}
          onChange={(e) => setExample(e.target.value)}
          className={`border-dark-gray text-dark-gray placeholder:text-light-gray`}
          style={{ background: color }}
        />
      </label>
      <label htmlFor="explanation" className="text-dark-gray">
        Forklaring:
        <input
          type="text"
          name="definition"
          placeholder="Et hardt slag"
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          className={`border-dark-gray text-dark-gray placeholder:text-light-gray`}
          style={{ background: color }}
        />
      </label>
      <button
        className="bg-dark-gray"
        style={{ color: color }}
        onClick={() => {
          suggest();
          setWord("");
          setExample("");
          setExplanation("");
        }}
      >
        Send inn forslag
      </button>
    </div>
  );
};
