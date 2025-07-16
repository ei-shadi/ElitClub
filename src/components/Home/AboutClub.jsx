import { TbLocationFilled } from "react-icons/tb";

const AboutClub = () => {
  return (
    <section className="my-20 md:my-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-600 mb-8 text-center drop-shadow-sm flex items-center justify-center gap-3">
          About <span className="text-[#FF02CB]">Us</span>
          <TbLocationFilled className="rotate-180 text-4xl md:text-5xl" />
        </h2>

        {/* Intro */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl font-semibold italic text-gray-700 mb-10 leading-relaxed text-center">
          Welcome to EliteClub, where passion meets performance. As the premier sports hub, we strive to foster talent, wellness, and community.
        </p>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* History */}
          <div className="relative overflow-hidden rounded-2xl p-8 lg:p-12 shadow-xl transform transition duration-500 hover:-translate-y-4 hover:shadow-2xl hover:scale-[1.03] backdrop-blur-lg bg-gradient-to-br from-pink-400/30 via-white/10 to-fuchsia-400/30 border border-white/20 hover:bg-[#FF02CB]/80 hover:text-white">
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-pink-400 opacity-30 rounded-full blur-3xl z-0"></div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-fuchsia-500 opacity-30 rounded-full blur-3xl z-0"></div>

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 drop-shadow-sm">
                Our History
              </h3>
              <p className="text-gray-800 leading-relaxed max-w-xl hover:text-white transition-colors duration-300">
                Established in 2010, EliteClub started as a small local sports center. Over the years, we’ve grown into a full-scale sports club with world-class courts, experienced coaches, and a thriving community. Our commitment to excellence has earned us a reputation as a leader in club sports development.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="relative overflow-hidden rounded-2xl p-8 lg:p-12 shadow-xl transform transition duration-500 hover:-translate-y-4 hover:shadow-2xl hover:scale-[1.03] backdrop-blur-lg bg-gradient-to-bl from-fuchsia-400/30 via-white/10 to-pink-300/30 border border-white/20 hover:bg-[#FF02CB]/80 hover:text-white text-right">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-fuchsia-400 opacity-30 rounded-full blur-3xl z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-pink-500 opacity-30 rounded-full blur-3xl z-0"></div>

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 drop-shadow-sm">
                Our Mission
              </h3>
              <p className="text-gray-800 leading-relaxed max-w-xl mx-auto text-left hover:text-white transition-colors duration-300">
                Our mission is to inspire a healthy lifestyle through sports, nurture talent across all ages, and build a strong sense of community. We aim to provide accessible, inclusive, and top-tier facilities and programs that encourage active participation and personal growth.
              </p>
            </div>
          </div>
        </div>

        {/* Vision */}
        <div className="mt-16 relative overflow-hidden rounded-2xl p-8 lg:p-12 shadow-xl transform transition duration-500 hover:-translate-y-4 hover:shadow-2xl hover:scale-[1.03] max-w-3xl mx-auto text-center backdrop-blur-lg bg-gradient-to-tr from-pink-300/30 via-white/10 to-fuchsia-400/30 border border-white/20 hover:bg-[#FF02CB]/80 hover:text-white">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-pink-300 opacity-30 rounded-full blur-3xl z-0"></div>
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-fuchsia-500 opacity-30 rounded-full blur-3xl z-0"></div>

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 drop-shadow-sm">
              Our Vision
            </h3>
            <p className="text-gray-800 leading-relaxed hover:text-white transition-colors duration-300">
              To be the most trusted and respected community sports club in the region, empowering individuals through fitness, friendship, and fun.
              <br />
              We envision a future where every member feels motivated, supported, and inspired to achieve their personal best.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutClub;
