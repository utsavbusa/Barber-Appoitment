import { useState, useEffect } from "react";

function usegetcustomerlist(data){
    const [arrayValues, setArrayValues] = useState([]);
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
                    setArrayValues(res.data.list);
                }
                else if (res.status === "EXPIRED_TOKEN") {
                    Navigate("/login");
                }

            })
            .catch(e => console.log("error : " + e));
    }, [data])

}
export default usegetcustomerlist;