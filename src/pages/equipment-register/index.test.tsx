import '@testing-library/jest-dom'
import { render, screen, waitFor, getByRole } from '@testing-library/react'
import Providers from '../../utils/test-utils'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import EquipRegister from './index'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>
const location = {
    state: {
        userId: "1",
    },
    user: {
        role: "gerente"
    }
};

test('should register new CPU', async () => {
  mockedAxios.post.mockResolvedValue({
    productType: 'CPU',
    tippingNumber: '1745248',
    brand: 'Apple',
    serialNumber: '52385238',
    model: 'Macbook',
    acquisition: 'Licitação',
    initialUseDate: '2020',
    acquisitionDate: '25/10/2021',
    invoiceNumber: '192802',
    ramMemory: '8gb',
    storageAmount: '1tb',
    storageType: 'HD externo',
    processor: 'M1'
  })
  render(
    <Providers location={location}>
      <EquipRegister />
    </Providers>
  )

  expect(
    await screen.findByText('Cadastro de Equipamentos')
  ).toBeInTheDocument()

  const typeInput = getByRole(
    screen.getByTestId('productType-select'),
    'button'
  )
  userEvent.click(typeInput)
  await waitFor(() => userEvent.click(screen.getByText(/CPU/i)))

  const tippingInput = screen.getByLabelText('N° Tombamento')
  userEvent.type(tippingInput, '1745248')

  const brandInput = screen.getByLabelText('Marca')
  userEvent.type(brandInput, 'Apple')

  const serialNumberInput = screen.getByLabelText('N° Série')
  userEvent.type(serialNumberInput, '52385238')

  const modelInput = screen.getByLabelText('Modelo')
  userEvent.type(modelInput, 'MacBook')

  const acquisitionInput = screen.getByLabelText('Tipo aquisição')
  userEvent.type(acquisitionInput, 'Licitação')

  const initialUseDateInput = screen.getByLabelText('Ano do equipamento')
  userEvent.type(initialUseDateInput, '2020')

  const acquisitionDateInput = screen.getByLabelText('Data de aquisição')
  userEvent.type(acquisitionDateInput, '25/10/2021')

  const invoiceNumberInput = screen.getByLabelText('N° da nota fiscal')
  userEvent.type(invoiceNumberInput, '192802')

  const ramMemoryInput = screen.getByTestId('memory-input')
  userEvent.type(ramMemoryInput, '8gb')

  const storageAmountInput = screen.getByLabelText('Armazenamento')
  userEvent.type(storageAmountInput, '1tb')

  const storageTypeInput = screen.getByLabelText('Tipo armazenamento')
  userEvent.type(storageTypeInput, 'HD externo')

  const processorInput = screen.getByLabelText('Processador')
  userEvent.type(processorInput, 'M1')

  const RegisterButton = screen.getByRole('button', { name: 'Cadastrar' })
  userEvent.click(RegisterButton)
})

test('should register new monitor', async () => {
  mockedAxios.post.mockResolvedValue({
    productType: 'Monitor',
    tippingNumber: '1745245',
    brand: 'LG',
    serialNumber: '52385590',
    model: 'UltraWide',
    acquisition: 'Licitação',
    initialUseDate: '2022',
    acquisitionDate: '16/08/2022',
    invoiceNumber: '192800',
    screenType: 'LED',
    screenSize: '23 polegadas'
  })
  render(
    <Providers location={location}>
      <EquipRegister />
    </Providers>
  )

  expect(
    await screen.findByText('Cadastro de Equipamentos')
  ).toBeInTheDocument()

  const typeInput = getByRole(
    screen.getByTestId('productType-select'),
    'button'
  )
  userEvent.click(typeInput)
  await waitFor(() => userEvent.click(screen.getByText(/Monitor/i)))

  const tippingInput = screen.getByLabelText('N° Tombamento')
  userEvent.type(tippingInput, '1745245')

  const brandInput = screen.getByLabelText('Marca')
  userEvent.type(brandInput, 'LG')

  const serialNumberInput = screen.getByLabelText('N° Série')
  userEvent.type(serialNumberInput, '52385590')

  const modelInput = screen.getByLabelText('Modelo')
  userEvent.type(modelInput, 'UltraWide')

  const acquisitionInput = screen.getByLabelText('Tipo aquisição')
  userEvent.type(acquisitionInput, 'Licitação')

  const initialUseDateInput = screen.getByLabelText('Ano do equipamento')
  userEvent.type(initialUseDateInput, '2022')

  const acquisitionDateInput = screen.getByLabelText('Data de aquisição')
  userEvent.type(acquisitionDateInput, '16/08/2022')

  const invoiceNumberInput = screen.getByLabelText('N° da nota fiscal')
  userEvent.type(invoiceNumberInput, '192800')

  const screenTypeInput = screen.getByLabelText('Tipo monitor')
  userEvent.type(screenTypeInput, 'LED')

  const RegisterButton = screen.getByRole('button', { name: 'Cadastrar' })
  userEvent.click(RegisterButton)
})

