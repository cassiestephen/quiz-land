// list of all quizzes, as selectQuiz objects
import SelectQuiz from "../components/SelectQuiz";
import { AboutQuiz, QuizQuestion } from "../shared/types";


// Quizzes:

// Christmas Quiz
import { aboutChristmasQuiz, christmasQuiz } from "./ChristmasQuiz";
import { aboutHorseQuiz, horseQuiz } from "./HorseQuiz";
// horse quiz

// Array of AboutQuiz Objects
export const quizCards: Array<AboutQuiz> = [
aboutChristmasQuiz,
aboutHorseQuiz,
]



// 2d array of each quizzes's questions
export const allQuizQuestions: Array<Array<QuizQuestion>> = [
christmasQuiz,
horseQuiz
]