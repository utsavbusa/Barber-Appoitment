import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { json, useNavigate } from "react-router-dom";

const CustomerHome = () => {

  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [search,setSearchData] = useState([]);
  const [isBooked,setIsBooked] = useState(Cookies.get('isBooked'));
  const [bookedShopId,setBookedShopId] = useState({});
  useEffect(() => {
    fetch("http://localhost:3001/api/v1/user/customer/shoplist", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "token": Cookies.get("customerToken")
      }
    }).then(res => res.json())
      .then(res => {
        if (res.status === "OK") {
          setdata(res.data);
          setSearchData(res.data);
        }
        else if (res.status === "EXPIRED_TOKEN") {
          navigate("/Login/customer");
        }else if(res.status === "X"){
          console.log("somethig is wrong");
        }

      })
      .catch(e => console.log("error : " + e));
  },[]);

  console.log(isBooked);


  async function booked(shopId){
    // console.log(typeof(bookedShopId));
    // console.log(bookedShopId);
    const data = { shopId, isBooked :"TRUE"};
    if(isBooked === "FALSE"){
      console.log("creae");
    await fetch("http://localhost:3001/api/v1/user/customer/bookAppoitment",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": Cookies.get("customerToken")
      },
      body: JSON.stringify(data)
    }).then((res) => res.json())
      .then((res) => {
        if (res.status === "OK") {
          setIsBooked("TRUE");
          console.log(res.data);
        }
      })
      .catch((e) => {
        return console.log(e);
      });
    }
    else{
      console.log("delete");
      shopId ='';
      const data = {shopId,isBooked: "FALSE" };
      await fetch("http://localhost:3001/api/v1/user/customer/bookAppoitment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": Cookies.get("customerToken")
        },
        body: JSON.stringify(data)
      }).then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.status === "OK") {
            console.log(res.data);
            setIsBooked("FALSE");
          }
          else if (res.status === "X") {
            console.log("somethig is wrong");
          }
        })
        .catch((e) => {
          return console.log(e);
        });
    }

  }


  function filterData(){
    if(searchQuery != ''){
      const filteredData = search.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
      setSearchData([...filteredData]);
    }
    else{
      setSearchData([...data])
    }
    
  }
  return (
    <>

        <form className="form-inline d-flex p-2 " style={{width:"20rem"}}>
        <input className="form-control mr-sm-2 " type="search" placeholder="Search" aria-label="Search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        <button className="btn btn-outline-success my-2 my-sm-0 mx-2" type="button" onClick={() => { filterData()}}>Search</button>
        </form>
      <table className="table table-striped border">
        <thead>
          <tr>
            <th scope="col">No of Barber</th>
            <th scope="col">shop name</th>
            <th scope="col">Mobile no</th>
            <th scope="col">Book</th>
          </tr>
        </thead>
        <tbody>
          {
            search.map((obj,index)=>{
              return (
                <tr key={index}>
                  <th scope="row">{obj.barber}</th>
                  <td>{obj.name}</td>
                  <td>{obj.number}</td>
                  <td><button className={isBooked === "TRUE" && bookedShopId.shopId == obj._id ? "btn btn-danger" : "btn btn-primary"} onClick={() => {
                    setBookedShopId((pri) => {pri.shopId = obj._id;return pri;});
                    
                    booked(obj._id);
                    
                    }}>book</button></td>
                </tr>
              )
            })
          }
        
        </tbody>
      </table>
    </>
  );
};

export default CustomerHome;
