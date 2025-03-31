import { useState } from "react";
import { useDispatch } from "react-redux"; // change state
import { login } from "../../features/user";
import quizLand from "../../assets/quizLand.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const APIURL = 'http://localhost:8000';

const Login = () => {
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  let navigate = useNavigate();
  const [isBadCredentials, setIsBadCredential] = useState<Boolean>(false);

const gotoCreateAccount = () => {
  navigate("/create-account");
}

const userExists = async () => {
  try {
    const response = await axios.post(`${APIURL}/login-with-email`, {"email": userEmail, "password": userPassword}, {headers: {
      "Content-Type": "application/x-www-form-urlencoded",
  }},);
    console.log(response.data.message);
    dispatch(login({ username: response.data.user, email: userEmail, password: userPassword, token: response.data.access_token, currQuiz: -1, currQ: 0,
      ans: [], results: {}}));
    setIsBadCredential(false);
    navigate("/quizzes");
    
  }
  catch (e) {
    console.log(e);
    setIsBadCredential(true);
  };
};

  return (
    <div className="h-[600px] w-full flex items-center justify-center">
  
      <div className="bg-white p-2 w-[300px] h-[380px] rounded-xl shadow-2xl flex flex-col">
        <div className="mt-0 h-1/8 w-1/8">
          <img src={quizLand} alt="" />
        </div>
        <div className="w-full h-full justify-center items-center mt-5">
          <input
            type="text"
            className="text-left border rounded-lg h-[30px] w-full mb-5 text-lg text-blue-700"
            placeholder=" email"
            onChange={(event) => {
              setUserEmail(event.target.value);
              setIsBadCredential(false);
            }}
          ></input>
          <input
            type="text"
            className="text-left border rounded-lg w-full h-[30px] text-lg text-blue-700"
            placeholder=" password"
            onChange={(event) => {
              setUserPassword(event.target.value);
              setIsBadCredential(false);
            }}
          ></input>
          {isBadCredentials ? <text className="text-xs text-red-700">Email or Password Invalid</text> : <></>}
          <button
            className="border bg-blue-500 h-[40px] text-blue-700 rounded-lg w-1/2 translate-x-[72px] mt-6 hover:text-gray-700 hover:bg-blue-700"
            onClick={() => {
              userExists();
            }}
          >
            Sign In
          </button>
          <button className="mt-1 text-black text-decoration: underline  hover:text-gray-500 text-xs w-full text-center"
            onClick={() => {
              gotoCreateAccount();
            }}>
            Create Account</button>
        </div>
      </div>
 
    </div>
  );
};

export default Login;
