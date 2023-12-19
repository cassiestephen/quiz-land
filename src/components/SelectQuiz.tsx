// what quiz looks like on the outside!!!
import { useNavigate } from "react-router-dom";
import { AboutQuiz } from "../shared/types";
import { useDispatch } from "react-redux"; // change state
import { useSelector } from "react-redux"; // access state
import { login } from "../features/user";

type Props = {
    aboutQuiz: AboutQuiz,

}

const SelectQuiz = ({aboutQuiz}: Props) => {
    // let navigate = useNavigate();
    // const gotoQuiz = () => {
    //     navigate("/quizzes");
    // }
    const user = useSelector((state: any) => state.user.value);
    const dispatch = useDispatch();

  return (
    
    <button onClick={() => { // sets current quiz we are playing!
              dispatch(login({ email: user.email, password: user.password, currQuiz: aboutQuiz.index, currQ: 0}));
            }} className="w-[220px] h-[400px] flex flex-col items-center bg-white border rounded-xl shadow-2xl text-blue-700 hover:text-gray-700 hover:bg-blue-700">
        <img className="h-[300px] w-[200px] mt-2" src={aboutQuiz.image}/>
        <h1 className="mt-5 ml-1 mr-1">{aboutQuiz.name}</h1>
    </button>
  )
}

export default SelectQuiz;