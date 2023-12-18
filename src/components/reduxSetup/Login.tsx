import { useState } from "react";
import { useDispatch } from "react-redux"; // change state
import { login } from "../../features/user";
import quizLand from "../../assets/quizLand.png";

type Props = {};

const Login = (props: Props) => {
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="bg-white p-2 w-[300px] h-[330px] rounded-xl shadow-2xl flex flex-col">
        <div className="mt-0 h-1/8 w-1/8">
          <img src={quizLand} alt="" />
        </div>
        <div className="w-full h-full justify-center items-center mt-5">
          <input
            type="text"
            className="text-left border rounded-lg h-[30px] w-full mb-5 text-lg text-gray-700"
            placeholder="email"
            onChange={(event) => {
              setUserEmail(event.target.value);
            }}
          ></input>
          <input
            type="text"
            className="text-left border rounded-lg w-full h-[30px] text-lg text-gray-700"
            placeholder="password"
            onChange={(event) => {
              setUserPassword(event.target.value);
            }}
          ></input>
          <button
            className="border bg-blue-500 h-[35px] text-blue-700 rounded-lg w-1/2 translate-x-[72px] mt-6 text-black"
            onClick={() => {
              dispatch(login({ email: userEmail, password: userPassword }));
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
