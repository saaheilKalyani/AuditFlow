import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Hero from '../components/Landing/Hero'

test('Hero renders title and CTA', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Hero />
    </MemoryRouter>
  )

  expect(getByText('Automate Your Audit Flow')).toBeTruthy()
  expect(getByText('Get Started')).toBeTruthy()
})
