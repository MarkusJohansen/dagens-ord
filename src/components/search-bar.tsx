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
    if (!router.state.location.pathname.includes("search")) setQuery("");
  }, [router.state.location.pathname]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="gap-1 flex-row hidden md:flex">
      <input
        value={query}
        placeholder="Søk..."
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="border-none m-0 focus:shadow-none h-10"
      />
      <button
        onClick={handleSearch}
        className="focus:shadow-none bg-dark-gray hover:bg-gray-600 h-10"
        style={{ color: color }}
      >
        <FaSearch color="white" />
      </button>
    </div>
  );
};

export default SearchBar;
