import "./results.scss";
import useUserData from "../stores-component/UsersData";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import PopUpModal from "../layout-components/PopUpModal";
import { RxCross1 } from "react-icons/rx";
import { auth } from "../../firebase/config";

function Results({
  userAnswers,
  quizQuestions,
  answersData,
  saveResult = true,
}) {
  const { isLoggedIn, userData, backendBaseUrl } = useUserData();
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const hasRun = useRef(false);
  let total = 0;
  for (let i = 0; i < answersData.answers.length; i++) {
    if (userAnswers.current[i] === answersData.answers[i]) {
      total++;
    }
  }
  useEffect(() => {
    console.log(saveResult);
    if (isLoggedIn && !hasRun.current) {
      hasRun.current = true;
      const date = new Date();
      const newResultData = {
        courseCode: quizQuestions.course_code,
        score: ((total / answersData.answers.length) * 100).toFixed(2),
        title: quizQuestions.title,
        questions: quizQuestions,
        selectedAnswers: userAnswers,
        correctAnswers: answersData,
        timeStamp: date.toString(),
      };
      console.log(newResultData, "ressss");
      const updateBackend = async () => {
        try {
          const idToken = await auth.currentUser.getIdToken();
          const res = await axios.post(
            `${backendBaseUrl}/user/update`,
            {
              userId: userData.userId,
              quizzesTaken: [...userData.quizzesTaken, newResultData],
            },
            {
              headers: {
                Authorisation: `Bearer ${idToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log(res);
          userData.quizzesTaken.push(newResultData);
        } catch (error) {
          console.log(error);
        }
      };
      if (saveResult) {
        console.log(saveResult);
        updateBackend();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <section className="results-section">
        <h1>Results</h1>
        <div className="result_displays">
          <div className="result_displays_container">
            <h2>SCORE</h2>
            <div className="quiz_score">
              <CircularProgressbar
                value={((total / answersData.answers.length) * 100).toFixed(2)}
                maxValue={100}
                strokeWidth={8}
                circleRatio={1}
                styles={buildStyles({
                  pathColor:
                    Math.round((total / answersData.answers.length) * 100) > 60
                      ? "rgba(14, 124, 0, 1)"
                      : "rgba(207, 195, 25, 1)",
                  trailColor: "rgba(109, 109, 109, 1)",
                })}
              />
              <span className="score_text">
                {Math.round((total / answersData.answers.length) * 100)}%
              </span>
              {/* <span className="score_text">99.99%</span> */}
            </div>
          </div>
          <div className="result_displays_container">
            <h2>TOTAL</h2>
            <div className="quiz_score">
              <CircularProgressbar
                value={((total / answersData.answers.length) * 100).toFixed(2)}
                maxValue={100}
                strokeWidth={8}
                circleRatio={1}
                styles={buildStyles({
                  pathColor:
                    Math.round((total / answersData.answers.length) * 100) > 60
                      ? "rgba(14, 124, 0, 1)"
                      : "rgba(207, 195, 25, 1)",
                  trailColor: "rgba(109, 109, 109, 1)",
                })}
              />
              <span className="score_text">
                {`${total}/${answersData.answers.length}`}
              </span>
              {/* <span className="score_text">99.99%</span> */}
            </div>
          </div>
        </div>
        <div className="cta_buttons">
          {isLoggedIn ? (
            <>
              {saveResult && (
                <Link to={`/${userData.userId.trim().toLowerCase()}/dashboard`}>
                  <button className="return-cta">Return To Dashboard</button>
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to={`/`}>
                <button className="return-cta">Return To Home</button>
              </Link>
              <button
                onClick={() => setShowPopup(true)}
                className="save-results"
              >
                Save Result
              </button>
            </>
          )}
        </div>
        <ul>
          {answersData.answers.map((answer, index) => {
            return answer === userAnswers.current[index] ? (
              <li key={`score-${index + 1}`}>
                <span>{`${index + 1}.) `}</span>
                <span>
                  <span style={{ marginRight: `${15 / 16}rem` }}>
                    {quizQuestions.questions[index].question.slice(3)}
                  </span>
                  Correct ✅ - {userAnswers.current[index]}
                </span>
              </li>
            ) : (
              <li key={`score-${index + 1}`}>
                <span>{`${index + 1}.) `}</span>
                <span>
                  <span style={{ marginRight: `${15 / 16}rem` }}>
                    {quizQuestions.questions[index].question.slice(3)}
                  </span>
                  Wrong ❌ - {userAnswers.current[index]} (Correct Answer -{" "}
                  {answer})
                </span>
              </li>
            );
          })}
        </ul>
        {showPopup && (
          <PopUpModal>
            <div className="sign_up_cta">
              <button
                onClick={() => setShowPopup(false)}
                className="close_icon"
              >
                <RxCross1 />
              </button>
              <h2>Sign Up / Login</h2>
              <p>Save results for future reference</p>
              <p>Access saved scores anytime</p>
              <p>Track your learning over time</p>
              <p>Compete with friends (coming soon)</p>
              <div className="sign_up_cta_buttons">
                <button onClick={() => navigate("/register")}>Sign Up</button>
                <button onClick={() => navigate("/login")}>login</button>
              </div>
            </div>
          </PopUpModal>
        )}
      </section>
    </>
  );
}

export default Results;
