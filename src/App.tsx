// need icons? use material ui
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Profile from "./components/reduxSetup/Profile";
import Login from "./components/reduxSetup/Login";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Home from "./Home";
import ChatGPTBot from "./components/ChatGPTBot";
import ContactUs from "./components/ContactUs";
import { useDispatch } from "react-redux";
import { login } from "./features/user";
import quizLand from "./assets/quizLand.png";
import QuizStatus from "./components/QuizStatus";
import EndOfQuiz from "./components/EndOfQuiz";
import SignUp from "./components/reduxSetup/SignUp";
import PaymentForm from "./components/Payment";
import axios from "axios";

const APIURL = 'http://localhost:8000';

const App = () => {
  // keep track of whether or not logged in
  const user = useSelector((state: any) => state.user.value);
  // true if logged in, else false
  let loggedIn: boolean = user.email !== "" && user.email !== "";
  const [profileOpen, setProfileOpen] = useState<boolean>(false); // have button in navBar toggle this
  const dispatch = useDispatch();
  const logOut = async () => {
      try {
          const response = await axios.post(`${APIURL}/logout`, {"username": user.username, "email": user.email, "password": user.password, 
            "token": user.token, "token_expiry": user.token_expiry});
          console.log(response.data.message);
      }
      catch (e: unknown) {
          console.error("Logout Failed:", e);
      }
    dispatch(login({ email: "", password: "" }));
  };

  return (
    <div className="bg-gray-700">
      {/* <QuizObject quizInfo={aboutChristmasQuiz} quizArray={christmasQuiz}/> */}

      {/*<Login />*/}
      <Router>
        <ul>
          <div className=" flex items-center justify-betweenfixed top-0 z-30 w-full py-3 bg-white drop-shadow">
            <div className="flex items-center justify-between mx-auto w-5/6">
              <div className="flex items-center justify-between w-full gap-16">
                <Link to="/">
                  <img className="h-[70px] w-[130px]" src={quizLand} />
                </Link>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center justify-between gap-8 text-md text-blue-700">
                    <Link to="/quizzes" className=" hover:text-gray-500">
                      {" "}
                      Explore{" "}
                    </Link>
                    <Link to="/ai-chat" className=" hover:text-gray-500">
                      {" "}
                      Chat Bot{" "}
                    </Link>
                    <Link to="/contact-us" className=" hover:text-gray-500">
                      {" "}
                      Contact Us{" "}
                    </Link>
                  </div>
                  <div className="flex items-center justify-between gap-8">
                    {loggedIn && (
                      <button
                        className=""
                        onClick={() => {
                          setProfileOpen(!profileOpen);
                        }}
                      >
                        <div className="flex flex-col hover:text-gray-500">
                          <text className="font-bold text-md">
                            Hello {user.email}
                          </text>
                          <text className="text-xs ">View Profile</text>
                        </div>
                      </button>
                    )}

                    {!loggedIn ? (
                      <Link
                        className="border bg-blue-500 h-[35px] w-[60px] flex justify-center items-center text-blue-700 rounded-lg  hover:text-gray-700 hover:bg-blue-700"
                        to="/login"
                      >
                        {" "}
                        Login{" "}
                      </Link>
                    ) : (
                      <button
                        className="border bg-blue-500 h-[35px] text-blue-700 rounded-lg w-[80px] hover:text-gray-700 hover:bg-blue-700"
                        onClick={logOut}
                      >
                        Log Out
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ul>

        <Routes>
          <Route path="/" element={<Home />} /* path for home screen */ />
          <Route path="/login" element={<Login />} /* path for login */ />
          <Route
            path="/quizzes"
            element={<QuizStatus />} /* path for home screen */
          />
          <Route
            path="/endOfQuiz"
            element={<EndOfQuiz />} /* path for home screen */
          />
          <Route
            path="/ai-chat"
            element={<ChatGPTBot />} /* path for home screen */
          />
          <Route
            path="/contact-us"
            element={<ContactUs />} /* path for home screen */
          />
          <Route
            path="/create-account"
            element={<SignUp/>} /* path for home screen */
          />
          <Route
            path="/pay"
            element={<PaymentForm/>} /* path for home screen */
          />
        </Routes>
      </Router>
      {loggedIn && profileOpen && <Profile setProfileOpen={setProfileOpen} />}
    </div>
  );
};

export default App;
