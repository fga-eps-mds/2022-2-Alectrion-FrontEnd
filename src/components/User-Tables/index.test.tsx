import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Providers from '../../utils/test-utils'

import UserTables, { User } from './index'
test('should list equipament', async () => {
    const location = {
        state: {
            userId: "1",
        },
        key: "teste",
    };
    const users = [
        {
            createdAt: '2022-08-17T23:13:22.506Z',
            deletedAt: null,
            email: 'guilhermepupak@gmail.com',
            id: 'a7a0b33f-5e0f-4ad8-b882-316e289aae36',
            isDeleted: false,
            job: 'chefe de secao',
            name: 'Guilherme Sava Pupak',
            role: 'basico',
            updatedAt: '2022-08-17T23:13:22.506Z',
            username: 'guilhermesp'
        }
    ] as unknown as User[]

    render(
        <Providers location={location}>
            <UserTables users={users} isEditor isAdmin />
        </Providers>
    )

    expect(screen.getByText('guilhermesp')).toBeInTheDocument()
    expect(screen.getByText('guilhermepupak@gmail.com')).toBeInTheDocument()
    expect(screen.getByText('basico')).toBeInTheDocument()
    expect(screen.getByText('chefe de secao')).toBeInTheDocument()
    expect(screen.getByText('Guilherme Sava Pupak')).toBeInTheDocument()

    const editUserButton = screen.getByRole('cell', { name: 'Editar' })
    expect(editUserButton).toBeInTheDocument()
    userEvent.click(editUserButton)
})
