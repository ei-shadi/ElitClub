import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
import Courts from "../pages/Courts";
import FAQ from "../pages/FAQ";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import axios from "axios";
import Loader from "../shared/Loader";




const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    hydrateFallbackElement: <Loader />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "courts",
        Component: Courts,
        hydrateFallbackElement: <Loader />,
        loader: () => axios.get(`${import.meta.env.VITE_API_URL}/courts-data`)
      },
      {
        path: "faq",
        Component: FAQ
      }
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    hydrateFallbackElement: <Loader />,
    children: [
      {
        path: "login",
        Component: Login
      },
      {
        path: "register",
        Component: Register
      }
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
]);



export default router;
