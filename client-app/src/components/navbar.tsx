import { useNavigate } from "@tanstack/react-router";
import { useContext, useState } from "react";
import { ColorContext } from "@/color-context";
import Logo from "@/components/logo";
import { useSearchContext } from "@/context/search-context";
import SearchBar from "./search-bar";
import { Navlink } from "./navlink";
import Streak from "./streak";

const Navbar = () => {
  const { color } = useContext(ColorContext);
  const navigate = useNavigate({ from: "/" });
  const [query, setQuery] = useState<string>("");
  const { search } = useSearchContext();
  
  const handleSearch = () => {
    search(query);
    navigate({ to: "/sok" });
  };

  return (
    <>
      <nav style={{ backgroundColor: color }}>
        <div className="page-padding py-2 flex flex-row w-full justify-between items-center">
          <div className="flex items-center gap-14">
            <div>
              <Logo />
            </div>
            <div className="flex gap-6">
              <Navlink to="/om-prosjektet" label="Om prosjektet" />
              <Navlink to="/bidra" label="Bidra" />
            </div>
          </div>
          <div className="flex">
            <Streak />
            <SearchBar
            query={query}
            setQuery={setQuery}
            handleSearch={handleSearch}
            color={color}
            />
          </div>
        </div>
        <hr className="w-screen m-0" />
      </nav>
    </>
  );
};

export default Navbar;
