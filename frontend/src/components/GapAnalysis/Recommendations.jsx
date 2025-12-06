// frontend/src/components/GapAnalysis/Recommendations.jsx
import React from 'react'

const Recommendations = ({ recommendations = [] }) => {
  if (!recommendations || recommendations.length === 0) {
    return <div className="text-sm text-gray-600">No recommendations.</div>
  }

  return (
    <div className="space-y-2">
      {recommendations.map((r, i) => (
        <div key={i} className="border rounded p-2 bg-white">
          <div className="text-sm font-medium">{r.type}</div>
          <div className="text-xs text-gray-600">{r.message}</div>
        </div>
      ))}
    </div>
  )
}

export default Recommendations
