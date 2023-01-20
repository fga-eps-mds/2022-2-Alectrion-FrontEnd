import { Typography } from '@mui/material'
import PasswordRecoveryForm from '../../components/password-recovery-form'
import { Container } from '../user-register/styles'

const PasswordRecovery = () => {
  return (
    <>
      <Container>
        <Typography variant="h3">Recuperação de senha</Typography>
        <PasswordRecoveryForm />
      </Container>
    </>
  )
}
export default PasswordRecovery
