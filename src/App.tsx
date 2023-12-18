// need icons? use material ui
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { aboutChristmasQuiz, christmasQuiz } from "./quizzes/ChristmasQuiz";
import QuizObject from "./components/QuizObject";
import Profile from "./components/reduxSetup/Profile";
import Login from "./components/reduxSetup/Login";



const App = () => {
  return (
    <div className="">
       { /* <QuizObject quizInfo={aboutChristmasQuiz} quizArray={christmasQuiz}/> */ }
      
      <Login />
    </div>
  )
}

export default App;
