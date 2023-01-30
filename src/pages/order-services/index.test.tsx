import { render } from '@testing-library/react'
import { OrderServices } from './index'
import Providers from './../../utils/test-utils'

test('should render equipments data', async () => {
    const location = {
        state: {
            userId: "1",
        },
        key: "teste",
    };
    render(
        <Providers location={location}>
            <OrderServices />
        </Providers>
    )
})
