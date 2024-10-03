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

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setWord("");
    setExample("");
    setExplanation("");
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={onFormSubmit}>
      <label htmlFor="word">
        Ord eller uttrykk:
        <input
          type="text"
          name="expression"
          placeholder="En vinge"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="placeholder:text-light-gray border-black focus:shadow-xl"
          style={{ background: color }}
        />
      </label>
      <label htmlFor="example">
        Eksempel:
        <input
          type="text"
          name="example"
          placeholder="Skal du ha deg en vinge eller?"
          value={example}
          onChange={(e) => setExample(e.target.value)}
          className="placeholder:text-light-gray border-black focus:shadow-xl"
          style={{ background: color }}
        />
      </label>
      <label htmlFor="explanation">
        Forklaring:
        <input
          type="text"
          name="definition"
          placeholder="Et hardt slag"
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          className="placeholder:text-light-gray border-black focus:shadow-xl"
          style={{ background: color }}
        />
      </label>
      <button style={{ color: color }} className="focus:shadow-xl" onClick={() => suggest()}>
        Send inn forslag
      </button>
    </form>
  );
};
