import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Teste from '../components/teste/index'

test('component Teste', async () => {
  render(<Teste />)

  expect(await screen.findByText('Teste:')).toBeInTheDocument()
  const input = screen.getByTestId('input-teste')
  userEvent.type(input, 'teste')

  const btn = screen.getByTestId('btn-teste')
  userEvent.click(btn)
})
