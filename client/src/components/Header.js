import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import React from "react";

const Header = (props) => {
  var navigate = useNavigate();
  function IfLogged() {
    if (!props.isLoggedIn) {
      return (
        <li className="">
          <Link to="/login">
            <button className="btn btn-outline-secondary ms-2" type="button">
              Sign In / Sign Up
            </button>
          </Link>
        </li>
      );
    } else {
      return (
        <>
          <li className=" dropdown">
            <button
              className="btn px-4 fw-bolder rounded-pill btn-outline-success mx-3 "
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {props.name.toUpperCase()[0]}
            </button>
            <ul className="dropdown-menu">
              <li>
                <button onClick={removeToken} className="dropdown-item">
                  Log out
                </button>
              </li>
            </ul>
          </li>
        </>
      );
    }
  }
  function removeToken() {
    Cookies.remove("customerToken");
    props.setLogInStatus(false);
    navigate("/");
  }
  // function changesState() {
  //   console.log("hit");
  //   setShowStates(!showStates);
  // }
  // function ShowModel() {
  //   console.log(showStates);
  //   if (showStates === false) {
  //     return <></>;
  //   } else {
  //     return <Model />;
  //   }
  // }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark ">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand text-light">
            Appoitment
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-coreui-toggle="collapse"
            data-coreui-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link text-light"
                  aria-current="page"
                  href="#"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link text-light" href="#">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link text-light" href="#">
                  Contact
                </Link>
              </li>
              <IfLogged />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
