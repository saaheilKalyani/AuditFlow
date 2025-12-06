// frontend/src/components/Reports/Charts.jsx
import React from "react";

/*
  Minimal charts rendering using div bars.
  Expects data to contain something like:
    { score: 17, byFramework: [{ name, score }, ...] }
*/

const Charts = ({ data = {} }) => {
  const score = data.score ?? data.overallScore ?? 0;
  const byFramework = data.byFramework || data.frameworks || [];

  return (
    <div className="bg-white border rounded p-4">
      <h3 className="text-lg font-semibold mb-3">Charts</h3>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <div className="text-sm font-medium">Overall Score</div>
          <div className="text-sm font-semibold">{score}%</div>
        </div>
        <div className="w-full bg-gray-200 h-4 rounded">
          <div className="h-4 bg-blue-500 rounded" style={{ width: `${score}%` }} />
        </div>
      </div>

      {byFramework.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-2">By Framework</h4>
          <div className="space-y-2">
            {byFramework.map((b, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <div>{b.name}</div>
                  <div className="font-semibold">{b.score ?? b.compliancePercent ?? 0}%</div>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded">
                  <div
                    className="h-3 bg-indigo-500 rounded"
                    style={{ width: `${b.score ?? b.compliancePercent ?? 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Charts;
