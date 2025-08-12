import { Link } from "react-router-dom";
import "./scss/home-call-to-action.scss";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function HomeCTA() {
  return (
    <>
      <section className="cta-section">
        <motion.section
          whileInView={{
            x: ["-20%", 0],
            opacity: [0, 1],
          }}
            transition={{
                duration: 1,
            }}
          className="start-quiz-cta"
        >
          <h2>Attempt a Quiz Now</h2>
          <button>
            <Link to="/quiz">Start Quiz</Link>
          </button>
        </motion.section>
        <motion.section
          whileInView={{
            x: ["20%", 0],
            opacity: [0, 1],
          }}
            transition={{
                duration: 1,
            }}
          className="register-cta"
        >
          <h2>Create An Account</h2>
          <button>
            <Link to="/register">Sign Up</Link>
          </button>
        </motion.section>
      </section>
    </>
  );
}

export default HomeCTA;
