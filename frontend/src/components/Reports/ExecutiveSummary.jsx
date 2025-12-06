// frontend/src/components/Reports/ExecutiveSummary.jsx
import React from "react";

/*
  Props: data = { title, overview, keyFindings: [], highlights: [] }
  Provide safe defaults so component is resilient to fields missing.
*/

const ExecutiveSummary = ({ data = {} }) => {
  const { title = "Executive Summary", overview = "", keyFindings = [], highlights = [] } = data;

  return (
    <div className="bg-white border rounded p-4">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {overview && <p className="text-sm text-gray-700 mb-3">{overview}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <h4 className="font-medium text-sm mb-1">Key Findings</h4>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            {keyFindings.length ? keyFindings.map((k, i) => <li key={i}>{k}</li>) : <li>No key findings.</li>}
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-sm mb-1">Highlights</h4>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            {highlights.length ? highlights.map((h, i) => <li key={i}>{h}</li>) : <li>No highlights.</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveSummary;
