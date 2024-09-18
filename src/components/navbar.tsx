import { useNavigate } from "@tanstack/react-router";
import { useContext, useState } from "react";
import { ColorContext } from "@/color-context";
import Logo from "@/components/logo";
import { useSearchContext } from "@/context/search-context";
import SearchBar from "./search-bar";

const Navbar = () => {
  const { color } = useContext(ColorContext);
  const navigate = useNavigate({ from: "/" });
  const [query, setQuery] = useState<string>("");
  const { search } = useSearchContext();

  const handleSearch = () => {
    search(query);
    navigate({to: "/search"})
  }

  return (
    <>
      <nav style={{ backgroundColor: color }}>
        <div className="page-padding py-2 flex flex-row w-full justify-between items-center">
          <Logo />
          <div className="flex">
            <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} color={color} />
            <button
              onClick={() => navigate({ to: "/contribute" })}
              className="border-2 text-dark-gray focus:shadow-none"
              style={{ color: color }}
            >
              Bidra
            </button>
          </div>
        </div>
        <hr className="w-screen bg-dark-gray m-0" />
      </nav>
    </>
  );
};

export default Navbar;
