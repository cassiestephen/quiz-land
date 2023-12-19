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
    index: number,
}


export interface sysMess 
{
    role: string,
    content: string
}

export interface Mess 
{
    message: string,
    sentTime: string,
    sender: string,
}

export function RandomOrdering<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }

