import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from '../components/Landing/Navbar'

test('Navbar renders brand and links', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  )

  expect(getByText('AuditFlow')).toBeTruthy()
  expect(getByText('Login')).toBeTruthy()
  expect(getByText('Register')).toBeTruthy()
})
