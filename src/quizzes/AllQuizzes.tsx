// list of all quizzes, as selectQuiz objects
import SelectQuiz from "../components/SelectQuiz";
import { AboutQuiz, QuizQuestion } from "../shared/types";


// Quizzes:
import { aboutChristmasQuiz, christmasQuiz } from "./ChristmasQuiz";
import { aboutCityQuiz, cityQuiz } from "./CityQuiz";
import { aboutHorseQuiz, horseQuiz } from "./HorseQuiz";


// Array of AboutQuiz Objects
export const quizCards: Array<AboutQuiz> = [
aboutChristmasQuiz,
aboutHorseQuiz,
aboutCityQuiz
]



// 2d array of each quizzes's questions
export const allQuizQuestions: Array<Array<QuizQuestion>> = [
christmasQuiz,
horseQuiz,
cityQuiz
]