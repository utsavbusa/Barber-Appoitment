
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
// import { useEffect } from "react";
import cookie from "js-cookie";
import {AiOutlineClose} from "react-icons/ai";
import { HiOutlineViewList} from "react-icons/hi";

const ShopOwnerApp = (props) => {
  var navigate = useNavigate();
  // const [shopownerdata, setshopownerdata] = useState([]);
  // const [message, setMessage] = useState("");
    const [isExpanded, setExpendState] = useState(false);

    const menuItems = [
      {
        text: "Dashboard",
        icon: "/images/grid.svg",
        path: "/user/shopowner/customer",
      },
      {
        text: "Admin Profile",
        icon: "/images/user.svg",
        path: "/user/shopowner/profile",
      },
      {
        text: "Customer",
        icon: "/images/folder.svg",
        path: "/user/shopowner/customer",
      },
    ];

  // useEffect(() => {
    
  //   if (!cookie.get("shopOwnerToken")) {
  //     console.log("cookies not found");
  //     navigate("/login");
  //   } else {
  //     fetch("http://localhost:3001/api/v1/user/shopowner/getprofile", {
  //       method: "GET",
  //       headers: {
  //         "Content-type": "application/json",
  //         "token": cookie.get("shopOwnerToken")
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((res) => {
        
  //         if (res.status === "OK") {
  //           setshopownerdata(res.data);
  //         } else if (res.status === "EXPIRED_TOKEN") {
  //           navigate("/login/shopowner");
  //         } else {
  //           setMessage(res.message);
  //         }
  //       })
  //       .catch((e) => console.log("error :" + e));
  //   }
  // }, [navigate]);

  function logOut() {
    cookie.remove("shopOwnerToken");
    navigate("/");
  }

  return (
    <>
      <div className="d-flex gap-4" style={{ backgroundColor: " #DFE5EF" }}>
        <div
          className={
            isExpanded
              ? "side-nav-container"
              : "side-nav-container side-nav-container-NX"
          }
        >
          <div className="nav-upper">
            <div
              className={`d-flex ${
                isExpanded
                  ? "justify-content-center"
                  : "justify-content-start p-2"
              } pt-3`}
              style={{ paddingLeft: "4px" }}
            >
              <div>
                {isExpanded && (
                  <div className="nav-brand d-flex">
                    <img src="images/Logo.svg" alt="" srcset="" />
                    <h2>appoitment </h2>
                  </div>
                )}
              </div>
              <div
                className="px-3 d-flex align-items-center justify-content-center"
                onClick={() => setExpendState(!isExpanded)}
              >
                {isExpanded ? (
                  <AiOutlineClose size={30} />
                ) : (
                  <HiOutlineViewList size={30} />
                )}
              </div>
            </div>
            <div style={{ marginTop: "30px" }}>
              {menuItems.map(({ text, icon ,path }) => (
                <Link 
                to={path}
                  className={`text-uppercase text-color-light d-flex ${
                    isExpanded
                      ? "justify-content-start pl-2 gap-2"
                      : "justify-content-center my-3 p-2"
                  } align-items-center nav-item`}
                  style={{
                    fontSize: "1rem",
                    margin: `${isExpanded ? "4px 20px" : "8px"}`,
                  }}
                  href="#"
                >
                  <div>
                    <img
                      style={{
                        margin: `${isExpanded ? "4px 20px" : "8px"}`,
                        color: "black",
                      }}
                      src={icon}
                      width={30}
                      alt=""
                      srcset=""
                    />
                  </div>
                  <div>
                    {isExpanded && <p style={{ margin: "10px" }}>{text}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="nav-footer">
            <div
              className={`pi-auto d-flex ${
                isExpanded ? "justify-content-around" : "justify-content-center"
              }`}
            >
              {isExpanded && (
                <div className="d-flex">
                  <img
                    src="/images/admin-avatar.svg"
                    alt=""
                    style={{ width: "100px", padding: "0 20px" }}
                    srcset=""
                  />
                  <div className="nav-footer-info">
                    <p style={{ fontSize: "18px", fontWeight: "900" }}>hrsu</p>
                    <p style={{ marginTop: "-15px", color: "gray" }}>
                      Master admin
                    </p>
                  </div>
                </div>
              )}
              <img
                style={{ margin: `${isExpanded ? "4px 20px" : "8px"}` }}
                src="/images/logout.svg"
                width={35}
                onClick={logOut}
                alt=""
                srcset=""
              />
            </div>
          </div>
        </div>
        <Outlet/>
      </div>
      {/* <button
        onClick={logOut}
        className="list-group-item text-center p-3 text-danger list-group-item-action"
      >
        Log Out
      </button> */}

      {/* <Footer></Footer> */}
    </>
  );
};
export default ShopOwnerApp;
