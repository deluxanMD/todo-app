import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Todos from '../src/app/todo/page'
import { Provider } from 'react-redux'
import { store } from '@/app/lib/store'
 
test('Page', () => {
  render(
    <Provider store={store}>
        <Todos />
    </Provider>
  )
  expect(screen.getByRole('heading', { level: 2, name: 'Todo List' })).toBeDefined()
})