import { EditButton } from '../components/edit-button/index'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Providers from '../utils/test-utils'

test('should click edit button', () => {
  render(
    <Providers>
      <EditButton>Test</EditButton>
    </Providers>
  )
  const RegisterButton = screen.getByRole('button', { name: 'Test' })
  userEvent.click(RegisterButton)
})
