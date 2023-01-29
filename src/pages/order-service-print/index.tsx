/* eslint-disable eqeqeq */
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import { Button } from '../../components/button'
import OderServiceTable from '../../components/order-services-table'
import { Container, StyledCard, StyledTextField, ButtonGroup } from './styles'
import { theme } from '../../styles/theme'
import api from '../../api/config'
import { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import FilterOrderService from '../../components/filter-order-service'
import { AuthContext } from '../../contexts/auth'
interface AuthContextType {
  user: {
    role: string
  }
}
interface OrderService {
  id: string
  date: string
  description: string
  authorId: string
  senderName: string
  senderFunctionalNumber: string
  status: string
  receiverName: string
  equipment: {
    type: string
    tippingNumber: string
    status: string
  }
}
interface filterType {
  tippingNumber?: string
  receiverName?: string
  equipment?: string
  serialNumber?: string
  type?: string
  status?: string
  sender?: string
  date?: string
}

export const OrderPrint = () => {
  const navigate = useNavigate()
  const [orderServices, setOrderServices] = useState<OrderService[]>([])
  const [tippingNumber, setTippingNumber] = useState('')
  const [filters, setFilters] = useState<filterType>({})
  const [openFilter, setOpenFilter] = useState(false)
  const { user } = useContext(AuthContext) as AuthContextType
  const role = user?.role
  const isConsulta = user.role === 'consulta'

  const handleApplyFilter = (values: any) => {
    toast.success('Filtro aplicado')
    setFilters({
      ...filters,
      receiverName: values?.receiverName,
      sender: values?.senderName,
      date: values?.date,
      tippingNumber: values?.tippingNumber,
      status: values?.status,
      type: values?.productType
    })
  }
  useEffect(() => {
    const getUser = async () => {
      try {
        const queryParams = new URLSearchParams('')
        Object.entries(filters).forEach(
          (value) => value[1] && queryParams.append(value[0], value[1])
        )
        const { data }: AxiosResponse<OrderService[]> = await api.get(
          `/equipment/listOrderSerice`,
          {
            params: queryParams
          }
        )
        setOrderServices(data)
      } catch (error) {
        toast.error('Aconteceu algum erro.')
      }
    }
    getUser()
  }, [filters])

  return (
    <>
      <Container>
        <Typography variant="h4" align='center' sx={{ fontWeight: 'bold' }}>
          Imprime ordem de serviço
        </Typography>
        <Button
                width="240px"
                height="62px"
                textColor="#FFFFFF"
                styledColor="#16878C"
                onClick={() => navigate('/order-services')}
                borderRadius="10px">
                Voltar OS
              </Button>
      </Container>
      <FilterOrderService
        open={openFilter}
        handleClose={() => setOpenFilter(false)}
        handleApplyFilter={handleApplyFilter}
      />
    </>
  )
}
