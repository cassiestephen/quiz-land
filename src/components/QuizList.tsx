import { quizCards } from "../quizzes/AllQuizzes";
import { AboutQuiz } from "../shared/types";
import SelectQuiz from "./SelectQuiz";



// outputs list of quizzes OR quiz in progress if you are currently working on one
const QuizList = () => {
  return (
    <div className="h-[600px] w-full bg-gray-700">
      <div className="translate-x-[470px] items-center mt-5 mb-3">
        <h1 className="text-6xl text-blue-700 font-bold">Featured Quizzes</h1>
      </div>
      <div className="ml-7 mr-7 mt-7 mb-7 gap-7 flex ">
      {quizCards.map(
        (item: AboutQuiz) =>
          <SelectQuiz aboutQuiz={item} />
      )}
    </div>
    </div>
  )
}

export default QuizList;