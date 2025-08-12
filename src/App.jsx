import HomePage from "./components/home-components/Home";
import QuizPage from "./components/quiz-page-component/QuizPage";
import Register from "./components/Forms/register-component/Register";
import { Navigate, Route, Routes, Outlet, useNavigate } from "react-router-dom";
import "./index.css";
import Login from "./components/Forms/login-components/LogInPage";
import SuccessPage from "./components/all-quiz-components/SuccessPage";
import DashBoard from "./components/user-account-ui/user-dashboard/DashBoard";
import UserQuizTab from "./components/user-account-ui/UserQuizTab/UserQuizTab";
import useMobileView from "./components/stores-component/WindowWidthState";
import useQuizData from "./components/stores-component/QuizDataStore";
import { useEffect, useState } from "react";
import LoadAvailableQuiz from "./components/all-quiz-components/LoadAvailableQuiz";
import UserSettings from "./components/user-account-ui/user-settings/UserSettings";
import useDarkMode from "./components/stores-component/DarkLightThemeStore";
import UserProfile from "./components/user-account-ui/UserProfile/UserProfile";
import useUserData from "./components/stores-component/UsersData";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import AddQuestions from "./components/admin-panel/AddQuestions";

function PublicRoute() {
  const { isLoggedIn, userData } = useUserData();
  if (isLoggedIn) {
    return (
      <Navigate
        to={`/${userData.displayName.trim().toLowerCase()}/dashboard`}
        replace
      />
    );
  } else {
    return <Outlet />;
  }
}

function App() {
  const { fetchQuizData, quizData } = useQuizData();
  const { setMobileView } = useMobileView();
  const { setIsDarkMode } = useDarkMode();
  const { userData, isLoggedIn, setUserData, fetchUserData, backendBaseUrl } =
    useUserData();
  const [userVerified, setUserVerified] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // setUserData("isLoggedIn", true);
        fetchUserData(user.uid);
      } else {
        setUserData("isLoggedIn", false);
        navigate("/login");
      }
      setUserVerified(true);
    });
    const mobileCheck = () => {
      if (window.innerWidth < 768) {
        setMobileView(true);
      } else {
        setMobileView(false);
      }
    };
    window.addEventListener("resize", mobileCheck);
    mobileCheck();
    fetchQuizData(backendBaseUrl);
    setIsDarkMode("system");
    return () => window.removeEventListener("resize", mobileCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!userVerified) {
    return (
      <div className="w-screen h-screen bg-gray-700 text-2xl flex items-center justify-center text-white">
        <motion.img src="/quiz-app-logo.png" alt=""
        animate={{ scale: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
         />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/add_quiz" element={<AddQuestions />} />
        <Route element={<PublicRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quiz" element={<LoadAvailableQuiz />} />
          <Route path="/quiz/success" element={<SuccessPage />} />
        </Route>
        {quizData?.map(({ id }, i) => {
          return (
            <Route
              path={`/quiz/${id}`}
              element={<QuizPage selectedQuiz={quizData[[i]]} />}
            />
          );
        })}
        {isLoggedIn && (
          <>
            <Route
              path={`/${userData.displayName.trim().toLowerCase()}/dashboard`}
              element={<DashBoard />}
            />
            <Route
              path={`/${userData.displayName.trim().toLowerCase()}/quiz`}
              element={<UserQuizTab />}
            />
            <Route
              path={`/${userData.displayName.trim().toLowerCase()}/settings`}
              element={<UserSettings />}
            />
            <Route
              path={`/${userData.displayName.trim().toLowerCase()}/profile`}
              element={<UserProfile />}
            />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
