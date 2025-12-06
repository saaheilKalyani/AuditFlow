// frontend/src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <p className="text-gray-700 mb-6">
        Welcome! Choose a section to begin your compliance journey.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <Link
          to="/create-project"
          className="border rounded p-4 bg-white hover:shadow transition"
        >
          <h2 className="font-semibold text-lg">Create Project</h2>
          <p className="text-sm text-gray-600">
            Start a new compliance project using selected frameworks.
          </p>
        </Link>

        <Link
          to="/kyo"
          className="border rounded p-4 bg-white hover:shadow transition"
        >
          <h2 className="font-semibold text-lg">Know Your Organization</h2>
          <p className="text-sm text-gray-600">
            Get framework recommendations based on your company profile.
          </p>
        </Link>

        <Link
          to="/frameworks"
          className="border rounded p-4 bg-white hover:shadow transition"
        >
          <h2 className="font-semibold text-lg">Frameworks</h2>
          <p className="text-sm text-gray-600">
            Explore all available frameworks and start assessments.
          </p>
        </Link>

        <Link
          to="/knowledge"
          className="border rounded p-4 bg-white hover:shadow transition"
        >
          <h2 className="font-semibold text-lg">Knowledge Hub</h2>
          <p className="text-sm text-gray-600">
            Blogs, FAQs, case studies, and learning center.
          </p>
        </Link>

      </div>
    </div>
  );
};

export default Home;
