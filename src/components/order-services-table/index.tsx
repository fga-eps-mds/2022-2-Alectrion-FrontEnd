import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'

import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import { StyledTableCell, StyledTableRow } from './styles'
import { dateFormat } from '../../utils/dateFormat'
interface OrderService {
  id: string
  date: string
  description: string
  authorId: string
  sender: string
  senderFunctionalNumber: string
  receiverName: string
  equipment: {
    type: string
    tippingNumber: string
    situacao: string
  }
}
interface OrderServicesProps {
  orderServices: OrderService[]
}
export default function OderServiceTable({
  orderServices
}: OrderServicesProps) {
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
            <StyledTableCell align="center">Data Entrada</StyledTableCell>
            <StyledTableCell align="center">Tipo Equipamento</StyledTableCell>
            <StyledTableCell align="center">N° tombamento</StyledTableCell>
            <StyledTableCell align="center">Situação</StyledTableCell>
            <StyledTableCell align="center">Recebedor</StyledTableCell>
            <StyledTableCell align="center">Entregador</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderServices?.map((orderSerivce) => (
            <StyledTableRow key={orderSerivce.id}>
              <StyledTableCell align="center">
                {dateFormat(orderSerivce.date)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {orderSerivce.equipment.type}
              </StyledTableCell>
              <StyledTableCell align="center">
                {orderSerivce.equipment.tippingNumber}
              </StyledTableCell>
              <StyledTableCell align="center">
                {orderSerivce.equipment.situacao}
              </StyledTableCell>
              <StyledTableCell align="center">
                {orderSerivce.receiverName}
              </StyledTableCell>
              <StyledTableCell align="center">{`${orderSerivce.sender} - ${orderSerivce.senderFunctionalNumber}`}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
