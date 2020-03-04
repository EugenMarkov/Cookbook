import React from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import OnlyForAuthorizedUsers from "../../components/OnlyForAuthorizedUsers";
import ScrollOnTop from "../../components/common/ScrollOnTop/ScrollOnTop";
import BackToTop from "../../components/common/GoUpButton";


function HomePage() {
  return (
    <>
      <ScrollOnTop />
      <BackToTop />
      <Header />
      <OnlyForAuthorizedUsers />
      <Footer />
    </>
  );
}

export default HomePage;
