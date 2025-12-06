import React from 'react'

const StepRiskAssessment = ({ data, onChange }) => {
  return (
    <div className="space-y-4">

      <div>
        <label htmlFor="maturityLevel" className="block text-sm font-medium">
          Maturity Level
        </label>
        <select
          id="maturityLevel"
          name="maturityLevel"
          value={data.maturityLevel || ''}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Select</option>
          <option value="Initial">Initial</option>
          <option value="Managed">Managed</option>
          <option value="Defined">Defined</option>
          <option value="Quantitative">Quantitative</option>
          <option value="Optimizing">Optimizing</option>
        </select>
      </div>

      <div>
        <label htmlFor="riskRating" className="block text-sm font-medium">
          Risk Rating
        </label>
        <select
          id="riskRating"
          name="riskRating"
          value={data.riskRating || ''}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Select</option>
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
        </select>
      </div>

    </div>
  )
}

export default StepRiskAssessment
