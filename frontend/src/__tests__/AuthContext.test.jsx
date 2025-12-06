import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider, AuthContext } from '../context/AuthContext'
import api, { setLogoutHandler } from '../services/api'
import { act } from 'react-dom/test-utils'

// Vitest mock
vi.mock('../services/api', () => {
  return {
    default: {
      post: vi.fn()
    },
    setLogoutHandler: vi.fn()
  }
})

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.resetAllMocks()
  })

  test('login sets token and user', async () => {
    const fakeResp = {
      data: {
        token: 'tok-1',
        user: { name: 'Alice', email: 'a@b' }
      }
    }

    api.post.mockResolvedValueOnce(fakeResp)

    let contextValue

    render(
      <MemoryRouter>
        <AuthProvider>
          <AuthContext.Consumer>
            {(value) => {
              contextValue = value
              return null
            }}
          </AuthContext.Consumer>
        </AuthProvider>
      </MemoryRouter>
    )

    await act(async () => {
      await contextValue.login('a@b', 'pwd')
    })

    expect(localStorage.getItem('auditflow_token')).toBe('tok-1')
    expect(contextValue.user).toEqual({ name: 'Alice', email: 'a@b' })
    expect(contextValue.token).toBe('tok-1')
  })
})
