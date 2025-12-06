// frontend/src/components/KYO/RecommendationCards.jsx
import React from 'react'

const RecommendationCards = ({ results }) => {
  if (!results || results.length === 0) {
    return <div className="text-sm text-gray-600">No recommendations found.</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {results.map((r) => (
        <div key={r.id} className="border p-4 rounded bg-white">
          <h5 className="font-semibold mb-1">{r.name}</h5>
          <div className="text-xs text-gray-500 mb-2">{r.key} • {r.year}</div>
          <p className="text-sm text-gray-700">{r.description}</p>
          <div className="mt-3">
            <span className="text-sm font-medium">Score:</span> <span>{r.score}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RecommendationCards
