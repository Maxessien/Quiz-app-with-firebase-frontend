import { useState } from "react";
import "./scss/quiz-intro.scss";
import { motion } from "framer-motion";
import useUserData from "../stores-component/UsersData";
// import useQuizData from "../stores-component/QuizDataStore";

function QuizIntro({ startQuizProp, questionTitle }) {
  const [loadingState, setLoadingState] = useState("Start Quiz");
  const {isLoggedIn} = useUserData()
  motion;
  const handleClick = () => {
    setLoadingState("Loading...");
    startQuizProp();
    setLoadingState("Start Quiz");
  };
  return (
    <>
      <motion.section
        initial={{
          opacity: 0.8,
          y: "20%",
        }}
        animate={{
          opacity: 1,
          y: 20,
        }}
        transition={{
          duration: 1,
        }}
        className="intro-content"
      >
        <h1>{questionTitle}</h1>

        {!isLoggedIn &&  <form className="registry">
          <label htmlFor="userName">Enter Username(Optional)</label>
          <input type="text" id="userName" placeholder="e.g Micheal" />
        </form>}

        <article className="guidelines">
          <h2>Guidelines</h2>
          <ul className="guide-list">
            <li className="guide-list-items">
              <span>1.</span>
              <span>
                Each question is a multiple choice question with three options.
              </span>
            </li>
            <li className="guide-list-items">
              <span>2.</span>
              <span>
                Once the timer above the questions ends the quiz will
                auto-submit.
              </span>
            </li>
            <li className="guide-list-items">
              <span>3.</span>
              <span>
                Navigate through the quiz via the "Next" and "Prev" buttons or
                through the nav tab-below (for mobile) or beside (for desktop).
              </span>
            </li>
          </ul>
        </article>

        <button onClick={handleClick} className="start">
          {loadingState}
        </button>
      </motion.section>
    </>
  );
}

export default QuizIntro;
