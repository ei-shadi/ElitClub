import { Link } from "react-router";
import bgImg from "../../assets/BG.png"; 
import Button from "../../shared/Button";

const Hero = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className=" h-screen flex items-center justify-center px-4 overflow-hidden ">
        {/* Central Content */}
        <div className="relative text-center mx-auto backdrop-blur bg-gradient-to-r from-[#EFEAE6]/60 to-[#EFEAE6]/60 rounded-3xl py-10 max-w-6xl px-6">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-wide bg-gradient-to-b from-[#1e152a] to-[#FF02CB] bg-clip-text text-transparent mb-6 drop-shadow-md">
            EliteClub
          </h1>
          <p className="text-base font-bold sm:text-lg md:text-xl text-gray-800 max-w-3xl mx-auto italic mb-10">
            Manage memberships, court bookings, payments, and operations — all in one sleek platform.
            Built for club owners who demand simplicity, speed, and excellence.
          </p>
          <Link to="/courts" className="flex justify-center">
            <Button text="Get Started" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
