import RegisterForm from "./RegisterForm";
import RegisterHeader from "./RegisterHeader";
import RegisterFooter from "./RegisterFooter";
import FormLayout from "../../layout-components/FormLayout";
// import BgDesign from "../../home-components/BgDesign";

function Register() {
  return (
    <>
      <FormLayout>
        <RegisterHeader />
        <RegisterForm />
        <RegisterFooter />
      </FormLayout>
      ;
    </>
  );
}

export default Register;
