import { useState, useEffect, useRef } from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  FaUserCircle,
  FaBullhorn,
  FaBars,
  FaTimes,
  FaCheckCircle,
  FaUsersCog,
  FaUsers,
  FaCalendarCheck,
  FaTags,
} from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import Logo from "../assets/Logo.png";
import Button from "../shared/Button";
import Loader from "../shared/Loader";
import useUserData from "../hooks/useUserData";
import { FaPersonRunning } from "react-icons/fa6";


const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close sidebar on mobile after clicking a link
  const handleMobileNavClick = () => {
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  // Close sidebar if clicking outside (mobile)
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

  // Get User By Email
  const { data: userData, isLoading, error } = useUserData();

  const role = userData?.role;

  if (isLoading) return <Loader />;

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">Failed to load user data.</p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#EFEAE6]">
      {/* Mobile Top-bar */}
      <header className="flex items-center justify-between md:hidden p-4 fixed top-0 left-0 w-full z-40 bg-transparent backdrop-blur-md shadow">
        <Link to="/dashboard" className="flex items-center gap-2">
          <img className="w-14" src={Logo} alt="Logo" />
          <h1 className="text-3xl bg-gradient-to-b from-black to-[#FF02CB] bg-clip-text text-transparent">
            EliteClub
          </h1>
        </Link>
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="text-gray-700 text-2xl z-50"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`bg-white p-6 space-y-6 fixed z-30 w-[290px] lg:w-80
          transition-all duration-300 ease-in-out
          h-[calc(100vh-72px)] top-[72px]
          md:h-screen md:top-0
          ${sidebarOpen
            ? "left-0 translate-x-0 bg-white/60 backdrop-blur-md"
            : "-translate-x-full"
          }
          md:translate-x-0 md:left-0`}
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

        {/* Sidebar Navigation */}
        <nav className="flex flex-col gap-3 my-4 text-left font-hoover">
          {role === "user" && (
            <>
              {/* Profile */}
              <NavLink
                to="/dashboard/profile"
                onClick={handleMobileNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-3 px-4 rounded-lg text-xl ${isActive
                    ? "bg-black text-white"
                    : "text-gray-700 hover:text-white hover:bg-[#FF02CB]"
                  }`
                }
              >
                <FaUserCircle className="text-red-600" /> My Profile
              </NavLink>

              {/* Pending Bookings */}
              <NavLink
                to="/dashboard/pending-bookings"
                onClick={handleMobileNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-3 px-4 rounded-lg text-xl ${isActive
                    ? "bg-black text-white"
                    : "text-gray-700 hover:text-white hover:bg-[#FF02CB]"
                  }`
                }
              >
                <MdPendingActions className="text-cyan-500" /> Pending Bookings
              </NavLink>

              {/* Announcements */}
              <NavLink
                to="/dashboard/announcements"
                onClick={handleMobileNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-3 px-4 rounded-lg text-xl ${isActive
                    ? "bg-black text-white"
                    : "text-gray-700 hover:text-white hover:bg-[#FF02CB]"
                  }`
                }
              >
                <FaBullhorn className="text-orange-400" /> Announcements
              </NavLink>
            </>
          )}


          {/* Member Dashboard routes */}
          {role === "member" && (
            <>
              {/* Profile */}
              <NavLink
                to="/dashboard/profile"
                onClick={handleMobileNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-3 px-4 rounded-lg text-xl ${isActive
                    ? "bg-black text-white"
                    : "text-gray-700 hover:text-white hover:bg-[#FF02CB]"
                  }`
                }
              >
                <FaUserCircle className="text-red-600" /> My Profile
              </NavLink>

              {/* Pending Bookings */}
              <NavLink
                to="/dashboard/pending-bookings"
                onClick={handleMobileNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-3 px-4 rounded-lg text-xl ${isActive
                    ? "bg-black text-white"
                    : "text-gray-700 hover:text-white hover:bg-[#FF02CB]"
                  }`
                }
              >
                <MdPendingActions className="text-cyan-500" /> Pending Bookings
              </NavLink>

              {/* Approved Bookings */}
              <NavLink
                to="/dashboard/approved-bookings"
                onClick={handleMobileNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-3 px-4 rounded-lg text-xl ${isActive
                    ? "bg-black text-white"
                    : "text-gray-700 hover:text-white hover:bg-[#FF02CB]"
                  }`
                }
              >
                <FaCheckCircle className="text-green-600" /> Approved Bookings
              </NavLink>

              {/* Confirmed Bookings */}
              <NavLink
                to="/dashboard/confirmed-bookings"
                onClick={handleMobileNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-3 px-4 rounded-lg text-xl ${isActive
                    ? "bg-black text-white"
                    : "text-gray-700 hover:text-white hover:bg-[#FF02CB]"
                  }`
                }
              >
                <BsBookmarkCheckFill className="text-lime-400" /> Confirmed Bookings
              </NavLink>

              {/* Payment History */}
              <NavLink
                to="/dashboard/payments-history"
                onClick={handleMobileNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-3 px-4 rounded-lg text-xl ${isActive
                    ? "bg-black text-white"
                    : "text-gray-700 hover:text-white hover:bg-[#FF02CB]"
                  }`
                }
              >
                <RiMoneyDollarCircleFill className="text-amber-500" /> Payment History
              </NavLink>

              {/* Announcements */}
              <NavLink
                to="/dashboard/announcements"
                onClick={handleMobileNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-3 px-4 rounded-lg text-xl ${isActive
                    ? "bg-black text-white"
                    : "text-gray-700 hover:text-white hover:bg-[#FF02CB]"
                  }`
                }
              >
                <FaBullhorn className="text-orange-400" /> Announcements
              </NavLink>
            </>
          )}

          {/* Admin Dashboard routes */}
          {role === "admin" && (
            <>
              {/* Profile */}
              <NavLink
                to="/dashboard/profile"
                onClick={handleMobileNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-3 px-4 rounded-lg text-xl ${isActive
                    ? "bg-black text-white"
                    : "text-gray-700 hover:text-white hover:bg-[#FF02CB]"
                  }`
                }
              >
                <FaUserCircle className="text-red-600" /> My Profile
              </NavLink>

              {/* Manage Approval */}
              <NavLink
                to="/dashboard/manage-approval"
                onClick={handleMobileNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-3 px-4 rounded-lg text-xl ${isActive
                    ? "bg-black text-white"
                    : "text-gray-700 hover:text-white hover:bg-[#FF02CB]"
                  }`
                }
              >
                <FaCheckCircle className="text-green-600" /> Manage Approval
              </NavLink>

              {/* Manage Members */}
              <NavLink
                to="/dashboard/manage-members"
                onClick={handleMobileNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-3 px-4 rounded-lg text-xl ${isActive
                    ? "bg-black text-white"
                    : "text-gray-700 hover:text-white hover:bg-[#FF02CB]"
                  }`
                }
              >
                <FaUsersCog className="text-purple-600" /> Manage Members
              </NavLink>

              {/* All Users */}
              <NavLink
                to="/dashboard/all-users"
                onClick={handleMobileNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-3 px-4 rounded-lg text-xl ${isActive
                    ? "bg-black text-white"
                    : "text-gray-700 hover:text-white hover:bg-[#FF02CB]"
                  }`
                }
              >
                <FaUsers className="text-cyan-500" /> All Users
              </NavLink>
              
              {/* Manage Courts */}
              <NavLink
                to="/dashboard/manage-courts"
                onClick={handleMobileNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-3 px-4 rounded-lg text-xl ${isActive
                    ? "bg-black text-white"
                    : "text-gray-700 hover:text-white hover:bg-[#FF02CB]"
                  }`
                }
              >
                <FaPersonRunning className="text-amber-500" /> Manage Courts
              </NavLink>
              
              {/* Manage Bookings */}
              <NavLink
                to="/dashboard/manage-bookings"
                onClick={handleMobileNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-3 px-4 rounded-lg text-xl ${isActive
                    ? "bg-black text-white"
                    : "text-gray-700 hover:text-white hover:bg-[#FF02CB]"
                  }`
                }
              >
                <FaCalendarCheck className="text-emerald-500" /> Manage Bookings
              </NavLink>

              {/* Manage Coupons */}
              <NavLink
                to="/dashboard/manage-coupons"
                onClick={handleMobileNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-3 px-4 rounded-lg text-xl ${isActive
                    ? "bg-black text-white"
                    : "text-gray-700 hover:text-white hover:bg-[#FF02CB]"
                  }`
                }
              >
                <FaTags className="text-pink-500" /> Manage Coupons
              </NavLink>
            </>
          )}

        </nav>

        {/* Return Home Button */}
        <Link
          to="/"
          onClick={handleMobileNavClick}
          className="absolute bottom-5 left-4 text-sm text-gray-400 hover:text-[#FF02CB]"
        >
          <Button text="Return Home" />
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 mt-[72px] md:mt-5 md:ml-[280px] lg:ml-80">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
