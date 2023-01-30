// eslint-disable-next-line prettier/prettier
import { useContext,useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import BasicTextFields from '../text-field'
import { Button } from '../button'
import SelectProfile from '../select-profile'
import { FormStyled, StyledCard } from './styles'
import { CardContent } from '@mui/material'
import './styleForm.css'
import api from '../../api/config'
import { toast } from 'react-toastify'
import SelectJob from '../select-job'
import { theme } from '../../styles/theme'
import { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'

interface UserData {
  createdAt: string
  id: string
  updatedAt: string
  username: string
  name: string
  email: string
  role: string
  job: string
}
interface formProps {
  userId: string
}
interface objProps {
  username?: string
  name?: string
  email?: string
  job?: string
  role?: string
  password?: string
  userId?: string
}
interface AuthContextType2 {
  user: {
    role: string
  }
}

const Form = ({ userId }: formProps) => {
  const { user } = useContext(AuthContext) as AuthContextType2
  const isSuperAdmin = user.role === 'administrador'
  const isGerente = user.role === 'gerente'
  const isBasico = user.role === 'basico'
  const navigate = useNavigate()
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('O campo é obrigatório.')
      .min(3, 'Digite pelo menos 3 caracteres')
      .trim(),
    email: yup.string().email('E-mail inválido.').trim().required('O campo é obrigatório.'),
    job: yup.string().required('O campo é obrigatório.'),
    profile: yup.string().required('O campo é obrigatório.'),
    username: yup
      .string()
      .required('O campo é obrigatório.')
      .min(3, 'Digite pelo menos 3 caracteres')
      .trim(),
    password: yup
      .string()
      .min(4, 'A senha deve conter ao menos 4 caracteres')
      .notRequired()
      .trim()
  })

  const [userData, setUserData] = useState<UserData>()

  useEffect(() => {
    const getUser = async () => {
      const { data }: AxiosResponse<UserData[]> = await api.get(
        `/user/get?userId=${userId}`
      )
      setUserData(data[0])
    }
    getUser()
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userData?.name,
      email: userData?.email,
      job: userData?.job || '',
      profile: userData?.role || '',
      username: userData?.username,
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      let flag = false
      const bodyVerif: objProps = {}
      if (values.name !== formik.initialValues.name) {
        bodyVerif.name = values.name
        flag = true
      }
      if (values.email !== formik.initialValues.email) {
        bodyVerif.email = values.email
        flag = true
      }
      if (
        values.job !== formik.initialValues.job &&
        formik.initialValues.job !== ''
      ) {
        bodyVerif.job = values.job
        flag = true
      }
      if (
        values.profile !== formik.initialValues.profile &&
        values.profile !== ''
      ) {
        bodyVerif.role = values.profile
        flag = true
      }
      if (values.username !== formik.initialValues.username) {
        bodyVerif.username = values.username
        flag = true
      }
      if (values.password !== formik.initialValues.password) {
        bodyVerif.password = values.password
        flag = true
      }
      if (flag === true) {
        bodyVerif.userId = userId
      }

      try {
        if (flag === true) {
          await api.put('/user/update', bodyVerif)
          toast.success('Usuário editado com sucesso.')
          flag = false
          navigate('/users')
        } else {
          toast.success('Dados do usuário atualizados com sucesso.')
          navigate('/users')
        }
      } catch (error) {
        toast.error('Aconteceu algum erro.')
      }
    }
  })

  return (
    <StyledCard classes={{ root: 'rootCard' }}>
      <CardContent>
        <FormStyled onSubmit={formik.handleSubmit}>
          <BasicTextFields
            size="small"
            id="name"
            name="name"
            label="Nome completo"
            variant="outlined"
            value={formik.values.name || ''}
            type="name"
            onChange={formik.handleChange}
            color="primary"
            helperText={formik.touched.name && formik.errors.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
          />

          <BasicTextFields
            size="small"
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            value={formik.values.email || ''}
            type="email"
            onChange={formik.handleChange}
            color="primary"
            helperText={formik.touched.email && formik.errors.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
          />

          <BasicTextFields
            size="small"
            id="username"
            name="username"
            label="Nome de usuário"
            variant="outlined"
            value={formik.values.username || ''}
            type="username"
            onChange={formik.handleChange}
            color="primary"
            helperText={formik.touched.username && formik.errors.username}
            error={formik.touched.username && Boolean(formik.errors.username)}
          />

          <SelectJob
            size="small"
            labelId="demo-simple-select-job-label"
            name="job"
            type="text"
            id="demo-simple-select-job"
            value={formik.values.job}
            label="cargo"
            onChange={formik.handleChange}
            error={formik.touched.job && Boolean(formik.errors.job)}
            testid="jobSelect"
          />

          {isSuperAdmin &&
            (<SelectProfile
            size="small"
            labelId="demo-simple-select-profile-label"
            name="profile"
            type="profile"
            id="demo-simple-select-profile"
            value={formik.values.profile}
            label="perfilUsuario"
            onChange={formik.handleChange}
            error={formik.touched.profile && Boolean(formik.errors.profile)}
            testid="profileSelect"
          />)}

          {isSuperAdmin &&
            (<BasicTextFields
            size="small"
            data-testid="password"
            name="password"
            label="Digite uma nova senha"
            variant="outlined"
            value={formik.values.password}
            type="password"
            onChange={formik.handleChange}
            color="primary"
            helperText={formik.touched.password && formik.errors.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
          />)}

          <Button
            id="editar"
            name="editButton"
            variant="contained"
            type="submit"
            styledColor={theme.palette.primary.main}
            classes={{ root: 'rootEdit' }}>
            Editar
          </Button>
          <Button
            name="backButton"
            id="voltar"
            variant="contained"
            styledColor={theme.palette.grey[300]}
            textColor="black"
            classes={{ root: 'rootBack' }}
            onClick={() => navigate('/users')}>
            Voltar
          </Button>
          {isSuperAdmin && (
            <Button
              name="removeButton"
              id="remover"
              variant="contained"
              styledColor={theme.palette.error.main}
              textColor="white"
              classes={{ root: 'rootRemove' }}
              onClick={async () => {
                try {
                  await api.delete(`/user/delete?userId=${userId}`)
                  toast.success('Usuário excluido.')
                } catch (error) {
                  toast.error('Aconteceu algum erro.')
                }
                navigate('/users')
              }}>
              Remover
            </Button>
          )}
        </FormStyled>
      </CardContent>
    </StyledCard>
  )
}

export default Form
