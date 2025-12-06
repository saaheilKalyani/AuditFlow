// frontend/src/components/KYO/StepCompanyDetails.jsx
import React from 'react'

const StepCompanyDetails = ({ data, onChange }) => {
  return (
    <div className="space-y-4">

      <div>
        <label htmlFor="companyName" className="block text-sm font-medium">
          Company Name
        </label>
        <input
          id="companyName"
          type="text"
          name="companyName"
          value={data.companyName || ''}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="Acme Corp"
        />
      </div>

      <div>
        <label htmlFor="industry" className="block text-sm font-medium">
          Industry
        </label>
        <input
          id="industry"
          type="text"
          name="industry"
          value={data.industry || ''}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="Security, Finance, Healthcare..."
        />
      </div>

      <div>
        <label htmlFor="region" className="block text-sm font-medium">
          Region
        </label>
        <input
          id="region"
          type="text"
          name="region"
          value={data.region || ''}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="Global, APAC, EMEA..."
        />
      </div>
    </div>
  )
}

export default StepCompanyDetails
