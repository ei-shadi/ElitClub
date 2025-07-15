import Hero from "../components/Home/Hero";
import AboutClub from "../components/Home/AboutClub";
import LocationSection from "../components/Home/LocationSection";


const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero />
      {/* About Section */}
      <AboutClub />
      {/* Location Section */}
      <LocationSection />
    </div>
  );
};

export default Home;