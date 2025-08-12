import { useEffect, useRef, useState } from "react";
import quizLogo from "/quiz-app-logo.png";
import "./scss/quiz-header.scss";
import QuizOverlay from "./QuizOverlay";

function QuizHeader({submitFunction, quizDuration}) {
  const [timer, setTimer] = useState(0);
  const [submitMessage, setSubmitMessage] = useState(false)
  let timerId = useRef(null);

  useEffect(() => {
      setTimer(quizDuration)
      startTimer();
      return ()=>clearInterval(timerId.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startTimer() {
    timerId.current = setInterval(() => {
      setTimer((prev) => {
        if (prev===1) {
            clearInterval(timerId.current)
            setSubmitMessage(true)
            setTimeout(()=>{
              submitFunction()
            }, 2500)
            return 0
        }else{
           return prev - 1
        }
    });
    }, 1000);
  }

  let seconds = timer % 60;
  let minute = Math.floor(timer / 60);

  return (
    <>
      <header className="quiz-header">
        <img src={quizLogo} alt="logo" />
        <div className={`timer ${timer<=10 ? "danger" : ""}`}>
          {minute.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
      </header>

      {submitMessage  && <QuizOverlay />}
    </>
  );
}

export default QuizHeader;

