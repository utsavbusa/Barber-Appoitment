// import { useState } from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie"; 
import { useNavigate } from "react-router-dom";

const Shopcustomer = () => {

    // const [newCustomer,setNewCustomer] = useState(false);
  const navigate = useNavigate();
  const [data,setdata] = useState([]);
  const [newCustomer, setNewCustomer] = useState({})
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
          setdata(res.data.list);
        }
        else if (res.status === "EXPIRED_TOKEN") {
          navigate("/Login/shopowner");
        }

      })
      .catch(e => console.log("error : " + e));
  }, []);

  console.log(data);
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
            tabindex="-1"
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
                      <label for="formGroupExampleInput" className="form-label">
                        Enter a Customer name :
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder="Name "
                        style={{ backgroundColor: "#f7f7f8" }}
                        onChange={(e)=>{setNewCustomer({...newCustomer, customerName:e.target.value})}}
                      />
                    </div>
                    <div className="mb-3">
                      <label for="formGroupExampleInput" className="form-label">
                        Enter a Customer number :
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder="Number "
                        style={{ backgroundColor: "#f7f7f8" }}
                        onChange={(e) => { setNewCustomer({ ...newCustomer, customerNumber: e.target.value }) }}
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
                  <button type="button" className="btn btn-success">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        {
            !data ? <h4 className="my-2 text-danger">There wiil be no customer in waiting list</h4> : <h2>There will be {data.length} customer in waiting list </h2>
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
                data.map((obj)=>{

                })
              }
            </tbody>
          </table>
          {/* {!newCustomer ? (
            " "
          ) : (
            <form className="mb-4">
              <div className="mb-3">
                <label for="formGroupExampleInput" className="form-label">
                  Enter a Customer name :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput"
                  placeholder="Enter a Customer name "
                />
              </div>
              <div className="mb-3">
                <label for="formGroupExampleInput" className="form-label">
                  Enter a Customer number :
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="formGroupExampleInput"
                  placeholder="Enter a Customer number "
                />
              </div>
              <button type="submit" className="btn btn-primary ">
                Add
              </button>
            </form>
          )} */}
        </div>
        
      </>
    );
};
export default Shopcustomer;