test('should register new nobreak', async () => {
  mockedAxios.post.mockResolvedValue({
    productType: 'Nobreak',
    tippingNumber: '8237421',
    brand: 'Intelbras',
    serialNumber: '52385590',
    model: 'UltraWide',
    acquisition: 'Licitação',
    initialUseDate: '2019',
    acquisitionDate: '10/08/2021',
    invoiceNumber: '289743',
    power: '220W'
  })
  render(
    <Providers location={location}>
      <EquipRegister />
    </Providers>
  )

  expect(
    await screen.findByText('Cadastro de Equipamentos')
  ).toBeInTheDocument()

  const typeInput = getByRole(
    screen.getByTestId('productType-select'),
    'button'
  )
  userEvent.click(typeInput)
  await waitFor(() => userEvent.click(screen.getByText(/Nobreak/i)))

  const tippingInput = screen.getByLabelText('N° Tombamento')
  userEvent.type(tippingInput, '8237421')

  const brandInput = screen.getByLabelText('Marca')
  userEvent.type(brandInput, 'Intelbras')

  const serialNumberInput = screen.getByLabelText('N° Série')
  userEvent.type(serialNumberInput, '52385238')

  const modelInput = screen.getByLabelText('Modelo')
  userEvent.type(modelInput, 'MacBook')

  const acquisitionInput = screen.getByLabelText('Tipo aquisição')
  userEvent.type(acquisitionInput, 'Licitação')

  const initialUseDateInput = screen.getByLabelText('Ano do equipamento')
  userEvent.type(initialUseDateInput, '2019')

  const acquisitionDateInput = screen.getByLabelText('Data de aquisição')
  userEvent.type(acquisitionDateInput, '10/08/2021')

  const invoiceNumberInput = screen.getByLabelText('N° da nota fiscal')
  userEvent.type(invoiceNumberInput, '289743')

  const powerInput = screen.getByTestId('power-input')
  userEvent.type(powerInput, '220W')

  const RegisterButton = screen.getByRole('button', { name: 'Cadastrar' })
  userEvent.click(RegisterButton)
})

test('should register new stabilizer', async () => {
  mockedAxios.post.mockResolvedValue({
    productType: 'CPU',
    tippingNumber: '1745248'
  })
  render(
    <Providers location={location}>
      <EquipRegister />
    </Providers>
  )

  expect(
    await screen.findByText('Cadastro de Equipamentos')
  ).toBeInTheDocument()

  const typeInput = getByRole(
    screen.getByTestId('productType-select'),
    'button'
  )
  userEvent.click(typeInput)
  await waitFor(() => userEvent.click(screen.getByText(/CPU/i)))

  const tippingInput = screen.getByLabelText('N° Tombamento')
  userEvent.type(tippingInput, '1745248')

  const brandInput = screen.getByLabelText('Marca')
  userEvent.type(brandInput, 'Apple')

  const serialNumberInput = screen.getByLabelText('N° Série')
  userEvent.type(serialNumberInput, '52385238')

  const modelInput = screen.getByLabelText('Modelo')
  userEvent.type(modelInput, 'MacBook')

  const acquisitionInput = screen.getByLabelText('Tipo aquisição')
  userEvent.type(acquisitionInput, 'Licitação')

  const equipmentYearInput = screen.getByLabelText('Ano do equipamento')
  userEvent.type(equipmentYearInput, '2020')

  const acquisitionDateInput = screen.getByLabelText('Data de aquisição')
  userEvent.type(acquisitionDateInput, '28/12/2001')

  const fiscalNoteInput = screen.getByLabelText('N° da nota fiscal')
  userEvent.type(fiscalNoteInput, '192802')

  const memoryInput = screen.getByLabelText('Memória RAM')
  userEvent.type(memoryInput, '8gb')

  const storageAmountInput = screen.getByLabelText('Armazenamento')
  userEvent.type(storageAmountInput, '1tb')

  const storageTypeInput = screen.getByTestId('storageType-input')
  userEvent.type(storageTypeInput, 'HD externo')

  const processorInput = screen.getByLabelText('Processador')
  userEvent.type(processorInput, 'Intel I7')

  const RegisterButton = screen.getByRole('button', { name: 'Cadastrar' })
  userEvent.click(RegisterButton)
})

test('should render register equipment page and back to equipments when back button clicked', async () => {
  render(
    <Providers location={location}>
      <EquipRegister />
    </Providers>
  )

  expect(
    await screen.findByText('Cadastro de Equipamentos')
  ).toBeInTheDocument()

  const RegisterButton = screen.getByRole('button', { name: 'Voltar' })
  userEvent.click(RegisterButton)
})
