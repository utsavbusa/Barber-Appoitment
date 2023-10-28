// import { useState } from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie"; 
import { useNavigate } from "react-router-dom";
import { GiCheckMark } from "react-icons/gi";
const Shopcustomer = () => {

    // const [newCustomer,setNewCustomer] = useState(false);
  const navigate = useNavigate();
  const [data,setdata] = useState([]);
  const [newCustomer, setNewCustomer] = useState({name:"",number:""})
  const [message,setMessage] = useState("");
  // const dataLength = data.length;
    
  useEffect(() => {
    fetch("http://localhost:3001/api/v1/user/shopowner/customerlist", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "token": Cookies.get("shopOwnerToken")
      }
    }).then(res => res.json())
      .then(res => {
        if (res.status === "OK") {
          setdata(res.data);
        }
        else if (res.status === "EXPIRED_TOKEN") {
          navigate("/Login/shopowner");
        }

      })
      .catch(e => console.log("error : " + e));
  }, [navigate]);

  console.log(data);

  function addCustomer (){
    fetch("http://localhost:3001/api/v1/user/shopowner/addcustomerlist", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "token": Cookies.get("shopOwnerToken")
      },
      body: JSON.stringify(newCustomer)
    }).then(res => res.json())
      .then(res => {
        if (res.status === "OK") {
          setMessage(res.message)
          setdata([...data, newCustomer])
        }
        else if (res.status === "EXPIRED_TOKEN") {
          navigate("/Login/shopowner");
        }

      })
      .catch(e => console.log("error : " + e));
  

    setNewCustomer({name:"",number:""})
  }

  function updateCustomerList(id){
    console.log(id);
    fetch("http://localhost:3001/api/v1/user/shopowner/updatecustomerlist/"+id, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "token": Cookies.get("shopOwnerToken")
      },
      body: JSON.stringify(newCustomer)
    }).then(res => res.json())
      .then(res => {
        if (res.status === "OK") {
          setMessage(res.message)
          const tempData = data.filter((item) => item._id !== id);
          setdata(tempData);
        }
        else if (res.status === "EXPIRED_TOKEN") {
          navigate("/Login/shopowner");
        }

      })
      .catch(e => console.log("error : " + e));
  }
    return (
      <>
        <div className="container mt-3 mr-4 w-100 ">
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: "#f7f7f8" }}
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Add new customer
          </button>
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title" id="staticBackdropLabel">
                    Add new customer
                  </h3>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form className="mb-4">
                    <div className="mb-3">
                      <label htmlFor="formGroupExampleInput" className="form-label">
                        Enter a Customer name :
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder="Name "
                        style={{ backgroundColor: "#f7f7f8" }}
                        value={newCustomer.name}
                        onChange={(e)=>{setNewCustomer({...newCustomer, name:e.target.value})}}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="formGroupExampleInput" className="form-label">
                        Enter a Customer number :
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder="Number "
                        style={{ backgroundColor: "#f7f7f8" }}
                        value={newCustomer.number}
                        onChange={(e) => { setNewCustomer({ ...newCustomer, number: e.target.value }) }}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" onClick={() => { addCustomer() }} className="btn btn-success" data-bs-dismiss="modal">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        {
            data.length === 0 ? <h4 className="my-2 text-danger">There wiil be no customer in waiting list</h4> : <h4 className="my-2">There will be {data.length} customer in waiting list </h4>
        }
        {/* message is not empty so i will put popbox which so the message and after automaticaly remove 2 sec please write code */}
          {
            message && <div className="alert alert-success alert-dismissible fade show" role="alert">
              <strong>{message}</strong>
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          }

          {/* boostrap table  */}
          <table className="table table-striped mt-2">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Customer Name : </th>
                <th scope="col">Mobile no:</th>
                <th scope="col">is completted</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((obj, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{obj.name}</td>
                      <td>{obj.number}</td>
                      <td onClick={()=>{updateCustomerList(obj._id)}} style={{cursor:"pointer"}}><GiCheckMark /></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        
      </>
    );
};
export default Shopcustomer;