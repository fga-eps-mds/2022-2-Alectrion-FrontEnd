import React, { useEffect, useState, useContext } from 'react'
import { StyledTextField, Container, FindContainer } from './styles'
import UserTables from '../../components/User-Tables'
import { Typography } from '@mui/material'
import { Button } from '../../components/button'
import { theme } from '../../styles/theme'
import api from '../../api/config'
import { toast } from 'react-toastify'
import { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
interface AuthContextType {
  user: {
    role: string
  }
}
interface user {
  createdAt: string
  updatedAt: string
  id: string
  username: string
  name: string
  email: string
  role: string
  job: string
}

export default function ScreenUser() {
  const { user } = useContext(AuthContext) as AuthContextType
  const isAdmin =
    user.role === 'gerente' ||
    user.role === 'administrador' ||
    user.role === 'basico'
  const isSuperAdmin = user.role === 'administrador'
  const isEditor = user.role === 'gerente' || user.role === 'administrador'

  const navigate = useNavigate()
  const [users, setUsers] = useState<user[]>([])
  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data }: AxiosResponse<user[]> = await api.get(
          '/user/get?allUsers=true'
        )
        setUsers(data)
      } catch (error) {
        toast.error('Aconteceu algum erro.')
      }
    }
    getUsers()
  }, [])
  return (
    <div>
      <Container>
        <Typography variant="h3">Usuários</Typography>
        <FindContainer>
          <StyledTextField
            size="small"
            id="username-input"
            label="Pesquisar usuário"
            data-testId="username-input"
            type="text"
            name="name"
            variant="outlined"
            disabled
          />
          <div></div>
          {isAdmin && (
            <Button
              onClick={() => navigate('/user-register')}
              data-testid="userRegister"
              styledColor={theme.palette.primary.dark}
              disabled={!isAdmin}
              textColor="white">
              Cadastrar usuário
            </Button>
          )}
        </FindContainer>
        <div></div>
        <UserTables users={users} isEditor={isEditor} isAdmin={isSuperAdmin} />
      </Container>
    </div>
  )
}
