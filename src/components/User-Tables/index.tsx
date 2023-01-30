/* eslint-disable no-unused-vars */
import { StyledTableCell, StyledTableRow } from './styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useNavigate } from 'react-router-dom'
import { EditButton } from '../edit-button/index'

export interface User {
  createdAt: string
  id: string
  updatedAt: string
  username: string
  name: string
  email: string
  role: string
  job: string
}

interface propType {
  users: User[]
  isEditor: boolean
  isAdmin: boolean
}

export default function UserTables({ users, isEditor, isAdmin }: propType) {
  const navigate = useNavigate()
  return (
    <TableContainer
      sx={{
        margin: '0 auto',
        maxWidth: '1024px',
        textAlign: 'center'
      }}
      component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Nome do usuário </StyledTableCell>
            <StyledTableCell align="center">Nome</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Perfil</StyledTableCell>
            <StyledTableCell align="center">Cargo</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user) => (
            <StyledTableRow key={user.name}>
              <StyledTableCell align="center" component="th" scope="user">
                {user.username}
              </StyledTableCell>
              <StyledTableCell align="center">{user.name}</StyledTableCell>
              <StyledTableCell align="center">{user.email}</StyledTableCell>
              <StyledTableCell align="center">{user.role}</StyledTableCell>
              <StyledTableCell align="center">{user.job}</StyledTableCell>
 
                {(isAdmin || (!isAdmin && isEditor && user.role !== 'administrador')) &&
                  (<StyledTableCell
                    align="center"
                    onClick={() =>
                      navigate('/edit-user', { state: { userId: user.id } })
                    }>    
                    <EditButton data-testid="edit-user-button" />
                    <>Editar</>
                  </StyledTableCell>)}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
