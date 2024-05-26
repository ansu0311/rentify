import { useEffect, useState } from "react";
import { Button } from "../Components/Button";
import { InputBox } from "../Components/InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const AuthToken = localStorage.getItem("token");

  if (AuthToken) {
    useEffect(() => {
      axios
        .get(`${process.env.PUBLIC_URL}/user/`, {
          headers: {
            Authorization: "Bearer " + AuthToken,
          },
        })
        .then(() => {
          navigate("/Home");
        })
        .catch((err) => {
          localStorage.removeItem("token");
          console.log(err);
        });
    }, [AuthToken]);
  }

  return (
    <div className="bg-[#242424] h-screen flex">
      <div className="grid grid-cols-2 w-screen">
        <div className="col-span-1 flex">
          <div className="flex flex-col justify-center z-10">
            <div className="px-20 text-6xl leading-[120%] font-bold text-teal-400">
              Rentify
            </div>
            <div className=" px-20 text-white text-5xl leading-[120%] font-bold">
              Where Renting Meets Simplicity
            </div>
          </div>
        </div>
        <div className=" col-span-1 flex justify-center">
          <div className="flex flex-col justify-center z-10">
            <div className="mx-auto text-3xl flex gap-4 mb-4 font-bold text-white">
              <button
                className=" text-teal-300 hover:text-white"
                onClick={() => {
                  navigate("/Signin");
                }}
              >
                Signin
              </button>
              <button className=" text-white cursor-default">Signup</button>
            </div>
            <div className="bg-transparent w-2/3 text-center h-max mx-auto">
              <div className="flex gap-2">
                <InputBox
                  onChange={(e: any) => setFirstName(e.target.value)}
                  placeholder="First Name"
                />
                <InputBox
                  onChange={(e: any) => setLastName(e.target.value)}
                  placeholder="Last Name"
                />
              </div>
              <InputBox
                onChange={(e: any) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
              />
              <InputBox
                onChange={(e: any) => setUsername(e.target.value)}
                placeholder="Email"
                type="email"
              />
              <InputBox
                onChange={(e: any) => setMobileNumber(e.target.value)}
                placeholder="Contact Number"
              />
              <div className="pt-4">
                <Button
                  label={"Sign up"}
                  onClick={async () => {
                    const response = await axios.post(
                      `${process.env.PUBLIC_URL}/user/signup`,
                      {
                        firstName,
                        lastName,
                        username,
                        password,
                        mobileNumber
                      }
                    );
                    localStorage.setItem("token","Bearer " + response.data.token);
                    navigate("/Home");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
