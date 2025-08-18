import { useEffect, useRef, useState } from "react";
import QuizHeader from "./QuizHeader";
import QuizQuestions from "./QuizQuestions";
import QuizIntro from "./QuizIntro";
import Results from "../results/ResultPage";
import { toast, ToastContainer } from "react-toastify";
import useQuizData from "../stores-component/QuizDataStore";
import useUserData from "../stores-component/UsersData";

function QuizPage({ selectedQuiz }) {
  const { fetchQuizAnswers, answersData } = useQuizData();
  const [showQuestions, setShowQuestions] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {backendBaseUrl} = useUserData()

  const userAnswers = useRef([]);

  useEffect(() => {
    document.body.style.background = 'url("/PE.webp")';
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";

    return () => {
      // reset styles if needed
      document.body.style.background = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundAttachment = "";
    };
  }, []);

  const startQuiz = () => {
    setShowQuestions(true);
  };

  async function submitQuiz() {
    setIsLoading(true)
    try {
      console.log("trying", selectedQuiz.uniqueId, backendBaseUrl)
      await fetchQuizAnswers(selectedQuiz.uniqueId, backendBaseUrl);
      setSubmitted(true);
    } catch (err) {
      console.log(err)
      err.message.toLowerCase().includes("network error")
        ? toast.error("Network error, please check your internet connection")
        : toast.error("Server Error, please try again later");
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <>
      {submitted && answersData.answers?.length > 0 ? (
        <Results userAnswers={userAnswers} quizQuestions={selectedQuiz} answersData={answersData} saveResult  />
      ) : (
        <>
          {!showQuestions ? (
            <QuizIntro
              startQuizProp={startQuiz}
              questionTitle={selectedQuiz.title}
            />
          ) : (
            <>
              <QuizHeader
                quizDuration={selectedQuiz.duration}
                submitFunction={submitQuiz}
              />
              <QuizQuestions
                userAnswers={userAnswers}
                quizQuestions={selectedQuiz.questions}
                submitFunction={submitQuiz}
                 loading={isLoading}
              />
            </>
          )}
        </>
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        theme="colored"
      />
    </>
  );
}

export default QuizPage;
