import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import SummaryPanel from '../components/GapAnalysis/SummaryPanel'
import api from '../services/api'

vi.mock('../services/api', () => {
  return {
    default: {
      get: vi.fn()
    }
  }
})

describe('SummaryPanel', () => {
  beforeEach(() => vi.resetAllMocks())

  test('renders summary and triggers downloads', async () => {
    const projectId = 'proj1'
    const summary = {
      score: 42,
      totalControls: 10,
      answered: 3,
      missingControls: 7,
      recommendations: [{ type: 'MISSING', message: 'Missing C1' }],
      missing: [{ id: 'c2', controlId: 'C2', name: 'Control 2' }]
    }

    // Mock downloads to return a blob-like object
    api.get.mockImplementation((path, opts) => {
      // return a mock blob via { data: new Blob([...]) }
      return Promise.resolve({ data: new Blob(['test']), headers: { 'content-type': 'application/octet-stream' } })
    })

    const { getByText } = render(<SummaryPanel projectId={projectId} summary={summary} />)

    // check score text
    expect(getByText('42%')).toBeTruthy()
    expect(getByText('Missing Controls')).toBeTruthy()
    expect(getByText('Recommendations')).toBeTruthy()

    // click export json -> should call api.get
    fireEvent.click(getByText('Export JSON'))
    await waitFor(() => expect(api.get).toHaveBeenCalledWith(`/api/reports/${projectId}/json`, { responseType: 'blob' }))

    fireEvent.click(getByText('Export CSV'))
    await waitFor(() => expect(api.get).toHaveBeenCalledWith(`/api/reports/${projectId}/csv`, { responseType: 'blob' }))

    fireEvent.click(getByText('Export PDF'))
    await waitFor(() => expect(api.get).toHaveBeenCalledWith(`/api/reports/${projectId}/pdf`, { responseType: 'blob' }))
  })
})
