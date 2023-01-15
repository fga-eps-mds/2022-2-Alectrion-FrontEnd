import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UserLoginScreen from '../pages/user-login-screen/index'
import Providers from '../utils/test-utils'

test('login to the application', () => {
  render(
    <Providers>
      <UserLoginScreen />
    </Providers>
  )

  const usernameInput = screen.getByLabelText('Username')
  userEvent.type(usernameInput, 'fulano')

  const passwordInput = screen.getByLabelText('Senha')
  userEvent.type(passwordInput, '123456')

  const loginButton = screen.getByRole('button', { name: 'Login' })
  userEvent.click(loginButton)
})
