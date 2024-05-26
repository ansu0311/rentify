import { useEffect, useState } from "react";
import { Button } from "../Components/Button";
import { InputBox } from "../Components/InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [credFail, setCredFail] = useState(false);

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
                  navigate("/Signup");
                }}
              >
                Signup
              </button>
              <button className=" text-white cursor-default">Signin</button>
            </div>
            <div className=" relative bg-transparent w-[20vw] text-center h-max mx-auto">
            <InputBox
                onChange={(e: any) => setUsername(e.target.value)}
                placeholder="Email"
                type="email"
              />
              <InputBox
                onChange={(e: any) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
              />
              <div className="pt-4">
                <Button
                  label={"Sign in"}
                  onClick={async () => {
                    const response = await axios.post(
                      `${process.env.PUBLIC_URL}/user/signin`,
                      {
                        username,
                        password,
                      }
                    );
                    if(response.request.status != 200){ setCredFail(true)}
                    localStorage.setItem("token","Bearer " + response.data.token);
                    navigate("/Home");
                  }}
                />
              </div>
              <div className={!credFail?"hidden":" absolute text-lg left-36 text-red-400"}>Incorrect credentials</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
