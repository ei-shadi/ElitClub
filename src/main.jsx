import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router";
import router from "./routes/Router.jsx";
// import { HelmetProvider } from 'react-helmet-async';
// import AuthProvider from "./Provider/AuthProvider";



createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <HelmetProvider> */}
      {/* <AuthProvider> */}
        {/* <Toaster position="top-center" richColors /> */}
        <RouterProvider router={router} />
      {/* </AuthProvider> */}
    {/* </HelmetProvider> */}
  </StrictMode>,
)
