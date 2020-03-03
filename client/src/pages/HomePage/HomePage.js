import React from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RecipesList from "../../components/RecipesList";
import ScrollOnTop from "../../components/common/ScrollOnTop/ScrollOnTop";
import BackToTop from "../../components/common/GoUpButton";
// import PreloaderAdaptive from "../../components/Preloader/Adaptive";


function HomePage() {
  return (
    <>
      <ScrollOnTop />
      <BackToTop />
      <Header />
      {/*<PreloaderAdaptive />*/}
      <RecipesList />
      <Footer />
    </>
  );
}

export default HomePage;
