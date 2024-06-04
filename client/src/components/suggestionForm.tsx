import { useContext } from "react";
import { ColorContext } from "../contexts/colorContext";

export const SuggestionForm = () => {
  const { color } = useContext(ColorContext);

  return (
    <form className="flex flex-col gap-2">
      <label htmlFor="word" style={{ color: color }}>
        Ord eller uttrykk:
        <input
          type="text"
          id="word"
          name="word"
          placeholder="En vinge"
          className={`bg-dark-gray`}
          style={{ color: color, borderColor: color }}
        />
      </label>
      <label htmlFor="example" style={{ color: color }}>
        Eksempel:
        <input
          type="text"
          id="word"
          name="word"
          placeholder="Skal du ha deg en vinge eller?"
          className={`bg-dark-gray`}
          style={{ color: color, borderColor: color }}
        />
      </label>
      <label htmlFor="explanation" style={{ color: color }}>
        Forklaring:
        <input
          type="text"
          id="word"
          name="word"
          placeholder="Et hardt slag"
          className={`bg-dark-gray`}
          style={{ color: color, borderColor: color }}
        />
      </label>
      <button
        type="submit"
        style={{ backgroundColor: color }}
        className="text-dark-gray"
      >
        Send inn forslag
      </button>
    </form>
  );
};
