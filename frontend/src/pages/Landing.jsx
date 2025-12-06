import React from "react";
import Navbar from "../components/Landing/Navbar";
import Hero from "../components/Landing/Hero";
import FeatureCards from "../components/Landing/FeatureCards";
import FrameworkGrid from "../components/Landing/FrameworkGrid";
import Footer from "../components/Landing/Footer";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

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
