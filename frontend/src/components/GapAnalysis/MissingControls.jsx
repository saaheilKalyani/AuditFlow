// frontend/src/components/GapAnalysis/MissingControls.jsx
import React from 'react'

const MissingControls = ({ missing = [] }) => {
  if (!missing || missing.length === 0) {
    return <div className="text-sm text-gray-600">No missing controls.</div>
  }

  return (
    <div className="space-y-2">
      {missing.map((m) => (
        <div key={m.id || m.controlId} className="border rounded p-2 bg-white">
          <div className="text-sm font-semibold">{m.name || m.controlId}</div>
          <div className="text-xs text-gray-500">{m.controlId || ''}</div>
        </div>
      ))}
    </div>
  )
}

export default MissingControls
