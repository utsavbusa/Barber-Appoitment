import { useEffect, useState } from "react";
import cookie from "js-cookie";
import {useNavigate} from "react-router-dom";
import { AiFillFolderAdd, AiOutlineClose } from "react-icons/ai";


const Shopownerprofile = () => {

    const[data,setData] = useState({ "services": []});
    const[message,setMessage] = useState("");
    const[inputValue,setInputValue] = useState("");
    const[isupdatebtn,setisupdatbtn] = useState(false);

 
  
    const navigate = useNavigate();

    useEffect(()=>{
        fetch("http://localhost:3001/api/v1/user/shopowner/getprofile", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            token: cookie.get("shopOwnerToken"),
          },
        })
          .then((res) => res.json())
          .then((res) => {
           
            if (res.status === "OK") {
              setData(res.data);
              
            } else if (res.status === "EXPIRED_TOKEN") {
              navigate("/login/shopowner");
            } else {
              setMessage(res.message);
            }
          })
          .catch((e) => console.log("error :" + e));
    },[navigate])

    function sendData(){
        
                fetch("http://localhost:3001/api/v1/user/shopowner/updateprofile", {
                  method: "post",
                  headers: {
                    "Content-type": "application/json",
                    token: cookie.get("shopOwnerToken"),
                  },
                  body: JSON.stringify(data),
                })
                  .then((res) => res.json())
                  .then((res) => {
                    if (res.status === "OK") {
                        console.log("update done");
                      setMessage(res.message);
                    } else if (res.status === "EXPIRED_TOKEN") {
                      navigate("/login/shopowner");
                    } else {
                      setMessage(res.message);
                    }
                  })
                  .catch((e) => console.log("error :" + e));
              
    }

    function handelchange(e){
        setisupdatbtn(true);
        setData({...data,[e.target.name]:e.target.value});
    }

    function getServicesData(e) {
        setisupdatbtn(true);
      setInputValue(e.target.value);
    }
    function addItem() {
      setData(data.services, data.services.push(inputValue));
      setInputValue("");
    }

    const deleteItem = (e) => {
        setisupdatbtn(true);
      const name = e;
      data.services(
        data.services.filter(function (item) {
          return item !== name;
        })
      );
    };


    return (
      <div className=" container overflow-auto" style={{ height: "100vh" }}>
        <div className="container mt-4">
          <h1>Profile </h1>
          <h3>{message}</h3>
          <form className="mb-4">
            {/* name of shop */}
            <div className="mb-4">
              <label className="form-label">ShopOwner Name :</label>
              <input
                style={{ backgroundColor: "#f7f7f8" }}
                type="text"
                name="name"
                className="form-control"
                value={data.name}
                onChange={handelchange}
              ></input>
            </div>

            {/* number of shopowner */}
            <div className="mb-4">
              <label className="form-label">ShopOwner Name :</label>
              <input
                style={{ backgroundColor: "#f7f7f8" }}
                type="number"
                name="number"
                className="form-control"
                value={data.number}
                onChange={handelchange}
              ></input>
            </div>

            {/* email of shopowner */}

            <div className="form-outline mb-4">
              <label className="form-label">Email address :</label>
              <input
                type="email"
                name="email"
                value={data.email}
                className="form-control"
                onChange={handelchange}
                required
              />
            </div>

            {/* address of shopowner */}
            <div className="form-outline mb-4">
              <label className="form-label">Address :</label>
              <textarea
                value={data.address}
                name="address"
                className="form-control"
                rows={3}
                onChange={handelchange}
                title="Error Message"
                required
              />
            </div>

            {/* number of barber */}
            <div className="mb-4">
              <label className="form-label">Barbers :</label>
              <input
                type="number"
                name="barber"
                className="form-control"
                value={data.barber}
                onChange={handelchange}
              ></input>
            </div>

            {/* number of services and which services also */}
            <label className="form-label">Services :</label>
            <div className="form-outline mb-2 d-flex gap-3">
              <input
                type="name"
                placeholder="Enter Services Name"
                className="form-control"
                value={inputValue}
                onChange={getServicesData}
                title="Error Message"
              
              />
              <AiFillFolderAdd
                style={{ color: "#343c6c", fontSize: "2.5rem" }}
                onClick={addItem}
              />
            </div>
            <div
              className={`boxShadow mb-4 xs_width_100 ${
                data.services.length > 0 ? "d-block" : "d-none"
              }`}
              style={{ width: "50%" }}
            >
              <table className="table table-striped border">
                <thead>
                  <tr>
                    <td>Services</td>
                    <td>Delete</td>
                  </tr>
                </thead>
                <tbody>
                  {data.services.map((item) => {
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

            {/* submit button */}
            <button
              className="btn btn-primary btn-block mb-4"
              onClick={sendData}
              disabled={isupdatebtn ? false : true} 
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    );
};

export default Shopownerprofile;