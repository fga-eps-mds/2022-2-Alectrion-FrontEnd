import { render, screen } from '@testing-library/react'
import Providers from '../utils/test-utils'
import userEvent from '@testing-library/user-event'
import UserScreen from '../pages/user-screen/index'
import { AuthContext } from '../contexts/auth'

test('must edit user', async () => {
  render(
    <Providers>
      <AuthContext.Provider
        value={{
          isAuthenticated: 'authenticated',
          user: {
            token: 'wjhqwejk',
            expireIn: 'sdfjhsdf',
            email: 'user@user.com',
            name: 'user',
            role: 'administrador'
          },
          Login: jest.fn(),
          Logout: jest.fn()
        }}>
        <UserScreen />
      </AuthContext.Provider>
    </Providers>
  )

  expect(await screen.findByText('Usuários')).toBeInTheDocument()

  expect(await screen.findByText('Nome do usuário')).toBeInTheDocument()

  expect(await screen.findByText('Email')).toBeInTheDocument()

  expect(await screen.findByText('Perfil')).toBeInTheDocument()

  expect(await screen.findByText('Cargo')).toBeInTheDocument()

  const RegisterButton = screen.getByTestId('userRegister')
  userEvent.click(RegisterButton)
})
