import { useSearchContext } from "@/context/search-context";
import { HashLoader } from "react-spinners";

export const SearchResults = () => {
  const { results, isLoading } = useSearchContext();

  if (isLoading) {
    return <HashLoader color="#000" speedMultiplier={2} />;
  } else if (results && results?.length != 0) {
    return (
      <div className="flex flex-col gap-5 py-10">
        {results.map((result) => (
          <div>
            <div>
              <p className="text-xl font-semibold ">{result.expression}</p>
              <p className="italic">{result.definition}</p>
            </div>
            <hr className="m-0 h-0.5 bg-dark-gray opacity-10" />
          </div>
        ))}
      </div>
    );
  } else {
    return <h1>Ingen resultater for dette søket.</h1>;
  }
};
