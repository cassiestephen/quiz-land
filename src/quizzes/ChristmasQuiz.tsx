import {
  QuizQuestion,
  AboutQuiz,

} from "../shared/types";
import christmasMain from "../assets/christmasCreature/christmasMain.png";
import christmas1 from "../assets/christmasCreature/christmas1.png";
import christmas2 from "../assets/christmasCreature/christmas2.png";
import christmas3 from "../assets/christmasCreature/christmas3.png";
import christmas4 from "../assets/christmasCreature/christmas4.png";
import christmas5 from "../assets/christmasCreature/christmas5.png";
import christmas6 from "../assets/christmasCreature/christmas6.png";
import image1xmas from "../assets/christmasCreature/image1xmas.png";
import image2xmas from "../assets/christmasCreature/image2xmas.png";
import image3xmas from "../assets/christmasCreature/image3xmas.png";
import image4xmas from "../assets/christmasCreature/image4xmas.png";

export const aboutChristmasQuiz: AboutQuiz = {
  name: "What Christmas Creature Are you?",
  image: christmasMain,
  image1: image1xmas,
  image2: image2xmas,
  image3: image3xmas,
  image4: image4xmas,
  choice1: "Reindeer",
  choice2: "Elf",
  choice3: "Gingerbread Man",
  choice4: "Snowman",
  index: 0,
  qLen: 6,
};

export const christmasQuiz: Array<QuizQuestion> = [
  {
    question: "Which holiday is your favorite?",
    image: christmas1,
    choice1: "New Years",
    choice2: "Halloween",
    choice3: "Thanksgiving",
    choice4: "Christmas",
  },

  {
    question: "Choose a Christmas Song:",
    image: christmas2,
    choice1: "Rudolph the Red Nosed Reindeer",
    choice2: "You're a Mean one, Mr. Grinch",
    choice3: "I saw Mommy Kissing Santa Claus",
    choice4: "Frosty the Snowman",
  },

  {
    question: "Choose a Christmas Dish:",
    image: christmas3,
    choice1: "Turkey",
    choice2: "Green Jello",
    choice3: "Christmas Cookies",
    choice4: "Mashed Potatoes",
  },

  {
    question: "Choose a Christmas Tree:",
    image: christmas4,
    choice1: "30 feet tall",
    choice2: "Standard 6 foot tall Tree",
    choice3: "Tabletop",
    choice4: "Dead",
  },

  {
    question: "Choose a Candle Scent:",
    image: christmas5,
    choice1: "Apples and Cinnamon",
    choice2: "Fir",
    choice3: "Gingerbread",
    choice4: "Crisp Winter Air",
  },

  {
    question: "Choose a Santa Hat:",
    image: christmas6,
    choice1: "Classic",
    choice2: "Mini",
    choice3: "Made of Candy",
    choice4: "Giant",
  },
];
