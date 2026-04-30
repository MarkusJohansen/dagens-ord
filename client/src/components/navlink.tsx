import { Link } from "@tanstack/react-router";

interface NavlinkProps {
  to: string;
  label: string;
}

export const Navlink: React.FC<NavlinkProps> = ({ to, label }) => {
  return (
    <Link
      to={to}
      className="text-base font-bold uppercase tracking-widest text-black border-b-2 border-transparent hover:border-black transition-all"
    >
      {label}
    </Link>
  );
};
