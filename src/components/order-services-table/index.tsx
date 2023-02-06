import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'

import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import { StyledTableCell, StyledTableRow } from './styles'
import { dateFormat } from '../../utils/dateFormat'
import { useNavigate } from 'react-router-dom'
import { EditOSButton } from '../edit-os-button'

export interface OrderService {
  id: string
  date: string
  description: string
  authorId: string
  senderName: string
  senderFunctionalNumber: string
  receiverName: string
  receiverFunctionalNumber: string
  status: string
  equipment: {
    type: string
    tippingNumber: string
    situacao: string
  }
}
interface OrderServicesProps {
  orderServices: OrderService[]
  isConsulta: boolean
}

function handleToStatus(status: string) {
  switch(status){
    case 'MAINTENANCE': {
      return 'Em Manutenção';
    }
    case 'WARRANTY': {
      return 'Garantia'
    }
    case 'CONCLUDED': {
      return 'Concluída'
    }
    case 'CANCELED': {
      return 'Cancelada'
    }
  }
}

export default function OderServiceTable({
  orderServices,
  isConsulta
}: OrderServicesProps) {
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
            <StyledTableCell align="center">ID da O.S.</StyledTableCell>
            <StyledTableCell align="center">N° de Tombamento</StyledTableCell>
            <StyledTableCell align="center">Tipo de Equipamento</StyledTableCell>
            <StyledTableCell align="center">Data de Entrada</StyledTableCell>
            <StyledTableCell align="center">Entregador</StyledTableCell>
            <StyledTableCell align="center">Recebedor</StyledTableCell>
            <StyledTableCell align="center">Status da O.S.</StyledTableCell>
            {!isConsulta && (<StyledTableCell align="center">Atualizar</StyledTableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {orderServices?.map((orderSerivce) => (
            <StyledTableRow key={orderSerivce.id}>
              <StyledTableCell align="center">
                {orderSerivce.id}
              </StyledTableCell>
              <StyledTableCell align="center">
                {orderSerivce.equipment.tippingNumber}
              </StyledTableCell>
              <StyledTableCell align="center">
                {orderSerivce.equipment.type}
              </StyledTableCell>
              <StyledTableCell align="center">
                {dateFormat(orderSerivce.date)}
              </StyledTableCell>
              <StyledTableCell align="center">{`${orderSerivce.senderName} - ${orderSerivce.senderFunctionalNumber}`}</StyledTableCell>
              <StyledTableCell align="center">
                {`${orderSerivce.receiverName} - ${orderSerivce.receiverFunctionalNumber}`}
              </StyledTableCell>
              <StyledTableCell align="center">
                {handleToStatus(orderSerivce.status)}
              </StyledTableCell>
              {!isConsulta && (
                <StyledTableCell
                  align="center"
                  onClick={() =>
                    navigate('/order-service-update-form', {
                      state: { order: orderSerivce }
                    })
                  }>
                  <EditOSButton/>
                </StyledTableCell>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
