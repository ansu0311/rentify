import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/NavBar";

const Home = () => {
  const [firstName, setFirstName] = useState("User");
  const [lastName, setLastName] = useState(" ");
  const [userId, setUserId] = useState(" ");
  const navigate = useNavigate();
  const AuthToken = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${process.env.PUBLIC_URL}/user/`, {
        headers: {
          Authorization: AuthToken,
        },
      })
      .then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setUserId(res.data.userId);
      })
      .catch((err) => {
        navigate("/Signin");
      });
  }, []);

  const navItems = [
    { id: 1, text: 'Listing' ,to:"/listing"},
  ];

  return (
  <>
  <Navbar navItems={navItems} />
  <div>Hello</div>
  </>
  )
}

export default Home