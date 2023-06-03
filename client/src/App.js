import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";

function App() {
  function Customer() {
    return (
      <>
        <div
          className="card border_none"
          style={{
            width: "18rem",
            boxShadow: " rgba(0, 0, 0, 0.1) 0px 4px 12px",
          }}
        >
          <img
            src="/images/customer.png"
            className="card-img-top"
            alt="customer "
          />
          <div className="card-body">
            <h5 className="card-title">Customer </h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </>
    );
  }

  function ShopOwner() {
    return (
      <>
        <div
          className="card border_none"
          style={{
            width: "18rem",
            boxShadow: " rgba(0, 0, 0, 0.1) 0px 4px 12px",
          }}
        >
          <img
            src="/images/shopowner.png"
            className="card-img-top"
            alt="shopowner_image "
          />
          <div className="card-body">
            <h5 className="card-title">ShopOwner </h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Header />
      <div className="container my-5 d-flex justify-content-around ">
        <div>
          <Link to={`/Login/customer`}>
            <Customer />
          </Link>
        </div>
        <div>
          <Link to={`/Login/shopowner`}>
            <ShopOwner />
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
