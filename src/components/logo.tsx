import { Link } from "@tanstack/react-router";
import logo from "@/img/logo.png";

const Logo = () => {
  return (
    <Link className="mr-auto flex" to="/">
      <h2 className="h-full text-black text-2xl font-bold font-logo my-auto">
        Dagens
      </h2>
      <div className="mx-2 my-auto h-full hidden lg:block">
        <img src={logo} alt="logo" className="w-12" />
      </div>
    </Link>
  );
};

export default Logo;
