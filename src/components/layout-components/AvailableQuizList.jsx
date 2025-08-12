import useQuizData from "../stores-component/QuizDataStore";
import { Link } from "react-router-dom";
import "./scss/available-quiz-list.scss";

function AvailableQuizList() {
  const { quizData } = useQuizData();
  return (
    <>
      <ul className="available-quiz-list">
        {quizData.map(({ title, id }, index) => {
          return (
            <Link className="quiz-link" key={`${id}-${index}`} to={`/quiz/${id}`}>
              <li>{title}</li>
            </Link>
          );
        })}
      </ul>
    </>
  );
}

export default AvailableQuizList;
