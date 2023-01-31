import { render, screen, waitFor, getByRole } from '@testing-library/react'
import Providers from '../../utils/test-utils'
import userEvent from '@testing-library/user-event'
import EditUser from './index'
import { AuthContext } from '../../contexts/auth'
test('must edit user', async () => {
    const location = {
        state: {
            userId: '1'
        },
        key: 'teste'
    }

    render(
        <Providers location={location}>
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
                < EditUser />
            </AuthContext.Provider>
        </Providers>
    )

    expect(await screen.findByText('Edição de Usuário')).toBeInTheDocument()

    const nameInput = screen.getByLabelText('Nome completo')
    userEvent.type(nameInput, 'Fulano')

    const emailInput = screen.getByLabelText('Email')
    userEvent.type(emailInput, 'Fulano@email.com')

    const userNameInput = screen.getByLabelText('Nome de usuário')
    userEvent.type(userNameInput, 'fulano')

    const jobInput = getByRole(screen.getByTestId('jobSelect'), 'button')
    userEvent.click(jobInput)
    await waitFor(() => userEvent.click(screen.getByText(/Coordenador/i)))

    const profileInput = getByRole(screen.getByTestId('profileSelect'), 'button')
    userEvent.click(profileInput)
    await waitFor(() => userEvent.click(screen.getByText(/Admin/i)))

    const RegisterButton = screen.getByRole('button', { name: 'Editar' })
    userEvent.click(RegisterButton)

    expect(await screen.findByText('Voltar')).toBeInTheDocument()
})
