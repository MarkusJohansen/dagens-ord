import { useSearchContext } from "@/context/search-context";
import { Expression } from "@/components/expression";
import { HashLoader } from "react-spinners";

export const SearchResults = () => {
  const { results, isLoading } = useSearchContext();

  if (isLoading) {
    return <HashLoader color="#000" speedMultiplier={2} />;
  }

  if (!results || results.length === 0) {
    return (
      <h1 className="text-2xl font-black uppercase tracking-widest border-2 border-black p-6 shadow-brutal">
        INGEN RESULTATER.
      </h1>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-2xl">
      {results.map((result, i) => (
        <Expression
          key={i}
          word={result.expression}
          example={result.example}
          explanation={result.definition}
        />
      ))}
    </div>
  );
};
