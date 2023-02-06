import { EditOSButton } from './index'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Providers from '../../utils/test-utils'

test('should click edit os button', () => {
    render(
        <Providers location={location}>
            <EditOSButton>Test</EditOSButton>
        </Providers>
    )
    const editButton = screen.getByRole('button', { name: 'Test' })
    userEvent.click(editButton)
})
