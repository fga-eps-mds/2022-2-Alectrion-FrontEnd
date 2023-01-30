import SelectProfile from './index'
import { render, screen, getByRole, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Providers from '../../utils/test-utils'

test('Select profile unit test', async () => {
    const location = {
        state: {
            userId: "1",
        },
        key: "basico",
    };
    render(
        <Providers location={location}>
            <SelectProfile testid="profile-id" />
        </Providers>
    )

    const profileInput = getByRole(screen.getByTestId('profile-id'), 'button')
    userEvent.click(profileInput)
    await waitFor(() => userEvent.click(screen.getByText(/Admin/i)))
})
