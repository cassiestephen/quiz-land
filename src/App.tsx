// need icons? use material ui
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { aboutChristmasQuiz, christmasQuiz } from "./quizzes/ChristmasQuiz";
import QuizObject from "./components/QuizObject";
import Profile from "./components/reduxSetup/Profile";
import Login from "./components/reduxSetup/Login";
import { useState } from "react";
import { useSelector } from "react-redux";
import Home from "./Home";



const App = () => {
  // keep track of whether or not logged in
  const user = useSelector((state: any) => state.user.value);
  // true if logged in, else false
  let loggedIn: boolean = user.email !== "" && user.email !== "";
  const [profileOpen, setProfileOpen] = useState<boolean>(true); // have button in navBar toggle this


  return (
    <div className="bg-gray-700">
       { /* <QuizObject quizInfo={aboutChristmasQuiz} quizArray={christmasQuiz}/> */ }
      
      {/*<Login />*/}

      <Home />

      {loggedIn && profileOpen && (
        <Profile setProfileOpen={setProfileOpen}/>
      )}

    </div>
  )
}

export default App;
