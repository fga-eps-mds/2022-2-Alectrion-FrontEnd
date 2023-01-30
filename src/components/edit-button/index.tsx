import { ButtonProps } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { Props, StyledEditButton } from './styles'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'

interface AuthContextType {
  user: {
    role: string
  }
}

export type StyledButton = ButtonProps & Props

export const EditButton = (props: StyledButton) => {
  const { user } = useContext(AuthContext) as AuthContextType
  const role = user?.role
  return (
    <>
      {(role === 'administrador' || role === 'gerente') && (
        <StyledEditButton {...props} data-testid="button">
          <EditIcon />
          {props.children}
        </StyledEditButton>
      )}
    </>
  )
}
