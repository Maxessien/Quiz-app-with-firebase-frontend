import { useState, useEffect, useRef } from "react";
import "./scss/quiz-questions.scss";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function QuizQuestions({ quizQuestions, submitFunction, userAnswers, loading }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(null);
  const selectedOptions = useRef([]);

  useEffect(()=>{
    for (let i = 0; i < quizQuestions.length; i++) {
        userAnswers.current[i] = "No Answer";
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSelection(index, e) {
    selectedOptions.current[currentQuestion] = index;
     userAnswers.current[currentQuestion] = e.target.value;
    setSelected(index);
  }

  function navBg(i) {
    if (currentQuestion === i) {
      return "rgb(0, 85, 134)";
    } else if (
      currentQuestion !== i &&
      selectedOptions.current[i] !== undefined
    ) {
      return "rgb(0, 145, 7)";
    } else {
      return "rgb(216, 216, 216)";
    }
  }

  useEffect(() => {
    setSelected(null);
  }, [currentQuestion]);

  function prevQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }

  function nextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  }
  return (
    <div className="quiz-main-content">
      {console.log(loading)}
      <motion.main
        initial={{
          opacity: 0.5,
          y: "20%",
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
        }}
        className="quiz-content"
      >
        <h2 className="question">{quizQuestions[currentQuestion].question}</h2>

        <ul className="options">
          {quizQuestions[currentQuestion].options.map((item, index) => {
            return (
              <motion.li
              initial={{
                x: "30%",
                opacity: 0.93
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.7,
                delay: index*0.2
              }}
               key={`${item}-${index}`}>
                <label
                  style={{
                    background:
                      selected === index ||
                      selectedOptions.current[currentQuestion] === index
                        ? "rgb(0, 105, 0)"
                        : "rgb(0, 0, 37)",
                  }}
                  htmlFor={`opt${index}`}
                >
                  {item}
                  <input
                    onChange={(e) => handleSelection(index, e)}
                    type="radio"
                    value={item}
                    name={`optionsAt${currentQuestion}`}
                    id={`opt${index}`}
                  />
                </label>
              </motion.li>
            );
          })}
        </ul>

        <nav className="question-nav">
          {currentQuestion !== 0 && (
            <button onClick={prevQuestion}>Prev</button>
          )}
          {currentQuestion < quizQuestions.length - 1 ? (
            <button onClick={nextQuestion}>Next</button>
          ) : (
            <button
              onClick={() => {
                submitFunction();
                console.log(loading, "funct")
              }}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          )}
        </nav>
      </motion.main>

      <aside>
        <nav className="jump-to-question">
          {quizQuestions.map((_, index) => {
            return (
              <button
                style={{
                  background: navBg(index),
                }}
                onClick={() => setCurrentQuestion(index)}
                key={`${Math.random() * index} navigNum`}
                className="nav-nums"
              >
                {index + 1}
              </button>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}

export default QuizQuestions;
