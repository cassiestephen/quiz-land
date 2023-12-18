// need icons? use material ui
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { aboutChristmasQuiz, christmasQuiz } from "./quizzes/ChristmasQuiz";
import QuizObject from "./components/QuizObject";
import Profile from "./components/reduxSetup/Profile";
import Login from "./components/reduxSetup/Login";
import { useState } from "react";
import { useSelector } from "react-redux";
import Home from "./Home";
import QuizList from "./components/QuizList";
import ChatGPTBot from "./components/ChatGPTBot";
import ContactUs from "./components/ContactUs";
import { useDispatch } from "react-redux";
import { login } from "./features/user";
import quizLand from "./assets/quizLand.png";




const App = () => {
  // keep track of whether or not logged in
  const user = useSelector((state: any) => state.user.value);
  // true if logged in, else false
  let loggedIn: boolean = user.email !== "" && user.email !== "";
  const [profileOpen, setProfileOpen] = useState<boolean>(false); // have button in navBar toggle this
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(login({ email: "", password: "" }))
    }

  return (
    <div className="bg-gray-700">
       { /* <QuizObject quizInfo={aboutChristmasQuiz} quizArray={christmasQuiz}/> */ }
      
      {/*<Login />*/}
      <Router>
        <ul >
          <div className=" flex items-center justify-betweenfixed top-0 z-30 w-full py-3 bg-white drop-shadow">
        
        <div className="flex items-center justify-between mx-auto w-5/6">
          <div className="flex items-center justify-between w-full gap-16">
        <img className="h-[70px] w-[130px]"  src={quizLand}/>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-between gap-8 text-md text-blue-700">
          <Link to="/" className=" hover:text-gray-500"> Home</Link>
          <Link to="/quizzes" className=" hover:text-gray-500"> Explore </Link>
          <Link to="/ai-chat" className=" hover:text-gray-500"> Chat Bot </Link>
          <Link to="/contact-us" className=" hover:text-gray-500"> Contact Us </Link>
          </div>
          <div className="flex items-center justify-between gap-8">
           {loggedIn && <button 
           className=""
           onClick={(event) => {
            setProfileOpen(!profileOpen)
          }}>
            <div className="flex flex-col hover:text-gray-500">
              <text className="font-bold text-md">Hello {user.email}</text>
              <text className="text-xs ">View Profile</text>
            </div>
          </button> }
      
        { !loggedIn ? <Link className="border bg-blue-500 h-[35px] w-[60px] flex justify-center items-center text-blue-700 rounded-lg  hover:text-gray-700 hover:bg-blue-700" to="/login"> Login </Link> : 
        <button className="border bg-blue-500 h-[35px] text-blue-700 rounded-lg w-[80px] hover:text-gray-700 hover:bg-blue-700" onClick={ logOut }>Log Out</button>}
        </div>
          </div>
          </div>
          </div>
          </div>
        </ul>

        <Routes>
          <Route path="/" element={ <Home />} /* path for home screen *//>
          <Route path="/login" element={ <Login />} /* path for login *//>
          <Route path="/quizzes" element={ <QuizList />} /* path for home screen *//>
          <Route path="/ai-chat" element={ <ChatGPTBot />} /* path for home screen *//>
          <Route path="/contact-us" element={ <ContactUs />} /* path for home screen *//>
        </Routes>
      </Router>
      {loggedIn && profileOpen && (
        <Profile setProfileOpen={setProfileOpen}/>
      )}

    </div>
  )
}

export default App;
