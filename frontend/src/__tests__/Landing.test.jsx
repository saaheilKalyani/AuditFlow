import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Landing from '../pages/Landing'

test('Landing page loads sections', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Landing />
    </MemoryRouter>
  )

  expect(getByText('Automate Your Audit Flow')).toBeTruthy()
  expect(getByText('Platform Features')).toBeTruthy()
})
