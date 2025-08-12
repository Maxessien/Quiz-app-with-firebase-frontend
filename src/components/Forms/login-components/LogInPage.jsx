import LoginHeader from "./LoginHeader";
import LoginFooter from "./LogInFooter";
import LoginForm from "./LogInForm";
import FormLayout from "../../layout-components/FormLayout";

function Login() {
  return (
    <>
      <FormLayout>
        <LoginHeader />
        <LoginForm />
        <LoginFooter />
      </FormLayout>
      ;
    </>
  );
}

export default Login;
