import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import FrameworkSelect from '../components/Projects/FrameworkSelect'
import api from '../services/api'

vi.mock('../services/api', () => {
  return {
    default: {
      get: vi.fn()
    }
  }
})

describe('FrameworkSelect', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  test('loads frameworks and calls onToggle when clicked', async () => {
    const data = [
      { _id: 'a1', name: 'ISO 27001', year: 2022, description: 'desc' },
      { _id: 'b2', name: 'SOC 2', year: 2017, description: 'desc2' }
    ]
    api.get.mockResolvedValueOnce({ data })

    const onToggle = vi.fn()
    render(<FrameworkSelect selectedIds={[]} onToggle={onToggle} />)

    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/api/frameworks'))

    // click the first card
    fireEvent.click(screen.getByText('ISO 27001'))
    expect(onToggle).toHaveBeenCalledWith('a1')
  })
})
