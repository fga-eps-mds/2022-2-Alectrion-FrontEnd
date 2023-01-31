import SelectJob from './index'
import { render, screen, getByRole, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Providers from '../../utils/test-utils'

test('Select job unit test', async () => {
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
            <SelectJob testid="job-select-id" />
        </Providers>
    )

    const profileInput = getByRole(screen.getByTestId('job-select-id'), 'button')
    userEvent.click(profileInput)
    await waitFor(() => userEvent.click(screen.getByText(/Coordenador/i)))
})
