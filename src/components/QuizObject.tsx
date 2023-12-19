import { useState } from "react";
import Question from "./Question";
import { aboutChristmasQuiz, christmasQuiz } from "../quizzes/ChristmasQuiz";
import { QuizQuestion, AboutQuiz, RandomOrdering } from "../shared/types";

type Props = {
  quizInfo: Array<AboutQuiz>;
  quizArray: Array<QuizQuestion>;
};

const QuizObject = ({ quizInfo, quizArray }: Props) => {
  const order: Array<Number> = RandomOrdering([0, 1, 2, 3, 4, 5]);
  const [num, setNum] = useState<Number>(order[0]);
  const [index, setIndex] = useState<Number>(0);
  const [started, setStarted] = useState<boolean>(false);

  return (
    <ul className="">

      {quizArray.map(
        (item: QuizQuestion, index) =>
          index === num && <Question questionInfo={item} />
      )}
    </ul>
  );
};

export default QuizObject;
