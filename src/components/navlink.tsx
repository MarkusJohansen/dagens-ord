import { Link } from "@tanstack/react-router";

interface NavlinkProps {
  to: string;
  label: string;
}

export const Navlink: React.FC<NavlinkProps> = ({ to, label }) => {
  return (
    <Link
      to={to}
      className="md:text-lg font-semibold text-dark-gray hover:underline  hover:text-gray-500 active:text-gray-600 focus:text-dark-gray font-logo"
    >
      {label}
    </Link>
  );
};
