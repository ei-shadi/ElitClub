import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
import Courts from "../pages/Courts";
import About from "../pages/About";





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
        path: "/courts",
        Component: Courts
      },
      {
        path: "/about-us",
        Component: About
      }
    ],
  },
]);



export default router;
