// frontend/src/pages/KYO.jsx
import React, { useState } from 'react'
import StepCompanyDetails from '../components/KYO/StepCompanyDetails'
import StepBusinessDetails from '../components/KYO/StepBusinessDetails'
import StepRiskAssessment from '../components/KYO/StepRiskAssessment'
import StepGoals from '../components/KYO/StepGoals'
import StepReview from '../components/KYO/StepReview'
import RecommendationCards from '../components/KYO/RecommendationCards'
import api from '../services/api'

const steps = [
  { id: 'company', title: 'Company' },
  { id: 'business', title: 'Business' },
  { id: 'risk', title: 'Risk' },
  { id: 'goals', title: 'Goals' },
  { id: 'review', title: 'Review' }
]

const initialData = {
  companyName: '',
  industry: '',
  region: '',
  businessType: '',
  dataSensitivity: '',
  employees: '',
  maturityLevel: '',
  riskRating: '',
  goal: '',
  notes: ''
}

const KYO = () => {
  const [stepIndex, setStepIndex] = useState(0)
  const [formData, setFormData] = useState(initialData)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  const currentStep = steps[stepIndex]

  const onChange = (e) => {
    const { name, value } = e.target
    setFormData((s) => ({ ...s, [name]: value }))
  }

  const goNext = () => {
    setError(null)
    setStepIndex((i) => Math.min(i + 1, steps.length - 1))
  }

  const goBack = () => {
    setError(null)
    setStepIndex((i) => Math.max(i - 1, 0))
  }

  const submit = async () => {
    setLoading(true)
    setError(null)
    setResults(null)
    try {
      const payload = {
        companyName: formData.companyName,
        industry: formData.industry,
        region: formData.region,
        businessType: formData.businessType,
        dataSensitivity: formData.dataSensitivity,
        employees: formData.employees,
        maturityLevel: formData.maturityLevel,
        riskRating: formData.riskRating,
        goal: formData.goal,
        notes: formData.notes
      }

      const resp = await api.post('/api/kyo/analyze', payload)
      setResults(resp.data.results || [])
      // stay on same page, show recommendations below
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Submission failed')
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep.id) {
      case 'company':
        return <StepCompanyDetails data={formData} onChange={onChange} />
      case 'business':
        return <StepBusinessDetails data={formData} onChange={onChange} />
      case 'risk':
        return <StepRiskAssessment data={formData} onChange={onChange} />
      case 'goals':
        return <StepGoals data={formData} onChange={onChange} />
      case 'review':
        return <StepReview data={formData} />
      default:
        return null
    }
  }

  const progressPct = Math.round(((stepIndex + 1) / steps.length) * 100)

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Know Your Organization (KYO)</h2>

      {/* Progress */}
      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-1">Step {stepIndex + 1} of {steps.length} — {currentStep.title}</div>
        <div className="w-full bg-gray-200 h-2 rounded">
          <div className="h-2 bg-indigo-600 rounded" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Form Card */}
      <div className="border rounded p-4 bg-white mb-6">
        {renderStep()}

        <div className="mt-4 flex items-center justify-between">
          <div>
            <button
              onClick={goBack}
              disabled={stepIndex === 0}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Back
            </button>
          </div>

          <div className="flex items-center gap-2">
            {stepIndex < steps.length - 1 ? (
              <button onClick={goNext} className="px-3 py-1 bg-indigo-600 text-white rounded">
                Next
              </button>
            ) : (
              <button
                onClick={submit}
                className="px-3 py-1 bg-green-600 text-white rounded"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>
        </div>

        {error && <div className="mt-3 text-sm text-red-700">{error}</div>}
      </div>

      {/* Recommendations (same page) */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Recommendations</h3>
        {results === null ? (
          <div className="text-sm text-gray-600">No recommendations yet. Submit the form to get recommendations.</div>
        ) : (
          <RecommendationCards results={results} />
        )}
      </div>
    </div>
  )
}

export default KYO
