import { Link } from "react-router-dom";
import { useState } from "react";
import "./scss/home-hero-section.scss";
import BgDesign from "./BgDesign";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function HomeHeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <>
      <section className="hero-section">
        <BgDesign />
        <div className="hero-content">
          <h1>LASU CSC Quiz Hub</h1>
          <p>
            Test your knowledge with our interactive quizzes designed for LASU
            Computer Science Students. Join now and start learning!
          </p>
          <button className="cta-button">
            <Link to="/quiz">Start Quiz</Link>{" "}
          </button>
        </div>

        <div className="hero-image">
          {imageLoaded && (
            <motion.div
              className="light-bulb-glow"
              initial={{ opacity: 0.5, scale: 0.8, x: "-50%" }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            ></motion.div>
          )}
          <img
            onLoad={() => setImageLoaded(true)}
            src="Light bulb trim.png"
            alt="Glowing light bulb illustration"
          />
        </div>
      </section>
    </>
  );
}

export default HomeHeroSection;
