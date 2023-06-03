import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SignIn = () => {
  var navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    role: "",
    number: "",
  });

  const [message, setMessage] = useState("");

  function handleData(e) {
    var name = e.target.name;
    var value = e.target.value;
    if (name === "role") {
      if (value === "1") {
        value = "shopowner";
      } else {
        value = "customer";
      }
    }
    setData({ ...data, [name]: value });
  }

  function sendData() {
    fetch("http://localhost:3001/api/v1/authentication/SignIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
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

  return (
    <>
      <Link to="/" className="my-link my-hover-green fs-1 m-3">
        &larr;
      </Link>

      <div
        className="container-sm position-absolute top-50 start-50 translate-middle"
        style={{ background: "hsla(0, 0%, 100%, 0.8)" }}
      >
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

                  <div className="form-outline mb-4">
                    <select
                      className="w-100 p-2  border rounded"
                      aria-label="Default select example"
                      name="role"
                      onChange={handleData}
                      required
                    >
                      <option defaultValue={"select your role"}>
                        Select your role
                      </option>
                      <option value="1">ShopOwner</option>
                      <option value="2">Customer</option>
                    </select>
                  </div>

                  <div className="d-flex justify-content-start mb-4">
                    <Link to="/login">alerday have account</Link>
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
      </div>
    </>
  );
};

export default SignIn;
