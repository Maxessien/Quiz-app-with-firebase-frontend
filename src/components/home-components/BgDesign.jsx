import useMobileView from "../stores-component/WindowWidthState";

function BgDesign() {
  const { mobileView } = useMobileView();
  const bgDesignStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100%",
    zIndex: "-999",
    background: "rgb(0, 0, 0)",
    color: "rgb(224, 224, 224)",
    overflow: "hidden",
  };

  const bgDesignTextStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: mobileView ? `${50 / 16}rem` : `10vw`,
    fontWeight: 700,
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    filter: "blur(0.8px)",
    opacity: 0.13,
  };

  return (
    <>
      <div style={bgDesignStyles}>
        <div style={bgDesignTextStyles}>MAX QUIZ</div>
      </div>
    </>
  );
}

export default BgDesign;
