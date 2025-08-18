import "./scss/user-navigation.scss";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import useMobileView from "../stores-component/WindowWidthState";
import useUserData from "../stores-component/UsersData";

function UserNavigation() {
  const [navOpen, setNavOpen] = useState(false);
  const { mobileView } = useMobileView();
  const { userData } = useUserData();
  useEffect(() => {
    setNavOpen(!mobileView);
  }, [mobileView]);
  return (
    <>
      {mobileView && (
        <div onClick={() => setNavOpen(!navOpen)} className="menu-toggle">
          {!navOpen ? <FiMenu size={30} /> : <FiX size={30} />}
        </div>
      )}
      <motion.nav
        variants={{
          hidden: { opacity: 0, x: "-200%" },
          visible: {
            opacity: 1,
            x: 0,
          },
        }}
        initial="hidden"
        animate={navOpen ? "visible" : "hidden"}
        transition={{
          duration: 1.2,
        }}
        className="user-account-navigation"
      >
        <ul>
          <li>
            <Link to={`/${userData.userId.trim().toLowerCase()}/dashboard`}>
              DashBoard
            </Link>
          </li>
          <li>
            <Link to={`/${userData.userId.trim().toLowerCase()}/quiz`}>
              Quiz
            </Link>
          </li>
          <li>
            <Link to={`/${userData.userId.trim().toLowerCase()}/profile`}>
              Profile
            </Link>
          </li>
          <li>
            <Link to={`/${userData.userId.trim().toLowerCase()}/quiz_history`}>
              Quiz History
            </Link>
          </li>
          {userData.admin && (
            <li>
              <Link to={`/add_quiz`}>Add Quiz</Link>
            </li>
          )}
          <li>
            <Link to={`/${userData.userId.trim().toLowerCase()}/settings`}>
              Settings
            </Link>
          </li>
        </ul>
      </motion.nav>
    </>
  );
}

export default UserNavigation;
