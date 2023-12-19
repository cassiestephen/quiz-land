import { useDispatch } from "react-redux"; // change state
import { useSelector } from "react-redux"; // access state
import { useNavigate } from "react-router-dom";
import { login } from "../features/user";
import { quizCards } from "../quizzes/AllQuizzes";

type Props = {}

const EndOfQuiz = (props: Props) => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.value);
    let navigate = useNavigate();

    function findResult(): number {
        let i: number = 0, a: number = 0, b: number = 0, c: number = 0, d: number = 0;
        while (i < user.ans.length)
        {
            if (user.ans[i] === 1)
            {
                a++;
            }
            else if (user.ans[i] === 2)
            {
                b++;
            }
            else if (user.ans[i] === 3)
            {
                c++;
            }
            else if (user.ans[i] === 4)
            {
                d++;
            }
            i++;
        }
        const max = Math.max(a, b, c, d);
        if (max === a)
            return 1;
        if (max === b)
            return 2;
        if (max === c)
            return 3;
        else
            return 4;
    }

    function result(): string {
        let ans = findResult();
        if (ans === 1)
            return quizCards[user.currQuiz].choice1;
        if (ans === 2)
            return quizCards[user.currQuiz].choice2;
        if (ans === 3)
            return quizCards[user.currQuiz].choice3;
        else
            return quizCards[user.currQuiz].choice4;
    }

    function exit(): void {
        dispatch(login({ email: user.email, password: user.password, currQuiz: -1, currQ: 0,
            ans: []}));
        navigate("/quizzes");
    }

  return (
    <div className="flex justify-center bg-gray-700 items-center w-full h-[600px] flex-col">
        <div className="bg-white p-2 w-[350px] h-[470px] rounded-xl shadow-2xl flex flex-col justify-center items-center">
        <h1 className="text-xl text-center text-blue-700">Congrats! You got:</h1>
        <text className="text-3xl text-center font-bold text-blue-700"> {result()}</text>
        { findResult() === 1 && <img className="h-[300px] w-[200px] mt-2" src={quizCards[user.currQuiz].image1} alt=""/>}
        { findResult() === 2 && <img className="h-[300px] w-[200px] mt-2" src={quizCards[user.currQuiz].image2} alt=""/>}
        { findResult() === 3 && <img className="h-[300px] w-[200px] mt-2" src={quizCards[user.currQuiz].image3} alt=""/>}
        { findResult() === 4 && <img className="h-[300px] w-[200px] mt-2" src={quizCards[user.currQuiz].image4} alt=""/>}
        <button onClick={exit} className="border bg-blue-500 h-[35px] text-blue-700 rounded-lg w-1/2 
        mt-4 hover:text-gray-700 hover:bg-blue-700">Done</button>
    </div>
    </div>
  )
}

export default EndOfQuiz