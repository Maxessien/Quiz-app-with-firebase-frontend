import { Link } from "react-router-dom";
import "./scss/home-header.scss";
import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

function HomePageHeader() {
  const [mobileView, setMobileView] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleHamburgerMenu() {
    if (window.innerWidth < 768) {
      setMobileView(true);
      setMenuOpen(false);
    } else {
      setMobileView(false);
      setMenuOpen(true);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleHamburgerMenu);
    handleHamburgerMenu();

    return () => window.removeEventListener("resize", handleHamburgerMenu);
  }, []);

  return (
    <>
      <header className="home-header">
        <img src="/quiz-app-logo.png" alt="logo" />

        <div className="logo-seperator">
          {!menuOpen ? (
            <>
              {mobileView && (
                <div
                  onClick={() => {
                    setMenuOpen(true);
                  }}
                  className="hamburger-icon"
                >
                  <GiHamburgerMenu size={24} />
                </div>
              )}
            </>
          ) : (
            <>
              {mobileView && (
                <div onClick={() => setMenuOpen(false)} className="close-icon">
                  <RxCross1 size={24} color="rgb(230, 230, 230)" />
                </div>
              )}
              <AnimatePresence>
                <motion.nav
                  animate={{
                    opacity: [0.5, 1],
                  }}
                  exit={{
                    opacity: 0.5,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="home-nav"
                >
                  <ul className="home-nav-list">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/quiz">Practice Quiz</Link>
                    </li>
                    <li>
                      <Link to="/register">Sign Up</Link>
                    </li>
                    <li>
                      <Link to="/login">Log In</Link>
                    </li>
                  </ul>
                </motion.nav>
              </AnimatePresence>
            </>
          )}
        </div>
      </header>
    </>
  );
}

export default HomePageHeader;
