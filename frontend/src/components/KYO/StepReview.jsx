// frontend/src/components/KYO/StepReview.jsx
import React from 'react'

const StepReview = ({ data }) => {
  return (
    <div className="space-y-3">
      <h4 className="font-semibold">Review</h4>
      <div className="text-sm text-gray-700">
        <p><strong>Company:</strong> {data.companyName}</p>
        <p><strong>Industry:</strong> {data.industry}</p>
        <p><strong>Region:</strong> {data.region}</p>
        <p><strong>Business Type:</strong> {data.businessType}</p>
        <p><strong>Data Sensitivity:</strong> {data.dataSensitivity}</p>
        <p><strong>Maturity:</strong> {data.maturityLevel}</p>
        <p><strong>Risk Rating:</strong> {data.riskRating}</p>
        <p><strong>Goal:</strong> {data.goal}</p>
      </div>
    </div>
  )
}

export default StepReview
