import { useFormik } from 'formik'
import CardContent from '@mui/material/CardContent'
import { StyledCard, StyledForm, StyledTextField } from './styles'
import * as yup from 'yup'
import { Button } from '../button'
import { theme } from '../../styles/theme'
import api from '../../api/config'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const PasswordRecoveryForm = () => {
  const navigate = useNavigate()
  const validationSchema = yup.object().shape({
    email: yup.string().email('Insira um email válido').trim().required()
  })

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values)
      try {
        await api.post('/user/password-recovery', {
          email: values.email
        })
        toast.success(`e-mail enviado para: ${values.email}`)
        navigate('/login')
      } catch (error) {
        toast.error('Erro inesperado')
      }
    }
  })

  return (
    <StyledCard>
      <CardContent>
        <StyledForm onSubmit={formik.handleSubmit}>
          <StyledTextField
            size="small"
            id="email-input"
            label="Email"
            name="email"
            variant="outlined"
            onChange={formik.handleChange}
            value={null}
            helperText={formik.touched.email && formik.errors.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
          />
          <Button
            variant="contained"
            type="submit"
            styledColor={theme.palette.primary.main}>
            Enviar
          </Button>
          <Button
            variant="contained"
            styledColor={theme.palette.grey[100]}
            textColor={theme.palette.grey[900]}
            onClick={() => navigate('/users')}>
            Voltar
          </Button>
        </StyledForm>
      </CardContent>
    </StyledCard>
  )
}

export default PasswordRecoveryForm
