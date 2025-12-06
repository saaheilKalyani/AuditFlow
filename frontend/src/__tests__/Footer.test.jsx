import React from 'react'
import { render } from '@testing-library/react'
import Footer from '../components/Landing/Footer'

test('Footer renders copyright', () => {
  const { getByText } = render(<Footer />)

  expect(getByText(/AuditFlow/)).toBeTruthy()
})
