import { Link } from "@tanstack/react-router";

interface NavlinkProps {
  to: string;
  label: string;
}

export const Navlink: React.FC<NavlinkProps> = ({ to, label }) => {
  return (
    <Link
      to={to}
      className="md:text-lg font-semibold text-dark-gray hover:underline font-logo"
    >
      {label}
    </Link>
  );
};
