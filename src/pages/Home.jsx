import Hero from "../components/Home/Hero";
import AboutClub from "../components/Home/AboutClub";
import LocationSection from "../components/Home/LocationSection";
import DiscountCoupons from "../components/Home/DiscountCoupons";


const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero />
      {/* About Section */}
      <AboutClub />
      {/* Location Section */}
      <LocationSection />
      {/* Promotions Section / Discount Coupons */}
      <DiscountCoupons />
    </div>
  );
};

export default Home;