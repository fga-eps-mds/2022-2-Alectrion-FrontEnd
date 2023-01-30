import { useContext } from 'react'
import { PageContainer, Container, TitleText, SimpleText, StyledAvatar } from './styles'
import { AuthContext } from '../../contexts/auth'
import { Box } from '@mui/material/'
import { stringAvatar } from '../../utils/utils'

interface AuthContextType {
  user: {
    role: string
    name: string
    email: string
    job: string
  }
}


export default function ProfileUser() {
  const { user } = useContext(AuthContext) as AuthContextType

  return (
    <PageContainer>
      <Container>
        <Box sx={{ flexGrow: 0 }}>
          <StyledAvatar {...stringAvatar(user.name)} />
        </Box>
      </Container>
      <Container>
        <TitleText>{user.name.split(" ")[0]}</TitleText>
        <SimpleText>{user.name}</SimpleText>
      </Container>
      <Container>
        <TitleText>Email</TitleText>
        <SimpleText>{user.email}</SimpleText>
      </Container>
      <Container>
        <TitleText>Função</TitleText>
        <SimpleText>{((user.job === null || user.job === undefined || user.job === "") ? "-" : user.job)}</SimpleText>
      </Container>
      <Container>
        <TitleText>Perfil</TitleText>
        <SimpleText>{user.role}</SimpleText>
      </Container>
    </PageContainer>
  )
}
