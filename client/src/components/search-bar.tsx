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
  const { query, setQuery, handleSearch } = props;
  const router = useRouter();

  useEffect(() => {
    if (!router.state.location.pathname.includes("search")) setQuery("");
  }, [router.state.location.pathname]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex flex-row">
      <input
        value={query}
        placeholder="SØK..."
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="brutal-input h-10 w-full md:w-48 px-3 font-bold uppercase tracking-wide text-sm"
      />
      <button
        onClick={handleSearch}
        className="brutal-btn h-10 px-3 bg-black text-white border-l-0"
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
