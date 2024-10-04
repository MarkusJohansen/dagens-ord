import { Link } from "@tanstack/react-router";
import logo from "@/img/logo.png";

const Logo = () => {
  return (
    <Link to="/">
      <div className="mx-2 my-auto h-full">
        <img src={logo} alt="logo" className="w-16" />
      </div>
    </Link>
  );
};

export default Logo;
