import React from 'react'

const StepGoals = ({ data, onChange }) => {
  return (
    <div className="space-y-4">

      <div>
        <label htmlFor="goal" className="block text-sm font-medium">
          Primary Goal
        </label>
        <input
          id="goal"
          type="text"
          name="goal"
          value={data.goal || ''}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="Example: Achieve SOC2 readiness"
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={data.notes || ''}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded"
          rows="3"
          placeholder="Any additional context..."
        ></textarea>
      </div>

    </div>
  )
}

export default StepGoals
