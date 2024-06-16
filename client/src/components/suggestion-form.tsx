import { useContext } from "react";
import { ColorContext } from "../contexts/colorContext";

export const SuggestionForm = () => {
  const { color } = useContext(ColorContext);

  return (
    <form className="flex flex-col gap-2">
      <label htmlFor="word" className="text-dark-gray">
        Ord eller uttrykk:
        <input
          type="text"
          id="word"
          name="word"
          placeholder="En vinge"
          className={`border-dark-gray placeholder:text-dark-gray`}
          style={{ background: color }}
        />
      </label>
      <label htmlFor="example" className="text-dark-gray">
        Eksempel:
        <input
          type="text"
          id="word"
          name="word"
          placeholder="Skal du ha deg en vinge eller?"
          className={`border-dark-gray placeholder:text-dark-gray`}
          style={{ background: color }}
        />
      </label>
      <label htmlFor="explanation" className="text-dark-gray">
        Forklaring:
        <input
          type="text"
          id="word"
          name="word"
          placeholder="Et hardt slag"
          className={`border-dark-gray placeholder:text-dark-gray`}
          style={{ background: color }}
        />
      </label>
      <button type="submit" className="bg-dark-gray" style={{ color: color }}>
        Send inn forslag
      </button>
    </form>
  );
};
