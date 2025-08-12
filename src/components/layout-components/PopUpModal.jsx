// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const PopUpModal = ({ children, customClassName, speed=0.5 }) => {
  const popUpStlyes = {
    position: "fixed",
    top: "50vh",
    left: "50vw",
    transform: "translate(-50%, -50%)",
    width: "max-content",
  };
  return (
    <>
      <div style={popUpStlyes}>
        <motion.div
        style={{width: "max-content"}}
          animate={{
            scale: [0, 1.3, 1],
            opacity: [0.4, 1],
          }}
          transition={{
            duration: speed,
            ease: "easeOut"
          }}
          className={customClassName}
        >
          {children}
        </motion.div>
      </div>
    </>
  );
};

export default PopUpModal;
