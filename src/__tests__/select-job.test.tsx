import SelectJob from '../components/select-job/index'
import { render, screen, getByRole, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Providers from '../utils/test-utils'

test('Select job unit test', async () => {
  render(
    <Providers>
      <SelectJob testid="job-select-id" />
    </Providers>
  )

  const profileInput = getByRole(screen.getByTestId('job-select-id'), 'button')
  userEvent.click(profileInput)
  await waitFor(() => userEvent.click(screen.getByText(/Coordenador/i)))
})
