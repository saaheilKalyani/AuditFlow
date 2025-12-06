import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import FrameworkToggleCard from '../components/Projects/FrameworkToggleCard'

test('FrameworkToggleCard toggles on click', () => {
  const fw = { _id: '1', name: 'ISO 27001', year: 2022, description: 'desc' }
  const onToggle = vi.fn()
  const { getByText } = render(<FrameworkToggleCard framework={fw} selected={false} onToggle={onToggle} />)

  fireEvent.click(getByText('ISO 27001'))
  expect(onToggle).toHaveBeenCalledWith('1')
})
