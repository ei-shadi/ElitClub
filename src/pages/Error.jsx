import { Link } from "react-router";
import { FaRegSadTear } from "react-icons/fa";
import Lottie from "lottie-react";
import ErrorAnimation from "../assets/Lottie/404 Error Page.json";
import Button from "../shared/Button";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen  bg-gradient-to-t from-black text-white flex flex-col items-center justify-center px-4 py-10 text-center">
      {/* Animation */}
      <div className="w-full max-w-[500px] h-[300px] md:h-[400px]">
        <Lottie animationData={ErrorAnimation} loop={true} />
      </div>

      {/* Title */}
      <h1 className="text-white text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center gap-2">
        <FaRegSadTear className="text-white text-4xl md:text-5xl" />
        Page Not Found
      </h1>

      {/* Description */}
      <p className="text-white text-base md:text-lg mb-6 max-w-xl px-2">
        Oops! The page you are looking for doesn't exist or may have been moved.
      </p>

      {/* Button */}
      <Link to="/">
        <Button text="Go Back" />
      </Link>
    </div>
  );
}
