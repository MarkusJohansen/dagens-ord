import { Dispatch, SetStateAction, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "@tanstack/react-router"; // Import useRouter from TanStack

interface SearchBarProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  handleSearch: () => void;
  color: string;
}

const SearchBar = (props: SearchBarProps) => {
  const { query, setQuery, handleSearch, color } = props;
  const router = useRouter();

  // Reset query when the URL changes
  useEffect(() => {
    if (!router.state.location.pathname.includes("search"))
      setQuery(""); // Clear the query when the route changes
  }, [router.state.location.pathname]); // Monitor the pathname for changes

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex border-none rounded-xl bg-white mr-2">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="border-none m-0 focus:shadow-none"
      />
      <button
        onClick={handleSearch}
        className="focus:shadow-none bg-transparent hover:bg-neutral-100"
        style={{ color: color }}
      >
        <FaSearch color="black" />
      </button>
    </div>
  );
};

export default SearchBar;
