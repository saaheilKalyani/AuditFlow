import React from 'react'

const StepBusinessDetails = ({ data, onChange }) => {
  return (
    <div className="space-y-4">

      <div>
        <label htmlFor="businessType" className="block text-sm font-medium">
          Business Type
        </label>
        <input
          id="businessType"
          type="text"
          name="businessType"
          value={data.businessType || ''}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="SaaS, On-prem, Hybrid..."
        />
      </div>

      <div>
        <label htmlFor="dataSensitivity" className="block text-sm font-medium">
          Data Sensitivity
        </label>
        <select
          id="dataSensitivity"
          name="dataSensitivity"
          value={data.dataSensitivity || ''}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Select</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div>
        <label htmlFor="employees" className="block text-sm font-medium">
          Number of Employees
        </label>
        <input
          id="employees"
          type="number"
          name="employees"
          value={data.employees || ''}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="100"
        />
      </div>

    </div>
  )
}

export default StepBusinessDetails
