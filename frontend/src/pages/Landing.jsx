import React from "react";
import Navbar from "../components/Landing/Navbar";
import Hero from "../components/Landing/Hero";
import FeatureCards from "../components/Landing/FeatureCards";
import FrameworkGrid from "../components/Landing/FrameworkGrid";
import Footer from "../components/Landing/Footer";

const Landing = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <FeatureCards />
      <FrameworkGrid />
      <Footer />
    </>
  );
};

export default Landing;
