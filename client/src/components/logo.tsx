import { Link } from "@tanstack/react-router";

const Logo = () => {
  return (
    <Link to="/">
      <div className="border-2 border-black px-3 py-1 shadow-brutal-sm bg-black text-white font-black uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors">
        DAGENS ORD
      </div>
    </Link>
  );
};

export default Logo;
