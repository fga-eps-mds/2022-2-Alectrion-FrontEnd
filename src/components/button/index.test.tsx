import { Button } from './index'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Providers from '../../utils/test-utils'

test('button unit test', () => {
    const location = {
        state: {
            userId: "1",
        },
        key: "teste",
    };
    render(
        <Providers location={location}>
            <Button>Test</Button>
        </Providers>
    )
    const RegisterButton = screen.getByRole('button', { name: 'Test' })
    userEvent.click(RegisterButton)
})
