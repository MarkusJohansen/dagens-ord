import { Dispatch, SetStateAction, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "@tanstack/react-router";

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
    <div className="gap-1 flex flex-row md:justify-end">
      <input
        value={query}
        placeholder="Søk..."
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="m-0 focus:shadow-none h-10 w-1/2 md:w-100 bg-transparent border-black border-2 placeholder:text-light-gray"
      />
      <button
        onClick={handleSearch}
        className="focus:shadow-none hover:bg-gray-600 h-10"
        style={{ color: color }}
      >
        <FaSearch color={color} />
      </button>
    </div>
  );
};

export default SearchBar;
