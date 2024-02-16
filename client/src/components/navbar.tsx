import { RxHamburgerMenu } from "react-icons/rx";
import logo from "/logo.png";

const Navbar = () => {
    return (
        <nav className="flex flex-row w-full justify-between py-4">
            <RxHamburgerMenu size={35} />
            <a href="/" className="text-black hover:text-black ml-auto flex flex-row items-center font-logo">
                <div className="h-full flex text-2xl font-bold">
                    Dagens
                </div>
                <div className="mx-2">
                    <img src={logo} alt="logo" className="w-12" />
                </div>
            </a>
        </nav >
    );
}

export default Navbar;