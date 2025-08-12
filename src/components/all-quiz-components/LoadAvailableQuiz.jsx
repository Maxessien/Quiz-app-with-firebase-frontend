import HomePageHeader from "../home-components/HomeHeader";
import AvailableQuizList from "../layout-components/AvailableQuizList";
import "./scss/load-available-quiz.scss";


function LoadAvailableQuiz() {

  return (
    <>
    <HomePageHeader />
      <main className="available-quiz-main">
        <h1>Available Quizzes</h1>
        <AvailableQuizList />
      </main>
    </>
  );
}

export default LoadAvailableQuiz;
