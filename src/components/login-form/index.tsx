import { CardContent } from '@mui/material'
import { useFormik } from 'formik'
import { FormStyled, StyledCard, StyledLink } from './styles'
import * as yup from 'yup'
import { theme } from '../../styles/theme'
import BasicTextFields from '../text-field'
import { Button } from '../button'
import { toast } from 'react-toastify'
import img from './assets/AlectrionLogo2.png'
import Box from '@mui/material/Box'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { useNavigate } from 'react-router-dom'

const LoginScreenForm = () => {
  const { Login } = useContext(AuthContext)
  const navigate = useNavigate()

  const validationSchema = yup.object().shape({
    username: yup.string().required('O campo é obrigatório.'),
    password: yup.string().min(4).required('O campo é obrigatório.')
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const data = {
          username: values.username,
          password: values.password
        }
        await Login(data)
        navigate('/')
      } catch (error) {
        toast.error('Usuário não encontrado.')

        navigate('/login')
      }
    }
  })

  return (
    <StyledCard classes={{ root: 'rootCard' }}>
      <CardContent>
        <FormStyled onSubmit={formik.handleSubmit}>
          <Box
            component="img"
            sx={{
              height: 60,
              width: 155,
              mt: 0.5,
              mb: 8,
              ml: 10
            }}
            alt=""
            src={img}
          />
          <BasicTextFields
            size="small"
            id="username"
            name="username"
            label="Username"
            variant="outlined"
            value={formik.values.username}
            type="username"
            onChange={formik.handleChange}
            color="primary"
            helperText={formik.touched.username && formik.errors.username}
            error={formik.touched.username && Boolean(formik.errors.username)}
          />
          <BasicTextFields
            size="small"
            id="password"
            name="password"
            label="Senha"
            variant="outlined"
            value={formik.values.password}
            type="password"
            onChange={formik.handleChange}
            color="primary"
            helperText={formik.touched.password && formik.errors.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
          />

          <StyledLink to={'/password-recovery'}>Esqueci minha senha</StyledLink>

          <Button
            id="login"
            name="loginButton"
            variant="contained"
            type="submit"
            styledColor={theme.palette.primary.main}
            classes={{ root: 'rootLogin' }}
            marginTop={'37.88px'}
            marginBottom={'94px'}
            data-testid="button-id">
            Login
          </Button>
        </FormStyled>
      </CardContent>
    </StyledCard>
  )
}

export default LoginScreenForm
