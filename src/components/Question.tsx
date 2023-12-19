import { useState } from "react";
import { QuizQuestion, RandomOrdering } from "../shared/types";
import { useDispatch } from "react-redux"; // change state
import { useSelector } from "react-redux"; // access state
import { login } from "../features/user";
import { allQuizQuestions } from "../quizzes/AllQuizzes";


type Props = {
  questionInfo: QuizQuestion;
};

const Question = ({ questionInfo }: Props) => {
  const order = RandomOrdering([1, 2, 3, 4]);
  const user = useSelector((state: any) => state.user.value);
  const dispatch = useDispatch();

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
          <button className="border border-gray-700 p-2 text-sm rounded-xl mb-2 mt-5">
            {questionInfo.choice1}
          </button>
          <button className="border border-gray-700 p-2 text-sm rounded-xl mb-2">
            {questionInfo.choice2}
          </button>
          <button className="border border-gray-700 p-2 text-sm rounded-xl mb-2">
            {questionInfo.choice3}
          </button>
          <button className="border border-gray-700 p-2 text-sm rounded-xl mb-2">
            {questionInfo.choice4}
          </button>
        </div>
        <div className="text-center space-x-20">
          { user.currQ > 0 && <button className="px-5 py-2 bg-gray-300 text-white rounded-xl w-30"
          onClick={() => { // sets current quiz we are playing!
            dispatch(login({ email: user.email, password: user.password, currQuiz: user.currQuiz, currQ: user.currQ - 1}));
          }}
          >
            Prev
          </button> }
         {user.currQ < allQuizQuestions[user.currQuiz].length - 1 ? (<button className="px-5 py-2 bg-blue-700 text-white rounded-xl w-30"
          onClick={() => { // sets current quiz we are playing!
            dispatch(login({ email: user.email, password: user.password, currQuiz: user.currQuiz, currQ: user.currQ + 1}));
          }}>
            Next
          </button> ) : (
            <button className="px-5 py-2 bg-blue-700 text-white rounded-xl w-30">Submit </button>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Question;
