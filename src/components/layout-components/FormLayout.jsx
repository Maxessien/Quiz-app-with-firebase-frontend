import { useEffect } from "react";
import useDarkMode from "../stores-component/DarkLightThemeStore";
import "../Forms/scss/form-page.scss"
import HomePageHeader from "../home-components/HomeHeader"

const FormLayout = ({children})=>{
  const { isDarkMode } = useDarkMode();
  useEffect(() => {
    document.body.style.background = isDarkMode
      ? "linear-gradient(to bottom, rgb(0, 21, 27), rgb(38, 66, 75))"
      : "linear-gradient(to bottom, rgb(150, 149, 149), rgb(206, 206, 206))";
    return () => (document.body.style.background = "");
  }, [isDarkMode]);

  return (
    <>
    <HomePageHeader />
      <main className="form-wrapper">
        <section className="form-content">
          {children}
        </section>
      </main>
    </>
  );
}

export default FormLayout