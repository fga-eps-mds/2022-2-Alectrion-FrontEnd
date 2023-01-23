import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { AuthContext } from '../../contexts/auth'
import Providers from '../../utils/test-utils'
import userEvent from '@testing-library/user-event'

import OrderRegister from './index'

test('should register new user', async () => {
  render(
    <Providers>
      <AuthContext.Provider
        value={{
          isAuthenticated: 'authenticated',
          user: {
            token: 'wjhqwejk',
            expireIn: 'sdfjhsdf',
            email: 'user@user.com',
            name: 'user',
            role: 'administrador'
          },
          Login: jest.fn(),
          Logout: jest.fn()
        }}>
        <OrderRegister />
      </AuthContext.Provider>
    </Providers>
  )

  expect(
    await screen.findByText('Cadastro de ordem de serviço')
  ).toBeInTheDocument()

  const senderNameInput = screen.getByLabelText('Nome do entregador')
  expect(senderNameInput).toBeInTheDocument()
  userEvent.type(senderNameInput, 'lucas eler')

  const senderFunctionalNumberInput = screen.getByLabelText('N° funcional')
  expect(senderFunctionalNumberInput).toBeInTheDocument()
  userEvent.type(senderFunctionalNumberInput, '123456')

  const dateInput = screen.getByLabelText('Data')
  expect(dateInput).toBeInTheDocument()
  userEvent.type(dateInput, 'Mon Sep 19 2022 02:08:05 GMT-0300')

  const tippingNumberInput = screen.getByLabelText('N° Tombamento')
  expect(tippingNumberInput).toBeInTheDocument()
  userEvent.type(tippingNumberInput, '654321')

  const statusInput = screen.getByLabelText('Situação')
  expect(statusInput).toBeInTheDocument()
  userEvent.type(statusInput, 'Ativo')

  const productTypeInput = screen.getByLabelText('Tipo de equipamento')
  expect(productTypeInput).toBeInTheDocument()
  userEvent.type(productTypeInput, 'CPU')

  const reciverNameInput = screen.getByLabelText('Nome do recebedor')
  expect(reciverNameInput).toBeInTheDocument()
  userEvent.type(reciverNameInput, 'Moacir')

  const reciverFunctionalNumberInput = screen.getByLabelText(
    'N° funcional do recebedor'
  )
  expect(reciverFunctionalNumberInput).toBeInTheDocument()
  userEvent.type(reciverFunctionalNumberInput, '237231')

  const destinationInput = screen.getByLabelText('Destino')
  expect(destinationInput).toBeInTheDocument()
  userEvent.type(destinationInput, '15° DP')

  const descriptionInput = screen.getByTestId('description-input')
  expect(descriptionInput).toBeInTheDocument()
  userEvent.type(descriptionInput, 'descrição do equipamento')

  const registerButton = screen.getByTestId('register-button')
  expect(registerButton).toBeInTheDocument()
  userEvent.click(registerButton)
})
