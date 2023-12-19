import { useState } from "react";
import { allQuizQuestions } from "../quizzes/AllQuizzes"; // 2d array with all quiz questions
import Question from "./Question";
import QuizList from "./QuizList";
import { useSelector } from "react-redux"; // access state
import { christmasQuiz } from "../quizzes/ChristmasQuiz";


type Props = {}

const QuizStatus = () => {
  const len = allQuizQuestions.length - 1; // len, but 0-indexed
  //const [inQuiz, setInQuiz] = useState<number>(-1); // set to -1 initially, tells us which quiz we are using!
  //const [currentQ, setCurrentQ] = useState<number>(0); // will be 0-5 once begun!
  const userInfo = useSelector((state: any) => state.user.value);

  return (
    <div>
      {userInfo.currQuiz === -1 && <QuizList />}
      {userInfo.currQuiz >= 0 && userInfo.currQuiz <= len &&  // instead outputs quiz question!
      userInfo.currQ >= 0 && userInfo.currQ < allQuizQuestions[userInfo.currQuiz].length &&
      <Question questionInfo={allQuizQuestions[userInfo.currQuiz][userInfo.currQ]}/>}
    </div>
  )
}

export default QuizStatus;