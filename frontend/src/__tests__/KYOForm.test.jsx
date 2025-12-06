import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import KYO from '../pages/KYO'
import api from '../services/api'

// mock api
vi.mock('../services/api', () => {
  return {
    default: {
      post: vi.fn()
    }
  }
})

describe('KYO multi-step form', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  test('navigates steps and submits to api and shows recommendations', async () => {
    const sampleResp = {
      data: {
        input: { industry: 'Security', region: 'Global', dataSensitivity: 'High' },
        results: [
          { id: '1', key: 'ISO27001', name: 'ISO 27001', year: 2022, score: 40, sector: 'Security', description: 'Information Security Management Standard' }
        ]
      }
    }

    api.post.mockResolvedValueOnce(sampleResp)

    const { getByText, getByLabelText, findByText } = render(
      <MemoryRouter>
        <KYO />
      </MemoryRouter>
    )

    // Step 1 - fill company details
    const companyInput = getByLabelText(/Company Name/i)
    fireEvent.change(companyInput, { target: { value: 'Acme' } })

    const industryInput = getByLabelText(/Industry/i)
    fireEvent.change(industryInput, { target: { value: 'Security' } })

    const regionInput = getByLabelText(/Region/i)
    fireEvent.change(regionInput, { target: { value: 'Global' } })

    // Next to Business
    fireEvent.click(getByText('Next'))

    // Step 2 - Business
    const businessInput = getByLabelText(/Business Type/i)
    fireEvent.change(businessInput, { target: { value: 'SaaS' } })

    const sensitivitySelect = getByLabelText(/Data Sensitivity/i)
    fireEvent.change(sensitivitySelect, { target: { value: 'High' } })

    fireEvent.click(getByText('Next'))

    // Step 3 - Risk
    const maturitySelect = getByLabelText(/Maturity Level/i)
    fireEvent.change(maturitySelect, { target: { value: 'Managed' } })

    const riskSelect = getByLabelText(/Risk Rating/i)
    fireEvent.change(riskSelect, { target: { value: 'High' } })

    fireEvent.click(getByText('Next'))

    // Step 4 - Goals
    const goalInput = getByLabelText(/Primary Goal/i)
    fireEvent.change(goalInput, { target: { value: 'SOC2 readiness' } })

    fireEvent.click(getByText('Next'))

    // Review step - submit
    fireEvent.click(getByText('Submit'))

    // wait for api call and result rendering
    await waitFor(() => expect(api.post).toHaveBeenCalledTimes(1))
    await findByText('ISO 27001')
  })
})
