import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Providers from '../../utils/test-utils'

import OderServiceTable, {OrderService} from './index'


test('should list order service', async () => {
    const location = {
        state: {
            userId: "01234567",
        },
        key: "teste",
    };
    const orderservices = [
        {
            createdAt: '2023-01-01T23:13:22.506Z',
            deletedAt: null,
            id: 'b21a68e5-20ba-4af7-941a-41984663fd09',
            updatedAt: '2023-01-01T23:13:23.506Z',
            date: '01/01/2023',
            description: 'Teste da o.s.',
            authorId: '01234567',
            senderName: 'Entegrador Teste',
            senderFunctionalNumber: '01234',
            receiverName: 'Recebedor Teste',
            receiverFunctionalNumber: '01234567',
            status: 'MAINTENANCE',
            equipment: {
                type: 'Monitor',
                tippingNumber: '123',
                situacao: 'Manutenção'
            }
        }
    ] as unknown as OrderService[]

    render(
        <Providers location={location}>
            <OderServiceTable orderServices={orderservices} isConsulta={false} />
        </Providers>
    )

    expect(screen.getByText('b21a68e5-20ba-4af7-941a-41984663fd09')).toBeInTheDocument()
    expect(screen.getByText('123')).toBeInTheDocument()
    expect(screen.getByText('Monitor')).toBeInTheDocument()
    expect(screen.getByText('01/01/2023')).toBeInTheDocument()
    expect(screen.getByText('Entegrador Teste - 01234')).toBeInTheDocument()
    expect(screen.getByText('Recebedor Teste - 01234567')).toBeInTheDocument()
    expect(screen.getByText('MAINTENANCE')).toBeInTheDocument()

    const editButton = screen.getByRole('cell', { name: 'Editar' })
    expect(editButton).toBeInTheDocument()
    userEvent.click(editButton)
})
