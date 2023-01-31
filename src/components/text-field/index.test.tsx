import BasicTextFields from './index'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Providers from '../../utils/test-utils'

test('Text field unit test', () => {
    const location = {
        state: {
            userId: "1",
        },
        key: "teste",
    };
    render(
        <Providers location={location}>
            <BasicTextFields testid="testFields" />
        </Providers>
    )

    const inputText = screen.getByTestId('testFields')
    userEvent.type(inputText, 'test')
})
