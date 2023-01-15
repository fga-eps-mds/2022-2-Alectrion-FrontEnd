import { render } from '@testing-library/react'
import ScreenEquipaments from '../pages/ScreenEquipaments/index'
import Providers from '../utils/test-utils'

test('should render equipments data', async () => {
  render(
    <Providers>
      <ScreenEquipaments />
    </Providers>
  )
})
