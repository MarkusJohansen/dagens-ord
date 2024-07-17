import { useNavigate } from "@tanstack/react-router";
import { useContext } from "react";
import { ColorContext } from "@/color-context";
import Logo from "@/components/logo";

const Navbar = () => {
  const { color } = useContext(ColorContext);
  const navigate = useNavigate({ from: "/" });
  return (
    <>
      <nav style={{ backgroundColor: color }}>
        <div className="page-padding py-2 flex flex-row w-full justify-between items-center">
          <Logo />
          <button
            onClick={() => navigate({ to: "/contribute" })}
            className="border-2 text-dark-gray"
            style={{ color: color }}
          >
            Bidra
          </button>
        </div>
        <hr className="w-screen bg-dark-gray m-0" />
      </nav>
    </>
  );
};

export default Navbar;
