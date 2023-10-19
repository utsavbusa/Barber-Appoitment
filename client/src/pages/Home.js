import Cookies from "js-cookie";
import { useEffect ,useState } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {

const navigate = useNavigate();

  useEffect(() => {
    // check if ther is userToken in cookie to redirect to the /user/Customer page
    if (Cookies.get("customerToken")) {
      navigate("/user/Customer");
    }
  }, []);
  return (
    <>

    </>
  );
};
export default Home;
