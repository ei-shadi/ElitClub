const AboutClub = () => {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-20 bg-[radial-gradient(circle,_rgba(255,255,255,0.4),_rgba(17,17,17,0.3))]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-8 text-center drop-shadow-sm">
          About <span className="text-[#FF02CB]">Us</span>
        </h2>
        <p className="max-w-3xl mx-auto text-lg font-semibold italic text-gray-700 mb-14 leading-relaxed text-center">
          Welcome to EliteClub, where passion meets performance. As the premier sports hub, we strive to foster talent, wellness, and community.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* History Section */}
          <div className="bg-[#EFEAE6] rounded-2xl p-8 shadow-md transform transition duration-300 hover:rotate-3 hover:shadow-2xl hover:scale-105">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 drop-shadow-xs">
              Our History
            </h3>
            <p className="text-gray-700 leading-relaxed max-w-xl">
              Established in 2010, EliteClub started as a small local sports center. Over the years, we’ve grown into a full-scale sports club with world-class courts, experienced coaches, and a thriving community. Our commitment to excellence has earned us a reputation as a leader in club sports development.
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-[#EFEAE6] rounded-2xl p-8 shadow-md transform transition duration-300 hover:-rotate-3 hover:shadow-2xl hover:scale-105 cursor-pointer text-right">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 drop-shadow-xs">
              Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed max-w-xl mx-auto md:ml-auto">
              Our mission is to inspire a healthy lifestyle through sports, nurture talent across all ages, and build a strong sense of community. We aim to provide accessible, inclusive, and top-tier facilities and programs that encourage active participation and personal growth.
            </p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="mt-16 bg-[#EFEAE6] rounded-2xl p-8 shadow-md transform transition duration-300 hover:rotate-1 hover:shadow-2xl hover:scale-105 cursor-pointer max-w-3xl mx-auto md:text-center">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 drop-shadow-xs">
            Our Vision
          </h3>
          <p className="text-gray-700 leading-relaxed">
            To be the most trusted and respected community sports club in the region, empowering individuals through fitness, friendship, and fun.
            <br />
            We envision a future where every member feels motivated, supported, and inspired to achieve their personal best.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutClub;
