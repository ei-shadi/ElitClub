import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import Logo from "../assets/Logo.png";
import { FaHome } from "react-icons/fa";
import { PiSealQuestionFill } from "react-icons/pi";
import { FaPersonRunning } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { IoMenu } from "react-icons/io5";
import Button from "../shared/Button";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();

  // Separate refs for desktop and mobile avatars
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const desktopAvatarRef = useRef(null);
  const mobileAvatarRef = useRef(null);
  const menuBtnRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    // Close dropdown and mobile menu on click outside
    const handleClickOutside = (event) => {
      // Close dropdown if click outside desktop and mobile avatars & dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        desktopAvatarRef.current &&
        !desktopAvatarRef.current.contains(event.target) &&
        mobileAvatarRef.current &&
        !mobileAvatarRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }

      // Close mobile menu if click outside mobile menu & menu button
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        menuBtnRef.current &&
        !menuBtnRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);

  const navLinks = [
    { to: "/", title: "Home", icon: FaHome },
    { to: "/courts", title: "Courts", icon: FaPersonRunning },
    { to: "/faq", title: "FAQ", icon: PiSealQuestionFill },
  ];

  const centerNavLinks = navLinks.map(({ to, title, icon: Icon }) => (
    <li key={to}>
      <NavLink
        to={to}
        title={title}
        className={({ isActive }) =>
          `flex items-center gap-2 transition-all ${isActive
            ? "text-lg font-extrabold text-white bg-[#FF02CB] rounded-4xl px-6 py-1.5"
            : "italic font-bold text-lg hover:scale-125 duration-200 nav-text"
          }`
        }
      >
        <Icon size={20} />
        {title}
      </NavLink>
    </li>
  ));

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logout successfully!",
          showConfirmButton: true,
          confirmButtonText: "Continue",
          timer: 2000,
          timerProgressBar: true,
        });
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-500 transition-all duration-500 ${isScrolled
          ? "backdrop-blur-md"
          : "lg:bg-transparent backdrop-blur-md bg-[#EFEAE6]/20 lg:backdrop-blur-none lg:bg-none"
        }`}
    >
      <div className="px-6 py-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-2xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center gap-2">
              <img className="w-14 md:w-20" src={Logo} alt="Logo" />
              <h1 className="text-3xl md:text-4xl bg-gradient-to-b from-black to-[#FF02CB] bg-clip-text text-transparent">
                EliteClub
              </h1>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="items-center hidden space-x-12 lg:flex">
            {centerNavLinks}
            <div className="hidden lg:flex items-center gap-6 relative">
              {user ? (
                <>
                  <div
                    ref={desktopAvatarRef}
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className="w-12 h-12 rounded-full border border-gray-300 hover:ring-4 hover:ring-[#FF02CB] transition duration-200 cursor-pointer overflow-hidden"
                  >
                    <img
                      alt="User Avatar"
                      src={
                        user?.photoURL ||
                        "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                      }
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  {isDropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute top-14 right-2 bg-white rounded-xl shadow-xl p-4 min-w-[200px] z-50 space-y-2 text-center"
                    >
                      <p className="text-gray-600 text-lg font-hoover">
                        {user.displayName || user.email}
                      </p>
                      <Link
                        to="/dashboard"
                        className="block w-full text-center bg-[#FF02CB] text-white font-semibold py-2 rounded-lg hover:bg-black cursor-pointer transition"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                        }}
                        className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-black cursor-pointer transition"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/auth/login">
                  <Button text="Sign in" />
                </Link>
              )}
            </div>
          </ul>

          {/* Mobile Avatar + Menu Icon */}
          <div className="flex items-center gap-3 lg:hidden relative">
            {user && (
              <>
                <div
                  ref={mobileAvatarRef}
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-gray-300 hover:ring-2 hover:ring-[#FF02CB] transition duration-200 cursor-pointer overflow-hidden"
                >
                  <img
                    alt="User Avatar"
                    src={
                      user?.photoURL ||
                      "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                    }
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-14 md:top-18 right-16 bg-white rounded-xl shadow-xl p-4 min-w-[200px] z-50 space-y-2 text-center"
                  >
                    <p className="text-gray-600 text-lg font-hoover">
                      {user.displayName || user.email}
                    </p>
                    {/* Dashboard Button */}
                    <Link
                      to="/dashboard"
                      className="block w-full text-center bg-[#FF02CB] text-white font-semibold py-2 rounded-lg hover:bg-black cursor-pointer transition"
                    >
                      Dashboard
                    </Link>
                    {/* Sign Out Button */}
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-black cursor-pointer transition"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </>
            )}
            <button
              ref={menuBtnRef}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="p-2 text-2xl text-gray-700 hover:text-[#FF02CB] transition"
            >
              <IoMenu className="text-[#FF02CB]" size={30} />
            </button>
          </div>
        </div>

        {/* Mobile Slide Menu */}
        <div
          className={`fixed top-0 left-0 z-40 h-screen w-2/3 sm:w-1/2 bg-[#EFEAE6]/95 backdrop-blur-md shadow-xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div
            ref={mobileMenuRef}
            className="p-6 flex flex-col justify-center items-center h-full relative"
          >
            <button
              aria-label="Close Menu"
              title="Close Menu"
              className="absolute top-4 right-4 p-2 transition duration-200 rounded hover:bg-gray-200 focus:outline-none"
              onClick={() => setIsMenuOpen(false)}
            >
              <RxCross1 className="w-6 h-6 text-gray-700 hover:text-black transition" />
            </button>

            <ul className="flex flex-col items-center justify-center flex-1 space-y-8 text-xl md:text-2xl font-semibold text-gray-800 text-center">
              {centerNavLinks}
              {!user && (
                <Button
                  text="Sign In"
                  onClick={() => {
                    navigate("/auth/login");
                  }}
                />
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;