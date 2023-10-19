import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import SignIn from "./pages/Authentication/SignIn";
import LogIn from "./pages/Authentication/LogIn";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShopOwnerHome from "./pages/Shopowner/ShopOwnerHome";
import ShopOwnerApp from "./pages/Shopowner/ShopOwnerApp";

import CustomerApp from "./pages/Customer/CustomerApp";
import CustomerHome from "./pages/Customer/CustomerHome";
import Shopownerprofile from "./pages/Shopowner/Shopownerprofile";
import Shopcustomer from "./pages/Shopowner/Shopcustomer";
import AboutUs from "./pages/AboutUs.js";
import ContactUs from "./pages/ContactUs.js";
import Home from "./pages/Home";

const appRouter = createBrowserRouter([
  {
    path: "/LogIn/:role",
    element: <LogIn />,
  },
  {
    path: "/SignIn/:role",
    element: <SignIn />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/user/shopowner",
    element: <ShopOwnerApp />,
    children: [
      {
        path: "",
        element: <ShopOwnerHome />,
      },
      {
        path: "profile",
        element: <Shopownerprofile />,
      },
      {
        path: "customer",
        element: <Shopcustomer />,
      },
    ],
  },
  {
    path: "/user/Customer",
    element: <CustomerApp />,
    children: [
      {
        path: "",
        element: <CustomerHome />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}></RouterProvider>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
