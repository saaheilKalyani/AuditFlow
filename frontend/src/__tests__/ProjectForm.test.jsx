import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ProjectForm from '../components/Projects/ProjectForm'
import api from '../services/api'

const mockNavigate = vi.fn()

// Mock react-router-dom useNavigate to capture navigation calls
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

// Mock api
vi.mock('../services/api', () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn()
    }
  }
})

describe('ProjectForm', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  test('creates project and redirects to gap analysis', async () => {
    const frameworks = [
      { _id: 'f1', name: 'ISO 27001', year: 2022, description: 'desc' },
      { _id: 'f2', name: 'SOC 2', year: 2017, description: 'desc2' }
    ]
    api.get.mockResolvedValueOnce({ data: frameworks })

    const createdResp = {
      data: {
        message: 'Project created successfully',
        project: { _id: 'proj123', title: 'Test', frameworks: ['f1', 'f2'] }
      }
    }
    api.post.mockResolvedValueOnce(createdResp)

    render(<ProjectForm />)

    // wait for frameworks load
    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/api/frameworks'))

    fireEvent.change(screen.getByLabelText(/Project Title/i), { target: { value: 'Test Project' } })

    // select both frameworks
    fireEvent.click(screen.getByText('ISO 27001'))
    fireEvent.click(screen.getByText('SOC 2'))

    // submit
    fireEvent.click(screen.getByRole('button', { name: /Create Project/i }))

    await waitFor(() => expect(api.post).toHaveBeenCalledTimes(1))
    expect(api.post).toHaveBeenCalledWith('/api/projects', {
      title: 'Test Project',
      frameworks: ['f1', 'f2']
    })

    // ensure navigation was invoked to gap-analysis/proj123
    expect(mockNavigate).toHaveBeenCalledWith('/gap-analysis/proj123')
  })
})
