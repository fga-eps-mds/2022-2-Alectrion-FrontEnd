import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Typography } from '@mui/material'
import { StyledTableCell, StyledTableRow } from './styles'
import { dateFormat } from '../../utils/dateFormat'
import { useNavigate } from 'react-router-dom'
import { EditOSButton } from '../edit-os-button'
import { PrintOSButton } from '../print-os-button'
import OrderServiceUpdateForm  from '../order-service-update-form'
import { Container } from '@mui/system'

interface OrderService {
  id: string
  date: string
  description: string
  authorId: string
  senderName: string
  senderFunctionalNumber: string
  receiverName: string
  status: string
  equipment: {
    type: string
    tippingNumber: string
    status: string
    serialNumber: string
    situacao: string
    estado: string
    model: string
    description?: string
    initialUseDate: string
    acquisitionDate: Date
    screenSize?: string
    invoiceNumber: string
    power?: string
    screenType?: string
    processor?: string
    storageType?: string
    storageAmount?: string
    brandName: string
    acquisitionName: string
    unitId: string
    ram_size?: string
  }
}
interface OrderServicesPrintProps {
  orderServicesPrint: OrderService[]
  isConsulta: boolean
}

function handleToStatus(status: string) {
  switch(status){
    case 'MAINTENANCE': {
      return 'Em manuntenção';
    }
    case 'WARRANTY': {
      return 'Garantia'
    }
    case 'CONCLUDED': {
      return 'Concluido'
    }
    case 'CANCELED': {
      return 'Cancelado'
    }
  }
}

export default function OderServicePrintTable({
  orderServicesPrint,
  isConsulta
}: OrderServicesPrintProps) {
  const navigate = useNavigate()

  return (
    <TableContainer
      sx={{
        margin: '0 auto',
        maxWidth: '1286px',
        textAlign: 'center'
      }}
      component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Recebedor</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center">Data de Entrada</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center">Entregador</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderServicesPrint?.map((orderServicesPrint) => (
            <StyledTableRow key={orderServicesPrint.id}>
              <StyledTableCell align="center">{orderServicesPrint.receiverName}</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center">{dateFormat(orderServicesPrint.date)}</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center">{orderServicesPrint.senderName}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
        
        <p></p>

      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Tipo Equipamento</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center">N° de Tombamento</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center">N° da Nº Fiscal</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderServicesPrint?.map((orderServicesPrint) => (
            <StyledTableRow key={orderServicesPrint.id}>
              <StyledTableCell align="center">
                {orderServicesPrint.equipment.type}
              </StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center">
                {orderServicesPrint.equipment.tippingNumber}
              </StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center">
                {orderServicesPrint.equipment.serialNumber}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
        
      <p></p>

    <Table aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell align="center">Situação</StyledTableCell>
          <StyledTableCell align="center"></StyledTableCell>
          <StyledTableCell align="center">Estado</StyledTableCell>
          <StyledTableCell align="center"></StyledTableCell>
          <StyledTableCell align="center">Descrição</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orderServicesPrint?.map((orderServicesPrint) => (
          <StyledTableRow key={orderServicesPrint.id}>
            <StyledTableCell align="center">
              {orderServicesPrint.equipment.situacao}
            </StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center">
              {orderServicesPrint.equipment.estado}
            </StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center">
              {orderServicesPrint.description}
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
    </TableContainer>
  )
}
