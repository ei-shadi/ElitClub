import Hero from "../components/Home/Hero";
import AboutClub from "../components/Home/AboutClub";
import LocationSection from "../components/Home/OurLocation";
import DiscountCoupons from "../components/Home/DiscountCoupons";
import { Helmet } from "react-helmet-async";


const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home - EliteClub</title>
      </Helmet>

      {/* Hero Section */}
      <Hero />
      {/* About Section */}
      <AboutClub />
      {/* Location Section */}
      <LocationSection />
      {/* Promotions Section / Discount Coupons */}
      <DiscountCoupons />
    </>
  );
};

export default Home;