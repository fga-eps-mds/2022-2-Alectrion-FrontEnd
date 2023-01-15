import SelectProfile from '../components/select-profile/index'
import { render, screen, getByRole, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Providers from '../utils/test-utils'

test('Select profile unit test', async () => {
  render(
    <Providers>
      <SelectProfile testid="profile-id" />
    </Providers>
  )

  const profileInput = getByRole(screen.getByTestId('profile-id'), 'button')
  userEvent.click(profileInput)
  await waitFor(() => userEvent.click(screen.getByText(/Admin/i)))
})
