import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { AiFillFolderAdd, AiOutlineClose } from "react-icons/ai";

const SignIn = () => {

  var navigate = useNavigate();
  const { role } = useParams();
    let [inputValue, setInputValue] = useState("");
    const [servicesData, setservicesData] = useState([]);

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
   
    var name = e.target.name;
    var value = e.target.value;
    if (role === "customer") {
      setCData({ ...cdata, [name]: value });
    } else {
      setSData({ ...sdata, [name]: value });
    }
  }
  function getServicesData(e) {
    setInputValue(e.target.value);
  }
  function addItem() {

      setservicesData(servicesData, servicesData.push(inputValue));
      setInputValue("");
    
   
  }
  const deleteItem = (e) => {
    const name = e;
    setservicesData(
      servicesData.filter(function (item) {
        return item !== name;
      })
    );
   
  };


  function sendData(data) {
    fetch(
      `http://localhost:3001/api/v1/authentication/${
        role === "customer" ? "customer/SignIn" : "shopowner/SignIn"
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
         if(role === "customer"){
          navigate("/Login/customer");
         }
         else{
           navigate("/Login/shopowner");
         }
          return;
        } else {
          setMessage(res.messgae);
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
        className="container-sm top-10"
        style={{ background: "hsla(0, 0%, 100%, 0.8)" }}
      >
        {role === "customer" ? (
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
                        value={cdata.name}
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
                        name="email"
                        placeholder="Email"
                        value={cdata.email}
                        className="form-control"
                        onChange={handleData}
                        required
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="number"
                        value={cdata.number}
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
                        value={cdata.password}
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
                        value={cdata.cpassword}
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
                      onClick={() => sendData(cdata)}
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
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
                    <h2 className="fw-bold mb-4">Sign In For ShopOwner</h2>
                    <h3 className="text-danger mb-4">{message}</h3>

                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        value={sdata.name}
                        placeholder="Enter Shop Name"
                        name="name"
                        className="form-control"
                        onChange={handleData}
                        required
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={sdata.email}
                        className="form-control"
                        onChange={handleData}
                        required
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="number"
                        value={sdata.number}
                        placeholder="Enter mobile Number"
                        name="number"
                        className="form-control"
                        onChange={handleData}
                        title="Error Message"
                        pattern="[1-9]{1}[0-9]{9}"
                        required
                      />
                    </div>
                    <div className="form-outline mb-4 d-flex gap-3">
                      <input
                        type="name"
                        placeholder="Enter Services Name"
                        className="form-control"
                        value={inputValue}
                        onChange={getServicesData}
                        title="Error Message"
                        required
                      />
                      <AiFillFolderAdd
                        style={{ color: "#343c6c", fontSize: "2.5rem" }}
                        onClick={addItem}
                      />
                    </div>

                    <div
                      className={`boxShadow mb-4 p-2 xs_width_100 ${
                        servicesData.length > 0 ? "d-block" : "d-none"
                      }`}
                      style={{ width: "50%" }}
                    >
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <td>Services</td>
                            <td>Delete</td>
                          </tr>
                        </thead>
                        <tbody>
                          {servicesData.map((item) => {
                            return (
                              <tr>
                                <td>{item}</td>
                                <td>
                                  <AiOutlineClose
                                    style={{
                                      color: "#343c6c",
                                      fontSize: "1.5rem",
                                    }}
                                    onClick={() => {
                                      deleteItem(item);
                                    }}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="number"
                        value={sdata.barber}
                        placeholder="Enter Number of barber"
                        name="barber"
                        className="form-control"
                        onChange={handleData}
                        title="Error Message"
                        required
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <textarea
                        value={sdata.address}
                        placeholder="Enter Your Shop Address"
                        name="address"
                        className="form-control"
                        rows={3}
                        onChange={handleData}
                        title="Error Message"
                        required
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        value={sdata.password}
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
                        value={sdata.cpassword}
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
                      onClick={() => {
                        sdata.services = servicesData;
                        sendData(sdata);
                      }}
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default SignIn;
