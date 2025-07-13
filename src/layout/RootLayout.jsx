import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";


const RootLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="h-screen">
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default RootLayout;