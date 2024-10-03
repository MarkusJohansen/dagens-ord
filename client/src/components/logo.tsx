import { Link } from "@tanstack/react-router";
import logo from "@/img/logo.png";

interface LogoProps {
  onClick?: () => void; // Optional onClick prop
}

const Logo: React.FC<LogoProps> = ({ onClick }) => {
  return (
    <Link to="/">
      <div
        className="mx-2 my-auto h-full cursor-pointer" // Add cursor-pointer for better UX
        onClick={onClick} // Call the onClick function if provided
      >
        <img src={logo} alt="logo" className="w-16" />
      </div>
    </Link>
  );
};

export default Logo;
