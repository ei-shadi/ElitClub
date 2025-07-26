import Lottie from "lottie-react";
import WelcomeAnimation from "../../assets/Lottie/Welcome.json";

const DashboardHome = () => {
  return (
    <div className="min-h-[90vh]  flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-14 bg-gradient-to-t from-black to-gray-900 text-white rounded-2xl shadow-xl">
      {/* Left Text Section */}
      <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left mt-10 lg:mt-0">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-pink-500 to-purple-500 bg-clip-text text-transparent">
          Welcome to EliteClub Dashboard
        </h1>
        <p className="text-lg md:text-xl font-medium text-gray-300">
          From here, you can control your:
        </p>
        <ul className="text-base md:text-lg list-disc list-inside space-y-1 text-gray-400">
          <li>Profile settings and personal info</li>
          <li>Manage court/session bookings</li>
          <li>Stay updated with announcements from EliteClub</li>
        </ul>

        <div className="mt-6 text-gray-400 text-sm md:text-base leading-relaxed">
          We are building an all-in-one Sports Club Management System (EliteClub)
          to streamline operations for players, coaches, and administrators. Our platform
          supports role-based access, booking, secure payments, live updates, and more —
          ensuring a seamless experience across all devices.
        </div>
      </div>

      {/* Right Animation Section */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <Lottie
          animationData={WelcomeAnimation}
          loop={true}
          className="w-[90%] max-w-md"
        />
      </div>
    </div>
  );
};

export default DashboardHome;
