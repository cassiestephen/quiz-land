import { useState } from "react";
import { QuizQuestion, order, RandomOrdering } from "../shared/types";
import { useDispatch } from "react-redux"; // change state
import { useSelector } from "react-redux"; // access state
import { login } from "../features/user";
import { allQuizQuestions } from "../quizzes/AllQuizzes";
import { useNavigate } from "react-router-dom";

type Props = {
  questionInfo: QuizQuestion;
};

const Question = ({ questionInfo }: Props) => {
  let my_order = order;
  const reOrder = (my_order: Array<number>) => {
    my_order = RandomOrdering(order);
  }
  
  const [ans, setAns] = useState<number>(0);
  const user = useSelector((state: any) => state.user.value);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const gotoQuizEnd = () => {
    navigate("/endOfQuiz");
}
const onClickNext = () => { // sets current quiz we are playing!
  const answer = [...user.ans]
  if (answer.length > user.currQ) {
            answer[user.currQ] = ans;
  }
  setAns(0); // reset ans to be safe
  reOrder(my_order);
  dispatch(login({ email: user.email, password: user.password, currQuiz: user.currQuiz, currQ: user.currQ + 1,
    ans: answer}));
  
}

const onClickPrev = () => { // sets current quiz we are playing!
  const answer = [...user.ans]
  if (answer.length > user.currQ) {
    answer[user.currQ] = ans;
  }
  setAns(0); // reset ans to be safe
  reOrder(my_order);
  dispatch(login({ email: user.email, password: user.password, currQuiz: user.currQuiz, currQ: user.currQ - 1,
    ans: answer}));
  
}


  return (
    <div className="h-[700px] w-full flex items-center justify-center">
      <div className="bg-white p-2 w-[600px] rounded-xl shadow-2xl flex flex-col">
      <div className="flex flex-col text-left mb-15">
        <h1 className="font-semibold text-left text-md text-blue-700">
            Question {user.currQ + 1} of {allQuizQuestions[user.currQuiz].length}
            </h1>
          <h2 className="font-semibold text-left text-2xl text-blue-700">
              {questionInfo.question}
          </h2>
          </div>
          <div className="flex flex-col items-center">
            <img className=" w-[160px] h-[200px] mt-5" alt="" src={questionInfo.image}/>
        <div className="flex flex-col w-full px-3 text-left">
          <button className="border  hover:bg-blue-500 border-gray-700 p-2 text-sm rounded-xl mb-2 mt-5" onClick={() => setAns(my_order[0])}>
            {my_order[0] === 1 && questionInfo.choice1}
            {my_order[0] === 2 && questionInfo.choice2}
            {my_order[0] === 3 && questionInfo.choice3}
            {my_order[0] === 4 && questionInfo.choice4}
          </button>
          <button className="border  hover:bg-blue-500 border-gray-700 p-2 text-sm rounded-xl mb-2" onClick={() => setAns(my_order[1])}>
            {my_order[1] === 1 && questionInfo.choice1}
            {my_order[1] === 2 && questionInfo.choice2}
            {my_order[1] === 3 && questionInfo.choice3}
            {my_order[1] === 4 && questionInfo.choice4}
          </button>
          <button className="border   hover:bg-blue-500 border-gray-700 p-2 text-sm rounded-xl mb-2" onClick={() => setAns(my_order[2])}>
            {my_order[2] === 1 && questionInfo.choice1}
            {my_order[2] === 2 && questionInfo.choice2}
            {my_order[2] === 3 && questionInfo.choice3}
            {my_order[2] === 4 && questionInfo.choice4}
          </button>
          <button className="border   hover:bg-blue-500 border-gray-700 p-2 text-sm rounded-xl mb-2" onClick={() => setAns(my_order[3])}>
            {my_order[3] === 1 && questionInfo.choice1}
            {my_order[3] === 2 && questionInfo.choice2}
            {my_order[3] === 3 && questionInfo.choice3}
            {my_order[3] === 4 && questionInfo.choice4}
          </button>
        </div>
        <div className="text-center space-x-20">
          { user.currQ > 0 && <button className="px-5 py-2 bg-gray-300 text-white rounded-xl w-30"
          onClick={onClickPrev}>
            Prev
          </button> }
         {user.currQ < allQuizQuestions[user.currQuiz].length - 1 ? (<button className="px-5 py-2 bg-blue-700 text-white rounded-xl w-30"
          onClick={onClickNext} >
            Next
          </button> ) : (
            <button className="px-5 py-2 bg-blue-700 text-white rounded-xl w-30" onClick={gotoQuizEnd}>Submit </button>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Question;
