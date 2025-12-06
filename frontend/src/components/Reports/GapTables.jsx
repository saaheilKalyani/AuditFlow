// frontend/src/components/Reports/GapTables.jsx
import React from "react";

/*
  Props: data - expected to be an array or object with missing/partial etc.
  We will handle common shapes:
    - data.missing: [{ id, controlId, name }]
    - data.partial: [...]
    - or data as a simple array of entries.
*/

const GapTables = ({ data = {} }) => {
  // normalize
  const missing = data.missing || data.missingControls || data.missing || [];
  const partial = data.partial || data.partialControls || [];

  return (
    <div className="bg-white border rounded p-4">
      <h3 className="text-lg font-semibold mb-3">Gap Tables</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium text-sm mb-2">Missing Controls</h4>
          {missing.length === 0 ? (
            <div className="text-sm text-gray-600">No missing controls</div>
          ) : (
            <div className="space-y-2">
              {missing.map((m) => (
                <div key={m.id || m.controlId} className="p-2 border rounded bg-gray-50 text-sm">
                  <div className="font-medium">{m.name || m.controlId}</div>
                  <div className="text-xs text-gray-500">{m.controlId || m.id}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h4 className="font-medium text-sm mb-2">Partial Controls</h4>
          {partial.length === 0 ? (
            <div className="text-sm text-gray-600">No partial controls</div>
          ) : (
            <div className="space-y-2">
              {partial.map((p) => (
                <div key={p.id || p.controlId} className="p-2 border rounded bg-gray-50 text-sm">
                  <div className="font-medium">{p.name || p.controlId}</div>
                  <div className="text-xs text-gray-500">{p.controlId || p.id}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GapTables;
