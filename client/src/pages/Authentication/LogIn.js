import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import cookie from "js-cookie";

const LogIn = (props) => {
  const { role } = useParams();

  const [data, setData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  var navigate = useNavigate();

  function handleData(e) {
    var name = e.target.name;
    var value = e.target.value;
    setData({ ...data, [name]: value });
  }

  function sendData(e) {
    e.preventDefault();

    fetch(
      `http://localhost:3001/api/v1/authentication/${
        role === "customer" ? "customer/LogIn" : "shopowner/LogIn"
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "OK") {
          if (role === "customer") {
            cookie.set("customerToken", res.token, {
              expires: new Date().getTime() + 2 * 1000 * 3600,
            });
            cookie.set("customerName", res.customerName,{
              expires: new Date().getTime() + 2 * 1000 * 3600,
            });
            cookie.set("isBooked", res.isBooked, {
              expires: new Date().getTime() + 2 * 1000 * 3600,
            })
            console.log(res.customerName);
            navigate("/user/customer");
          }
          if (role === "shopowner") {
            cookie.set("shopOwnerToken", res.token, {
              expires: new Date().getTime() + 2 * 1000 * 3600,
            });
            navigate("/user/shopowner");
          }
        }
        setMessage(res.message);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <Link to="/" className="my-link my-hover-green fs-1 m-3">
        &larr;
      </Link>

      <div
        className="container-sm top-10 "
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
                  <h2 className="fw-bold mb-4">Sign up now</h2>
                  <h3 className="text-danger mb-4">{message}</h3>
                  <form>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        placeholder="Email"
                        className="form-control"
                        name="email"
                        onChange={handleData}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        name="password"
                        onChange={handleData}
                      />
                    </div>

                    <div className="d-flex justify-content-start mb-4">
                      <Link to={`/SignIn/${role}`}>don't have an account?</Link>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                      onClick={sendData}
                    >
                      Sign up
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LogIn;
