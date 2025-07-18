import { Outlet } from "react-router";
import Navbar from "../components/Navbar";


const AuthLayout = () => {
  return (
    <>
      <header >
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;