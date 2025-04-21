import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Title from '@/app/components/Title'

test('Page', () => {
  render(<Title>Sample Title</Title>)
  expect(
    screen.getByRole('heading', { level: 2, name: 'Sample Title' })
  ).toBeDefined()
})
