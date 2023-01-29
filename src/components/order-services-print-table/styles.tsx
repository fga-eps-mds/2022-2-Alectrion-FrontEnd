import { styled } from '@mui/material/styles'
import { Card, TextField } from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { styled as styledSystem } from '@mui/system'
import { alignProperty } from '@mui/material/styles/cssUtils'

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    fontSize: 22
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 700
  }
}))

export const StyledCard = styledSystem(Card)(({ theme }) => ({
  borderRadius: '15px',
  padding: '20px 32px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.light,
  margin: '32px 0px 16px 0px'
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.background.default,
  },
  '&:nth-child(even)': {
    backgroundColor: '#F5F5F5'
  },
  '&:last-child td, &:last-child th': {
    border: 10
  }
}))
