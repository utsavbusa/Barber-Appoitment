import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const SignIn = () => {
  var navigate = useNavigate();
  const { role } = useParams();

  const [cdata, setCData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    number: "",
  });
  const [sdata, setSData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    number: "",
    address: "",
    services: [],
    barber: "",
  });

  const [message, setMessage] = useState("");

  function handleData(e) {
    console.log(cdata);
    var name = e.target.name;
    var value = e.target.value;
    if (role === "customer") {
      setCData({ ...cdata, [name]: value });
    } else {
      setSData({ ...sdata, [name]: value });
    }
  }

  function sendData() {
    fetch(
      `http://localhost:3001/api/v1/authentication/${
        role === "customer" ? "customer/SignIn" : "shopowner/SignIn"
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(() => {
          return role === "customer" ? cdata : sdata;
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "OK") {
          navigate("/login");
          return;
        } else {
          setMessage(res.message);
          return;
        }
      })
      .catch((e) => {
        return console.log(e);
      });
  }

  function CustomerSignIn() {
    return (
      <>
        <section className="text-center">
          <div
            className="p-5 bg-image"
            style={{
              backgroundImage:
                "url('/images/authitication_form_background.jpg')",

              height: "300px",
            }}
          ></div>

          <div
            className="card mx-4 mx-md-5 shadow-5-strong"
            style={{
              marginTop: "-100px",
              background: "hsla(0, 0%, 100%, 0.8)",
              backdropFilter: "blur(30px)",
            }}
          >
            <div className="card-body py-5 px-md-5">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-8">
                  <h2 className="fw-bold mb-4">Sign In now</h2>
                  <h3 className="text-danger mb-4">{message}</h3>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      className="form-control"
                      onChange={handleData}
                      required
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      className="form-control"
                      onChange={handleData}
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="number"
                      placeholder="Enter mobile Number"
                      name="number"
                      className="form-control"
                      onChange={handleData}
                      title="Error Message"
                      pattern="[1-9]{1}[0-9]{9}"
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      className="form-control"
                      onChange={handleData}
                      required
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      placeholder="Cpassword"
                      name="cpassword"
                      className="form-control"
                      onChange={handleData}
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-start mb-4">
                    <Link to={`/login/customer`}>alerday have account</Link>
                  </div>
                  <button
                    className="btn btn-primary btn-block mb-4"
                    onClick={sendData}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
  function ShopownerSignIn() {
    return <>utsav busa</>;
  }

  return (
    <>
      <Link to="/" className="my-link my-hover-green fs-1 m-3">
        &larr;
      </Link>

      <div
        className="container-sm top-10"
        style={{ background: "hsla(0, 0%, 100%, 0.8)" }}
      >
        {role === "customer" ? <CustomerSignIn /> : <ShopownerSignIn />}
      </div>
    </>
  );
};

export default SignIn;
