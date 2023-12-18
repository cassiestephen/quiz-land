// need icons? use material ui
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QuizQuestion } from "./shared/types";
import christmas1 from "./assets/christmasCreature/christmas1.png";
import Question from "./Question";

let ex1: QuizQuestion = 
{
  question: "Which holiday is your favorite?",
  image: christmas1,
  choice1: "New Years",
  choice2: "Halloween",
  choice3: "Thanksgiving",
  choice4: "Christmas",
}



const App = () => {
  return (
    <div className="">
      <Question questionInfo={ex1}/>
    </div>
  )
}

export default App;
