import horse1 from "../assets/horse/horse1.png";
import horse2 from "../assets/horse/horse2.png";
import horse3 from "../assets/horse/horse3.png";
import horse4 from "../assets/horse/horse4.png";
import horseCover from "../assets/horse/horseCover.png";
import horseq1 from "../assets/horse/horseq1.png";
import horseq2 from "../assets/horse/horseq2.png";
import horseq3 from "../assets/horse/horseq3.png";
import horseq4 from "../assets/horse/horseq4.png";
import horseq5 from "../assets/horse/horseq5.png";
import horseq6 from "../assets/horse/horseq6.png";


import {
    QuizQuestion,
    AboutQuiz,

  } from "../shared/types";

  export const aboutHorseQuiz: AboutQuiz = {
    name: "What Horse Breed are You?",
    image: horseCover,
    image1: horse1,
    image2: horse2,
    image3: horse3,
    image4: horse4,
    choice1: "Thoroughbred",
    choice2: "Arabian",
    choice3: "Quarter Horse",
    choice4: "Friesian",
    index: 1,
    qLen: 6,
  };
  
  export const horseQuiz: Array<QuizQuestion> = [
    {
      question: "Choose an Outfit:",
      image: horseq1,
      choice1: "Black dress",
      choice2: "Frilly Dress",
      choice3: "Suit",
      choice4: "Purple Gown",
    },
  
    {
      question: "Choose a Meal:",
      image: horseq2,
      choice1: "Protein!",
      choice2: "Salad",
      choice3: "Just bread",
      choice4: "Fancy",
    },
  
    {
      question: "Choose a Dog:",
      image: horseq3,
      choice1: "Greyhound",
      choice2: "Borzoi",
      choice3: "Pug",
      choice4: "Poodle",
    },
  
    {
      question: "Choose a Phone Case:",
      image: horseq4,
      choice1: "Plain",
      choice2: "Hearts",
      choice3: "Blue",
      choice4: "Tan",
    },
  
    {
      question: "Choose a Water Bottle:",
      image: horseq5,
      choice1: "Plastic",
      choice2: "Pink",
      choice3: "Metal",
      choice4: "Fancy",
    },
  
    {
      question: "Choose a Soda:",
      image: horseq6,
      choice1: "Coke",
      choice2: "Dr. Pepper",
      choice3: "Root Beer",
      choice4: "Italian Soda",
    },
  ];
  