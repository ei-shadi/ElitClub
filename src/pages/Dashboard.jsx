import { Link, NavLink, Outlet } from "react-router";
import {
  FaUserCircle,
  FaBullhorn,
  FaBars,
  FaClock,
  FaTimes,
} from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import Button from "../shared/Button";
import Logo from "../assets/Logo.png";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleMobileNavClick = () => {
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarOpen &&
        window.innerWidth < 768 &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#EFEAE6]">
      {/* Mobile Top-bar */}
      <header className="flex items-center justify-between md:hidden p-4 transition-all duration-300 fixed top-0 left-0 w-full z-30 bg-transparent backdrop-blur-md shadow">
        <Link to="/">
          <div className="flex items-center gap-2">
            <img className="w-14" src={Logo} alt="Logo" />
            <h1 className="text-3xl bg-gradient-to-b from-black to-[#FF02CB] bg-clip-text text-transparent">
              EliteClub
            </h1>
          </div>
        </Link>
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="text-gray-700 text-2xl z-40"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`md:bg-white fixed md:static z-20 top-[72px] md:top-0 left-0 h-screen w-68 lg:w-80 transform transition-transform duration-300 ease-in-out 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 bg-transparent backdrop-blur-md shadow-md p-6 space-y-6`}
      >
        {/* Desktop Logo */}
        <Link
          to="/dashboard"
          className="hidden md:flex items-center gap-3 mb-8 hover:opacity-80"
        >
          <img src={Logo} alt="Website Logo" className="h-12 w-12 object-contain" />
          <h1 className="text-3xl bg-gradient-to-b from-black to-[#FF02CB] bg-clip-text text-transparent">
            EliteClub
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 my-4">
          <NavLink
            to="/dashboard/profile"
            onClick={handleMobileNavClick}
            className={({ isActive }) =>
              `flex items-center gap-2 py-3 px-4 rounded-lg font-hoover text-xl w-full mx-auto ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-700 hover:text-white hover:bg-[#FF02CB]"
              }`
            }
          >
            <FaUserCircle /> Profile
          </NavLink>

          <NavLink
            to="/dashboard/pending-bookings"
            onClick={handleMobileNavClick}
            className={({ isActive }) =>
              `flex items-center gap-2 py-3 px-4 rounded-lg font-hoover text-xl w-full mx-auto ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-700 hover:text-white hover:bg-[#FF02CB]"
              }`
            }
          >
            <FaClock /> Pending Bookings
          </NavLink>

          <NavLink
            to="/dashboard/announcements"
            onClick={handleMobileNavClick}
            className={({ isActive }) =>
              `flex items-center gap-2 py-3 px-4 rounded-lg font-hoover text-xl w-full mx-auto ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-700 hover:text-white hover:bg-[#FF02CB]"
              }`
            }
          >
            <FaBullhorn /> Announcements
          </NavLink>
        </nav>

        <Link
          to="/"
          onClick={handleMobileNavClick}
          className="absolute bottom-24 md:bottom-5 left-4 text-sm text-gray-400 hover:text-[#FF02CB]"
        >
          <Button text="Return Home" />
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 mt-[72px] md:mt-0 md:ml-5">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
