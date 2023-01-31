import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

export const StyledTableCell2 = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    
    color: theme.palette.common.black,
    fontSize: 19
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 700,
    mr: '50px'
  }
}))
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    fontSize: 22
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 700,
    mr: '50px'
  }
}))


export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.background.default
  },

  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))
export const StyledTableRow2 = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.background.default
  },

  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))


export const ButtonDownloadEquipament = styled(Button)(({ theme }) => ({
  backgroundColor: '#5289B5',
  color: '#ffff',
  border: '10px',
  fontSize: '14',
  fontWeight: 'bold'
}))
export const GerarTermos = styled(Button)(({ theme }) => ({
  backgroundColor: '#5289B5',
  color: '#ffff',
  border: '10px',
  fontSize: '14',
  fontWeight: 'bold'
}))



export const ButtonReservEquipament = styled(Button)(({ theme }) => ({
  backgroundColor: '#5289B5',
  color: '#ffff',
  border: '10px',
  fontSize: '14',
  fontWeight: 'bold'
}))
