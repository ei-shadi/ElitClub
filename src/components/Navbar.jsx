import { useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../assets/Logo.png";
import { FaHome } from "react-icons/fa";
import { FcSportsMode } from "react-icons/fc";
import { PiSealQuestionFill } from "react-icons/pi";
import Button from "../shared/Button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", title: "Home", icon: FaHome },
    { to: "/courts", title: "Courts", icon: FcSportsMode },
    { to: "/about-us", title: "About Us", icon: PiSealQuestionFill },
  ];

  const centerNavLinks = navLinks.map(({ to, title, icon: Icon }) => (
    <li key={to}>
      <NavLink
        to={to}
        title={title}
        className={({ isActive }) =>
          `flex items-center gap-1.5 transition-all ${isActive
            ? "text-2xl font-extrabold text-[#FF02CB] border-b-4 rounded px-4 pb-0.5"
            : "italic font-bold text-lg hover:text-[#5ab1bb] hover:scale-130 ease-in-out duration-200"
          }`
        }
        onClick={() => setIsMenuOpen(false)}
      >
        <Icon size={22} />
        {title}
      </NavLink>
    </li>
  ));

  return (
    <div className="px-10 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="relative flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center gap-2">
            <img className="w-14 md:w-20" src={Logo} alt="Logo" />
            <h1 className="text-4xl hidden md:block bg-gradient-to-br from-[#1e152a] to-[#5ab1bb] bg-clip-text text-transparent">
              Sport<span className="text-[#5]">Nexus</span>
            </h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="items-center hidden space-x-14 lg:flex">
          {centerNavLinks}
          <div className="hidden lg:flex">
            <Link
              to="/sign-in"
              title="Sign in"
            >
              <Button text="Sign in" />
            </Link>
          </div>
        </ul>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              />
              <path
                fill="currentColor"
                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
              />
              <path
                fill="currentColor"
                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Slide-in Mobile Menu with Transparent & Blurred Background */}
      <div
        className={`fixed top-0 left-0 z-50 w-full h-screen bg-white/60 backdrop-blur-md transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-6 flex flex-col items-center justify-start h-full">
          <div className="flex items-center justify-between w-full mb-8">
            <Link
              to="/"
              className="flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <img src={Logo} className="w-14" alt="Logo" />
              <h1 className="text-3xl font-bold tracking-wide text-gray-800">
                Sport<span className="text-[#5ab1bb]">Nexus</span>
              </h1>
            </Link>
            <button
              aria-label="Close Menu"
              title="Close Menu"
              className="p-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg className="w-6 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3
                c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3
                c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col items-center space-y-6 w-full">
            <ul className="flex flex-col items-center space-y-4 w-full">{centerNavLinks}</ul>
            <Link
              to="/sign-in"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button text="Sign In" />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
