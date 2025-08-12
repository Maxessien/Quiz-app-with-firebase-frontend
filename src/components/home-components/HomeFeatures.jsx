// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./scss/home-features.scss";

function HomeFeatures() {
  return (
    <>
      <section className="home-features">
        <div className="features-showcase">
          <motion.img
            whileInView={{
              x: ["100%", 0],
              y: ["20%", 0],
              opacity: [0, 1],
            }}
            transition={{
                duration: 0.6,
            }}
            src="/quiz app phone mockup trim.png"
            alt="App features illustrations"
          />
        </div>

        <div className="features-content">
          <h2>FEATURES</h2>

          <ul>
            <li>
              <h3>Zero Login To Practice</h3>
              <p>
                Jump into a quiz - no account needed. Perfect for quick revision
              </p>
            </li>
            <li>
              <h3>Instant Feedback</h3>
              <p>
                Get immediate Results after and explanations for each questions
                - no waiting, no guessing
              </p>
            </li>
            <li>
              <h3>Progress Tracking</h3>
              <p>
                See your performance over time and track your strong and weak
                areas
              </p>
            </li>
            <li>
              <h3>Mobile Friendly</h3>
              <p>
                Optimized for both desktop and mobile - revise on the go from
                anywhere
              </p>
            </li>
            <li>
              <h3>Dark Theme</h3>
              <p>Study comfortably anytime with a sleek dark UI</p>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default HomeFeatures;
