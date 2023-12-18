export interface QuizQuestion {
    question: string;
    image: string;
    choice1: string;
    choice2: string;
    choice3: string;
    choice4: string;
}

export interface AboutQuiz {
    name: string;
    image: string;
    choice1: string;
    choice2: string;
    choice3: string;
    choice4: string;
}

export function RandomOrdering<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }

