import { EditButton } from './index'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Providers from '../../utils/test-utils'
import { AuthContext } from '../../contexts/auth'

test('should click edit button', () => {
    const location = {
        state: {
            userId: "1",
        },
        user: {
            role: "gerente"
        }
    };
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
                <EditButton /*hidden={true}*/ /*role={'button'}*/>Test</EditButton>
            </AuthContext.Provider>
        </Providers>
    )
    // problema: useContext do componente pega o user como obj undefined
    const RegisterButton = screen.getByRole('button', { name: 'Test' })
    // const RegisterButton = screen.getByTestId('button')
    userEvent.click(RegisterButton)
})
