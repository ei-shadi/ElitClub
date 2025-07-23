import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
import Courts from "../pages/Courts";
import FAQ from "../pages/FAQ";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "../provider/PrivateRoute";
import Loader from "../shared/Loader";
import ErrorPage from "../pages/Error";




const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <Loader />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "courts",
        hydrateFallbackElement: <Loader />,
        Component: Courts,
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
    errorElement: <ErrorPage />,
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
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <Loader />,
    element: <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
]);



export default router;
