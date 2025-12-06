// frontend/src/__tests__/ProtectedRoute.test.jsx
import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../components/UI/ProtectedRoute'
import { AuthContext } from '../context/AuthContext'

function Dummy() {
  return <div>Protected</div>
}

test('redirects to /login when not authenticated', () => {
  const auth = { user: null, token: null, loading: false }
  const { getByText, queryByText } = render(
    <AuthContext.Provider value={auth}>
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/protected" element={<Dummy />} />
          </Route>
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  )

  expect(queryByText('Protected')).toBeNull()
  expect(getByText('Login Page')).toBeTruthy()
})
