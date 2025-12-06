// frontend/src/components/GapAnalysis/ScoreBar.jsx
import React from 'react'

/**
 * Simple horizontal progress bar
 * props:
 *  - score: number (0..100)
 */
const ScoreBar = ({ score = 0 }) => {
  const pct = Math.max(0, Math.min(100, Number(score || 0)))
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium">Compliance Score</div>
        <div className="text-sm font-semibold">{pct}%</div>
      </div>

      <div className="w-full bg-gray-200 h-4 rounded">
        <div
          className="h-4 bg-green-500 rounded"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    </div>
  )
}

export default ScoreBar
