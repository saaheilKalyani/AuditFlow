// frontend/src/components/Projects/FrameworkToggleCard.jsx
import React from 'react'

const FrameworkToggleCard = ({ framework, selected, onToggle }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={() => onToggle(framework._id)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onToggle(framework._id) }}
      className={`border rounded p-4 cursor-pointer select-none focus:outline-none ${
        selected ? 'bg-indigo-50 border-indigo-400' : 'bg-white hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">{framework.name}</h3>
        <div className="text-xs text-gray-500">{framework.year}</div>
      </div>
      <p className="text-xs text-gray-600 mt-2">{framework.description}</p>
    </div>
  )
}

export default FrameworkToggleCard
