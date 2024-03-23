import { useState } from "react";

export const SuggestionForm = () => {
  const [contentColor] = useState("white"); //TODO: exchange for a context value

  return (
    <form className="flex flex-col gap-2">
      <label htmlFor="word" className={`text-${contentColor}`}>
        Ord eller uttrykk:
        <input
          type="text"
          id="word"
          name="word"
          placeholder="En vinge"
          className={`bg-dark-gray border-${contentColor} text-${contentColor}`}
        />
      </label>
      <label htmlFor="example" className={`text-${contentColor}`}>
        Eksempel:
        <input
          type="text"
          id="word"
          name="word"
          placeholder="Skal du ha deg en vinge eller?"
          className={`bg-dark-gray border-${contentColor} text-${contentColor}`}
        />
      </label>
      <label htmlFor="explanation" className={`text-${contentColor}`}>
        Forklaring:
        <input
          type="text"
          id="word"
          name="word"
          placeholder="Et hardt slag"
          className={`bg-dark-gray border-${contentColor} text-${contentColor}`}
        />
      </label>
      <input type="submit" className={`bg-${contentColor}`} />
    </form>
  );
};
