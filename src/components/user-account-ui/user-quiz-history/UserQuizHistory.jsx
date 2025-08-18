import { RxCross1 } from "react-icons/rx";
import UserAccountLayout from "../../layout-components/UserAccountLayout";
import Results from "../../results/ResultPage";
import useUserData from "../../stores-component/UsersData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserQuizHistory = () => {
  const { userData } = useUserData();
  const [showResultOverLay, setShowResultOverLay] = useState(false);
  const [overlayData, setOverlayData] = useState({});
  const navigate = useNavigate();

  const showResultHistory = (questions, answers, selectedAnswer) => {
    setShowResultOverLay(false);
    setShowResultOverLay(true);
    setOverlayData({
      overlayQuestions: questions,
      overlayAnswers: answers,
      overlaySelectedAnswer: selectedAnswer,
    });
  };

  return (
    <>
      {console.log(userData.quizzesTaken.length > 0)}
      <UserAccountLayout>
        <div className="px-8 py-4">
          <h1>Quiz History</h1>
          {console.log(userData, "user")}
          {userData.quizzesTaken.length > 0 ? (
            <ul>
              {userData.quizzesTaken.map(
                ({ title, questions, correctAnswers, selectedAnswers }) => {
                  return (
                    <>
                      <li
                        onClick={() =>
                          showResultHistory(
                            questions,
                            correctAnswers,
                            selectedAnswers
                          )
                        }
                        className="px-3 py-4 rounded-md bg-[var(--light-bg)] text-[var(--text-color)] text-lg font-semibold"
                      >
                        {title}
                      </li>
                    </>
                  );
                }
              )}
            </ul>
          ) : (
            <>
              {console.log("else block")}
              <div className="flex flex-col gap-10 items-start justify-start py-4 px-4">
                <h2 className="text-white text-2xl">No Quiz History</h2>
                <button
                  onClick={() =>
                    navigate(`/${userData.userId.trim().toLowerCase()}/quiz`)
                  }
                  className="bg-[var(--nav-bg)] text-white text-xl px-4 py-3 rounded-md text-center"
                >
                  Attempt Quiz Now
                </button>
              </div>
            </>
          )}
        </div>
      </UserAccountLayout>
        {showResultOverLay && (
          <div className="absolute top-0 right-0 w-full md:w-[85vw] h-screen overflow-y-auto bg-[rgba(0,0,0,0.7)]">
            {console.log(overlayData)}
            <div
              onClick={() => setShowResultOverLay(false)}
              className="absolute top-5 right-4 p-4 rounded-full bg-black text-white text-xl text-center font-bold"
            >
              <RxCross1 />
            </div>
            <Results
              saveResult={false}
              answersData={overlayData.overlayAnswers}
              quizQuestions={overlayData.overlayQuestions}
              userAnswers={overlayData.overlaySelectedAnswer}
            />
          </div>
        )}
    </>
  );
};

export default UserQuizHistory;
