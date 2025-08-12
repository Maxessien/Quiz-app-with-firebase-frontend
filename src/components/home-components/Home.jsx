import HomeCTA from "./HomeCallToAction";
import HomeFeatures from "./HomeFeatures";
import HomePageHeader from "./HomeHeader";
import HomeHeroSection from "./HomeHeroSection";
// import "./scss/home-page.scss"

function HomePage() {
  document.body.style.background = "black";
  return (
    <>
      <HomePageHeader />
      <HomeHeroSection />
      <HomeFeatures />
      <HomeCTA />
    </>
  );
}

export default HomePage;
