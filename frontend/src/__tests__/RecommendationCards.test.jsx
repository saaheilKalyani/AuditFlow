import React from 'react'
import { render } from '@testing-library/react'
import RecommendationCards from '../components/KYO/RecommendationCards'

test('renders recommendation card', () => {
  const items = [
    { id: '1', key: 'ISO27001', name: 'ISO 27001', year: 2022, score: 40, sector: 'Security', description: 'desc' }
  ]
  const { getByText } = render(<RecommendationCards results={items} />)
  expect(getByText('ISO 27001')).toBeTruthy()
  expect(getByText(/Score:/)).toBeTruthy()
})
