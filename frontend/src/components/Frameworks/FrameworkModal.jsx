import React from "react";
import { useNavigate } from "react-router-dom";

const FrameworkModal = ({ framework, onClose }) => {
  const navigate = useNavigate();

  if (!framework) return null;

  const goToAssessment = () => {
    navigate(`/frameworks/${framework._id}`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">{framework.name}</h2>

        <p className="text-sm text-gray-600">Year: {framework.year}</p>
        <p className="text-sm text-gray-600">Sector: {framework.sector}</p>
        <p className="text-sm text-gray-700 mt-3">{framework.description}</p>

        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="px-3 py-1 border rounded"
          >
            Close
          </button>

          <button
            onClick={goToAssessment}
            className="px-4 py-1 bg-indigo-600 text-white rounded"
          >
            Start Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default FrameworkModal;
