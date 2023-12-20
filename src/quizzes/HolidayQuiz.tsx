import {
    QuizQuestion,
    AboutQuiz,
  
  } from "../shared/types";
import holidayCover from "../assets/holiday/holidayCover.png";
import holiday1 from "../assets/holiday/holiday1.png";
import holiday2 from "../assets/holiday/holiday2.png";
import holiday3 from "../assets/holiday/holiday3.png";
import holiday4 from "../assets/holiday/holiday4.png";
import holidayq1 from "../assets/holiday/holidayq1.png";
import holidayq2 from "../assets/holiday/holidayq2.png";
import holidayq3 from "../assets/holiday/holidayq3.png";
import holidayq4 from "../assets/holiday/holidayq4.png";
import holidayq5 from "../assets/holiday/holidayq5.png";
import holidayq6 from "../assets/holiday/holidayq6.png";


export const aboutHolidayQuiz: AboutQuiz = {
    name: "What Holiday are You?",
    image: holidayCover,
    image1: holiday1,
    image2: holiday2,
    image3: holiday3,
    image4: holiday4,
    choice1: "Halloween",
    choice2: "Christmas",
    choice3: "4th of July",
    choice4: "National Moose Day",
    index: 3,
    qLen: 6,
  };
  
  export const holidayQuiz: Array<QuizQuestion> = [
    {
      question: "How Patriotic Are You?",
      image: holidayq1,
      choice1: "A little?",
      choice2: "Somewhat",
      choice3: "VERY",
      choice4: "Nope!",
    },
  
    {
      question: "Choose a Snack:",
      image: holidayq2,
      choice1: "Candy",
      choice2: "Pie",
      choice3: "Ice Cream",
      choice4: "Nuts",
    },
  
    {
      question: "Choose a Pet:",
      image: holidayq3,
      choice1: "Cat",
      choice2: "Dog",
      choice3: "Crocodile",
      choice4: "Moose",
    },
  
    {
      question: "Choose a Bed:",
      image: holidayq4,
      choice1: "Double",
      choice2: "King",
      choice3: "Twin",
      choice4: "Tent",
    },
  
    {
      question: "Choose a Boat:",
      image: holidayq5,
      choice1: "Yacht",
      choice2: "Cruise",
      choice3: "Speedboat",
      choice4: "Sail Boat",
    },
  
    {
      question: "Choose a House:",
      image: holidayq6,
      choice1: "Single Family House",
      choice2: "Cutesy Cottage",
      choice3: "Home with a Huge Property",
      choice4: "Cabin in the Woods",
    },
  ];
  