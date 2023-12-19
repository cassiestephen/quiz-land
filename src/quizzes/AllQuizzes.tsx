// list of all quizzes, as selectQuiz objects
import SelectQuiz from "../components/SelectQuiz";
import { AboutQuiz, QuizQuestion } from "../shared/types";


// Quizzes:

// Christmas Quiz
import { aboutChristmasQuiz, christmasQuiz } from "./ChristmasQuiz";


// Array of AboutQuiz Objects
export const quizCards: Array<AboutQuiz> = [
aboutChristmasQuiz,

]



// 2d array of each quizzes's questions
export const allQuizQuestions: Array<Array<QuizQuestion>> = [
christmasQuiz,
]