import BasicTextFields from '../components/text-field/index'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Providers from '../utils/test-utils'

test('Text field unit test', () => {
  render(
    <Providers>
      <BasicTextFields testid="testFields" />
    </Providers>
  )

  const inputText = screen.getByTestId('testFields')
  userEvent.type(inputText, 'test')
})
