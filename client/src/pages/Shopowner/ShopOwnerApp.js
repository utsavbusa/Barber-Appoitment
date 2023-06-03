import Footer from "../../components/Footer";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import cookie from "js-cookie";

const ShopOwnerApp = (props) => {
  var navigate = useNavigate();
  const [shopownerdata, setshopownerdata] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!cookie.get("shopOwnerToken")) {
      console.log("cookies not found");
      navigate("/login");
    } else {
      fetch("http://localhost:3001/api/v1/user/shopowner/getprofile", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          token: cookie.get("ShopOwnerToken"),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === "OK") {
            setshopownerdata(res.data);
            console.log(setshopownerdata);
          } else if (res.status === "EXPIRED_TOKEN") {
            // navigate("/login/shopowner");
          } else {
            setMessage(res.message);
          }
        })
        .catch((e) => console.log("error :" + e));
    }
  }, [navigate]);

  function logOut() {
    cookie.remove("shopOwnerToken");
    navigate("/");
  }

  return (
    <>
      <button
        onClick={logOut}
        className="list-group-item text-center p-3 text-danger list-group-item-action"
      >
        Log Out
      </button>

      <Outlet />

      <Footer></Footer>
    </>
  );
};
export default ShopOwnerApp;
