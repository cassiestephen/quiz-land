import { useState } from "react";
import { QuizQuestion, RandomOrdering } from "../shared/types";

type Props = {
  questionInfo: QuizQuestion;
};

const Question = ({ questionInfo }: Props) => {
  const order = RandomOrdering([1, 2, 3, 4]);

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="bg-white p-2 rounded-xl shadow-2xl">
        <div className="mb-15">
          <h1 className="font-semibold text-left text-lg text-gray-700">
            Question 1 of 5
          </h1>
          <h2 className="font-semibold text-left text-3xl text-gray-700">
            {questionInfo.question}
          </h2>
        </div>
            <img className="translate-x-[105px] w-[200px] h-[200px] mt-5" alt="" src={questionInfo.image}/>
        <div className="flex flex-col text-left">
          <button className="border border-gray-700 p-2 rounded-xl mb-2 mt-5">
            {questionInfo.choice1}
          </button>
          <button className="border border-gray-700 p-2 rounded-xl mb-2">
            {questionInfo.choice2}
          </button>
          <button className="border border-gray-700 p-2 rounded-xl mb-2">
            {questionInfo.choice3}
          </button>
          <button className="border border-gray-700 p-2 rounded-xl mb-2">
            {questionInfo.choice4}
          </button>
        </div>
        <div className="text-center space-x-20">
          <button className="px-5 py-2 bg-gray-300 text-white rounded-xl w-30">
            Prev
          </button>
          <button className="px-5 py-2 bg-gray-700 text-white rounded-xl w-30">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;
