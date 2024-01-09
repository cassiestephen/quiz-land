import mainGraphic from "./assets/mainGraphic.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

type Props = {};

const Home = (props: Props) => {
  let navigate = useNavigate();

  const gotoLogin = () => {
    navigate("/login");
  };

  const gotoQuizzes = () => {
    navigate("/quizzes");
  };
  const gotoChatBot = () => {
    navigate("/ai-chat");
  };

  return (
    <section
      id="home"
      className="gap-16 ml-[200px] bg-gray-700 justify-center items-center"
    >
      <header className="flex translate-x-[-200px] items-center gap-2 w-[1700px] bg-yellow-400 h-[40px]">
        <h2 className="text-3xl translate-x-[470px] text-red-600 font-bold">
          NEW!
        </h2>
        <button
          onClick={gotoChatBot}
          className="text-sm translate-x-[470px] hover:text-decoration-line: hover:underline"
        >
          Check out our AI helper, QuizGPT, for advice on making your very own
          quiz!
        </button>
      </header>

      <motion.div className="flex w-5/6  justify-center items-center gap-[110px]">
        <div className="z-10 w-1/2 ">
          <motion.div
            className=""
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <div className="relative text-6xl font-bold">
              <text> Quizzes Made for Everyone. </text>
            </div>

            <p className="mt-2 text-sm">
              Ever wondered what christmas creature you are? Horse breed?
              Explore our collection of fun quizzes to find out!
            </p>
          </motion.div>

          <motion.div
            className="mt-8 flex items-center gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <button
              onClick={gotoLogin}
              className="text-sm mt-1 border rounded-lg w-[150px] h-[35px] hover:bg-blue-500 hover:text-blue-700  text-gray-700 bg-blue-700"
            >
              Sign In
            </button>
            <button
              onClick={gotoQuizzes}
              className="text-sm mt-1 border rounded-lg w-[150px] h-[35px] bg-blue-500 text-blue-700  hover:text-gray-700 hover:bg-blue-700"
            >
              <p>Explore Quizzes</p>
            </button>
          </motion.div>
        </div>
        <div className="flex basis-3/5 w-[800px] h-[600px] justify-right">
          <img alt="home-pageGraphic" src={mainGraphic} />
        </div>
      </motion.div>
    </section>
  );
};

export default Home;
