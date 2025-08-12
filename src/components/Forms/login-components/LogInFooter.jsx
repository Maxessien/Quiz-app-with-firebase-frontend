import { Link } from "react-router-dom";
import "../scss/form-footer.scss";

function LoginFooter() {
  return (
    <>
      <p className="form-paragraph">
        Don't have an account{" "}
        <span className="form-link">
          <Link to={"/register"}>Sign Up</Link>
        </span>{" "}
      </p>
    </>
  );
}

export default LoginFooter;
