import { TbLocationFilled } from "react-icons/tb";


const AboutClub = () => {
  return (
    <section className="my-20 md:my-32 px-6 ">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-600 mb-8 text-center drop-shadow-sm flex items-center justify-center gap-3">
          About <span className="text-[#FF02CB]">Us</span>
          <TbLocationFilled className='rotate-180 text-4xl md:text-5xl'/>
        </h2>
        <p className="max-w-3xl mx-auto text-lg md:text-xl font-semibold italic text-gray-700 mb-14 leading-relaxed text-center">
          Welcome to EliteClub, where passion meets performance. As the premier sports hub, we strive to foster talent, wellness, and community.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* History Section */}
          <div className="bg-[#EFEAE6] rounded-2xl p-8 lg:p-18 shadow-md transform transition duration-300 hover:-translate-y-4 hover:shadow-2xl hover:scale-105 hover:bg-[#FF02CB] hover:text-white">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 drop-shadow-xs">
              Our History
            </h3>
            <p className="text-gray-700 leading-relaxed max-w-xl">
              Established in 2010, EliteClub started as a small local sports center. Over the years, we’ve grown into a full-scale sports club with world-class courts, experienced coaches, and a thriving community. Our commitment to excellence has earned us a reputation as a leader in club sports development.
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-[#EFEAE6] rounded-2xl p-8 lg:p-18 shadow-md transform transition duration-300 hover:-translate-y-4 hover:shadow-2xl hover:scale-105 text-right hover:bg-[#FF02CB] hover:text-white">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 drop-shadow-xs">
              Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed max-w-xl mx-auto text-left">
              Our mission is to inspire a healthy lifestyle through sports, nurture talent across all ages, and build a strong sense of community. We aim to provide accessible, inclusive, and top-tier facilities and programs that encourage active participation and personal growth.
            </p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="mt-16 bg-[#EFEAE6] rounded-2xl p-8 lg:p-18 shadow-md transform transition duration-300 hover:-translate-y-4 hover:shadow-2xl hover:scale-105 max-w-3xl mx-auto md:text-center hover:bg-[#FF02CB] hover:text-white">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 drop-shadow-xs">
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
