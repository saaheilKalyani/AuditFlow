import React from 'react'
import { render } from '@testing-library/react'
import FeatureCards from '../components/Landing/FeatureCards'

test('Feature cards render', () => {
  const { getByText } = render(<FeatureCards />)

  expect(getByText('Frameworks')).toBeTruthy()
  expect(getByText('Gap Analysis')).toBeTruthy()
})
