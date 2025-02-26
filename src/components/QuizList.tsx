import { quizCards } from "../quizzes/AllQuizzes";
import { AboutQuiz } from "../shared/types";
import SelectQuiz from "./SelectQuiz";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";


// outputs list of quizzes OR quiz in progress if you are currently working on one
const QuizList = () => {
const [message, setMessage] = useState('');
const [username, setUsername] = useState("testuser");
const [password, setPassword] = useState("password123");
const [token, setToken] = useState("");
    
const handleClick = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/message');
    const data = await response.json();
    setMessage(data.message)
  }
  catch (e) {
    console.log("API Call Failed:", e);
  }

}

const handleValidatePW = async () => {
  try 
  {
    const response = await axios.post('http://localhost:8000/token', {
      username,
      password, 
    }, {
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
    });
    setToken(response.data.access_token);
    console.log("Login Successful");

  }
  catch (error) {
    console.error("Login failed:", error);
  }
};

  return (
    <div className="h-[600px] w-full bg-gray-700">
      <div className="translate-x-[470px] items-center mt-5 mb-3">
        <h1 className="text-6xl text-blue-700 font-bold">Featured Quizzes</h1>
      </div>
      <div className="ml-7 mr-7 mt-7 mb-7 gap-7 flex ">
      {quizCards.map(
        (item: AboutQuiz) =>
          <SelectQuiz aboutQuiz={item} />
      )}
    </div>
    <div>
      <button onClick={handleClick} className="text-sm mt-1 border rounded-lg w-[150px] h-[35px] bg-blue-500 text-blue-700  hover:text-gray-700 hover:bg-blue-700">click me</button>
      <p>{message}</p>
    </div>
    <div>
      <button onClick={handleValidatePW} className="text-sm mt-1 border rounded-lg w-[150px] h-[35px] bg-blue-500 text-blue-700  hover:text-gray-700 hover:bg-blue-700">click me!!!</button>
      <p>{token}</p>
    </div>
    </div>
  )
}

export default QuizList;