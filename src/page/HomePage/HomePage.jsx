import React from "react";
import Header from "../../components/Header";
import Body from "../Body/Body";
import Footer from "../../components/Footer";

const HomePage = () => {
  return (
    <>
      <Header showHeader={true} />
      <Body />
      <Footer />
    </>
  );
};

export default HomePage;
