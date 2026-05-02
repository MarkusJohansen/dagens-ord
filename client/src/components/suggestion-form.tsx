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

  const canSubmit = word.trim().length >= 1 && example.trim().length >= 4 && explanation.trim().length >= 4;

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;
    setWord("");
    setExample("");
    setExplanation("");
  };

  const inputClass =
    "brutal-input w-full h-10 px-3 font-medium mt-1 block placeholder:text-black placeholder:opacity-60";

  return (
    <form className="flex flex-col gap-4" onSubmit={onFormSubmit}>
      <label className="font-black uppercase tracking-widest text-sm">
        Ord eller uttrykk:
        <input
          type="text"
          name="expression"
          placeholder="En vinge"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className={inputClass}
          style={{ background: color }}
        />
      </label>
      <label className="font-black uppercase tracking-widest text-sm">
        Eksempel:
        <input
          type="text"
          name="example"
          placeholder="Skal du ha deg en vinge eller?"
          value={example}
          onChange={(e) => setExample(e.target.value)}
          className={inputClass}
          style={{ background: color }}
        />
        {example.length > 0 && example.trim().length < 4 && (
          <span className="text-xs font-bold text-brutal-pink mt-1 block normal-case tracking-normal">
            Minst 4 tegn ({example.trim().length}/4)
          </span>
        )}
      </label>
      <label className="font-black uppercase tracking-widest text-sm">
        Forklaring:
        <input
          type="text"
          name="definition"
          placeholder="Et hardt slag"
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          className={inputClass}
          style={{ background: color }}
        />
        {explanation.length > 0 && explanation.trim().length < 4 && (
          <span className="text-xs font-bold text-brutal-pink mt-1 block normal-case tracking-normal">
            Minst 4 tegn ({explanation.trim().length}/4)
          </span>
        )}
      </label>
      <button
        className={`brutal-btn bg-black text-white mt-2 w-full h-12 text-base transition-opacity ${
          canSubmit ? "" : "opacity-40 cursor-not-allowed"
        }`}
        onClick={() => canSubmit && suggest()}
        disabled={!canSubmit}
      >
        SEND INN FORSLAG →
      </button>
    </form>
  );
};
