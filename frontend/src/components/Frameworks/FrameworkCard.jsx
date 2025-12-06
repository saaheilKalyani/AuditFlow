import React from "react";

const FrameworkCard = ({ framework, onClick }) => {
  return (
    <div
      onClick={() => onClick(framework)}
      className="border rounded p-4 bg-white cursor-pointer hover:bg-gray-50"
    >
      <h3 className="font-semibold">{framework.name}</h3>
      <p className="text-xs text-gray-500">{framework.year} • {framework.sector}</p>
      <p className="text-sm text-gray-600 mt-2">{framework.description}</p>
    </div>
  );
};

export default FrameworkCard;
