import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";

function App() {
  function Customer() {
    return (
      <>
        <div className="card" style={{ width: "18rem" }}>
          <img src="/images/customer.png" className="card-img-top" alt="..." />
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
  return (
    <>
      <Header />
      <Link to="">
        <Customer />
      </Link>

      <Footer />
    </>
  );
}

export default App;
