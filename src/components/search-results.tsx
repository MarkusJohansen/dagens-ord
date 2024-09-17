import { useSearchContext } from "@/context/search-context";

export const SearchResults = () => {
  const { results, isLoading } = useSearchContext();

  if (isLoading) {
    return <h1>Søker...</h1>
  } else if (results && results?.length != 0) {
    return (
      <ul>
        {results.map((result, index) => (
          <div>
            <ul className="text-2xl my-10" key={index}>
              <strong>Uttrykk:</strong> {result.expression}
              <br />
              <strong>Definisjon:</strong> {result.definition}
              <br />
              <strong>Eksempel:</strong> {result.example}
            </ul>
            {/* <hr /> only appears if there is more than one result */}
            {index < results.length - 1 && <hr />}
          </div>
        ))}
      </ul>
    );      
  } else {
    return (
      <h1>Ingen resultater for dette søket.</h1>
    )
  }
};
