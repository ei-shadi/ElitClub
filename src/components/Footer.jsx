import { Link } from "react-router";
import Logo from "../assets/Logo.png";
import SocialBTN from "../shared/SocialBTN";

const Footer = () => {
  return (
    <div className="bg-[#f7dd72]">
      <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-2xl md:px-24 lg:px-8">
        <div className="grid  items-center row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src={Logo} alt="Logo" className="w-20" />
              <h1 className="text-4xl bg-gradient-to-b from-[#1e152a] to-[#FF02CB] bg-clip-text text-transparent">
                EliteClub
              </h1>
            </Link>

            <div className="mt-6 lg:max-w-lg">
              <p className="text-sm text-gray-800">
                <span className="font-hoover text-lg text-[#FF02CB]">EliteClub</span> is your all-in-one solution for managing club memberships, court/session bookings, payments, and admin operations.
              </p>
              <p className="mt-4 text-sm text-gray-800">
                With secure authentication, role-based access, and intuitive dashboards, we empower single-club owners to operate efficiently and focus on delivering the best sports experience.
              </p>
            </div>
          </div>

          {/* Contacts and Social side by side on md+ screens */}
          <div className="sm:col-span-2 flex flex-col flex-wrap md:flex-row justify-between gap- mt-10">
            {/* Features */}
            <div className="text-sm mb-6">
              <p className="text-2xl font-bold tracking-wide text-[#FF02CB] mb-2">Features</p>
              <ul className="space-y-1">
                <li>
                  <Link to="/about-us" className="text-gray-700 hover:text-[#FF02CB] transition">About Us</Link>
                </li>
                <li>
                  <Link to="/blogs" className="text-gray-700 hover:text-[#FF02CB] transition">Blogs</Link>
                </li>
                <li>
                  <Link to="/events" className="text-gray-700 hover:text-[#FF02CB] transition">Events</Link>
                </li>
                <li>
                  <Link to="/membership" className="text-gray-700 hover:text-[#FF02CB] transition">Membership</Link>
                </li>
              </ul>
            </div>


            {/* Contacts */}
            <div className="mb-6 text-sm">
              <p className="text-2xl font-bold tracking-wide text-[#FF02CB]">
                Contacts
              </p>
              <div className="flex my-1">
                <p className="mr-1 text-gray-700 font-semibold">Phone:</p>
                <a
                  href="tel:850-123-5021"
                  aria-label="Our phone"
                  title="Our phone"
                  className="transition-colors duration-300 text-gray-500 hover:text-[#FF02CB]"
                >
                  850-123-5021
                </a>
              </div>
              <div className="flex mb-1">
                <p className="mr-1 text-gray-700 font-semibold">Email:</p>
                <a
                  href="mailto:info@eliteclub.mail"
                  aria-label="Our email"
                  title="Our email"
                  className="transition-colors duration-300 text-gray-500 hover:text-[#FF02CB]"
                >
                  info@eliteclub.mail
                </a>
              </div>
              <div className="flex">
                <p className="mr-1 text-gray-700 font-semibold">Address:</p>
                <a
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Our address"
                  title="Our address"
                  className="transition-colors duration-300 text-gray-500 hover:text-[#FF02CB]"
                >
                  Dhaka Bangladesh
                </a>
              </div>
            </div>

            {/* Social section */}
            <div className="text-sm flex flex-col gap-4">
              <span className="text-2xl font-bold tracking-wide text-[#FF02CB]">
                Social
              </span>
              <SocialBTN />
            </div>
          </div>
        </div>

        {/* Footer bottom section - responsive */}
        <div className="pt-6 pb-10 border-t flex flex-wrap justify-center items-center gap-2 text-center">
          <p>© Copyright 2020</p>
          <h1 className="text-xl bg-gradient-to-br from-[#1e152a] to-[#FF02CB] bg-clip-text text-transparent">
            EliteClub
          </h1>
          <p>All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
