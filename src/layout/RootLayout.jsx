import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";


const RootLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="min-h-[calc(100vh-537.94px)]">
        <Outlet />
      </main>

      <footer>
    <Footer />
      </footer>
    </>
  );
};

export default RootLayout;