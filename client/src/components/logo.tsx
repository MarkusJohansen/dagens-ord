import { Link } from "@tanstack/react-router";
import logo from "@/img/logo.png";

const Logo = () => {
  return (
    <Link className="mr-auto flex flex-row items-center font-logo" to="/">
      <h2 className="h-full text-black flex text-2xl font-bold">Dagens</h2>
      <div className="mx-2">
        <img src={logo} alt="logo" className="w-12" />
      </div>
    </Link>
  );
};

export default Logo;
