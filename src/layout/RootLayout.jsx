import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import ScrollToTop from "../shared/ScrollToTop";


const RootLayout = () => {
  return (
    <>
      <ScrollToTop />

      <header>
        <Navbar />
      </header>

      <main className="bg-[#d9d2c3d2]">
        <Outlet />
      </main>

      <footer >
        <Footer />
      </footer>
    </>
  );
};

export default RootLayout;