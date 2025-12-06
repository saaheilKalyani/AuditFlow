import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Automate Your Audit Flow</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          Streamline frameworks, mappings, gap analysis, and reporting—all in
          one platform.
        </p>

        <Link
          to="/register"
          className="px-5 py-2 bg-indigo-600 text-white rounded text-sm"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default Hero;
