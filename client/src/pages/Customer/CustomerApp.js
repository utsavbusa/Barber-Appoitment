import { useEffect } from "react";
import Cookies from "js-cookie";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useState } from "react";
const CustomerApp = () => {
  var navigate = useNavigate();
  // const [data,setData] = useState({});

  const [isLoggedIn, setLogInStatus] = useState(false);

  useEffect(() => {
    if (!Cookies.get("customerToken")) {
      navigate("/login");
    } else {
      setLogInStatus(true);
    }
  }, [navigate]);
  return (
    <>
      <Header isLoggedIn={isLoggedIn} setLogInStatus={setLogInStatus} />
      <Outlet></Outlet>
      <Footer />
    </>
  );
};
export default CustomerApp;
