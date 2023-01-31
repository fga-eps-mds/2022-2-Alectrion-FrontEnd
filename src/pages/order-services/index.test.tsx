import { render } from '@testing-library/react'
import { OrderServices } from './index'
import Providers from './../../utils/test-utils'
import { AuthContext } from '../../contexts/auth'

test('should render equipments data', async () => {
    const location = {
        state: {
            userId: "1",
        },
        key: "teste",
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
                <OrderServices />
            </AuthContext.Provider>
        </Providers>
    )
})
