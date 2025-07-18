import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
import Courts from "../pages/Courts";
import FAQ from "../pages/FAQ";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";




const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "courts",
        Component: Courts
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
    children: [
      {
        path: "sign-in",
        Component: Login
      },
      {
        path: "sign-up",
        Component: Register
      }
    ],
  },
  {
    path: "/dashboard",
    element: <h1>Dashboard</h1>
  }
]);



export default router;
