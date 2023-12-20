import {
    QuizQuestion,
    AboutQuiz,
  
  } from "../shared/types";
import cityMain from "../assets/city/cityMain.png";
import cityMain1 from "../assets/city/cityMain1.png";
import cityMain2 from "../assets/city/cityMain2.png";
import cityMain3 from "../assets/city/cityMain3.png";
import cityMain4 from "../assets/city/cityMain4.png";
import city1 from "../assets/city/city1.png";
import city2 from "../assets/city/city2.png";
import city3 from "../assets/city/city3.png";
import city4 from "../assets/city/city4.png";
import city5 from "../assets/city/city5.png";
import city6 from "../assets/city/city6.png";


export const aboutCityQuiz: AboutQuiz = {
    name: "What City are You?",
    image: cityMain,
    image1: cityMain1,
    image2: cityMain2,
    image3: cityMain3,
    image4: cityMain4,
    choice1: "NYC",
    choice2: "Los Angeles",
    choice3: "San Francisco",
    choice4: "Honolulu",
    index: 2,
    qLen: 6,
  };
  
  export const cityQuiz: Array<QuizQuestion> = [
    {
      question: "Choose a Meal:",
      image: city1,
      choice1: "Lobster",
      choice2: "Smoothie",
      choice3: "Catch of the Day",
      choice4: "Sushi",
    },
  
    {
      question: "Choose a tea:",
      image: city2,
      choice1: "Earl Grey",
      choice2: "Mint",
      choice3: "Black",
      choice4: "Herbal",
    },
  
    {
      question: "Choose a Plant:",
      image: city3,
      choice1: "No Plant!!",
      choice2: "Succulent",
      choice3: "Redwood",
      choice4: "Palm Tree",
    },
  
    {
      question: "Choose a Fruit:",
      image: city4,
      choice1: "Apple",
      choice2: "Dragonfruit",
      choice3: "Blueberries",
      choice4: "Passion Fruit",
    },
  
    {
      question: "Choose a Water Vacation:",
      image: city5,
      choice1: "Miami",
      choice2: "Bahamas",
      choice3: "Maui",
      choice4: "Vegas",
    },
  
    {
      question: "Choose a Car:",
      image: city6,
      choice1: "I prefer walking.",
      choice2: "G Wagon",
      choice3: "Tesla",
      choice4: "Pickup Truck",
    },
  ];
  