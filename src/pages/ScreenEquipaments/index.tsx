import { useState, useContext } from 'react'
import {
  Container,
  FindContainer,
  BoxInput,
  ButtonFilters,
  ButtonCad,
  FilterScrenn,
  FilterScrennContent,
  StyledSelect,
  StyledTextField,
  ButtonClearFilters,
  StyledGenerateButton
} from './style'
import * as React from 'react'
import { CSVLink } from 'react-csv'
import { useFormik } from 'formik'
import { dateFormat } from '../../utils/dateFormat'
import {
  Typography,
  Box,
  FormControl,
  MenuItem,
  Button,
  Input
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import EquipamentsTables from '../../components/Equipament-Tables'

import { toast } from 'react-toastify'
import api from '../../api/config'
import { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
interface AuthContextType {
  user: {
    role: string
  }
}

export interface SearchParams {
  tippingNumber: string

  serialNumber: string

  type: string

  situacao: string

  estado: string

  model: string

  acquisitionDate: Date

  description?: string

  initialUseDate: Date

  screenSize?: string

  invoiceNumber: string

  power?: string

  screenType?: string

  processor?: string

  storageType?: string

  storageAmount?: string

  brand: string

  acquisitionId: string

  unitId: string

  ram_size?: string
}

interface equipament {
  tippingNumber: string

  serialNumber: string

  type: string

  situacao: string

  estado: string

  model: string

  acquisitionDate: Date

  description?: string

  initialUseDate: Date

  screenSize?: string

  invoiceNumber: string

  power?: string

  screenType?: string

  processor?: string

  storageType?: string

  storageAmount?: string

  brand: {
    name: string
  }

  acquisition: any

  unit: {
    name: string
    localization: string
  }

  ram_size?: string

  createdAt?: string

  id: string
}

export default function ScreenEquipaments() {
  const [equipaments, setEquipaments] = useState<equipament[]>([])
  const [basicSearch, setbasicSearch] = useState<string>('')
  const navigate = useNavigate()
  const { user } = useContext(AuthContext) as AuthContextType
  const role = user?.role
  const initialValues = {
    tippingNumber: '',

    serialNumber: '',

    type: '',

    estado: '',

    situacao: '',

    model: '',

    acquisitionDate: '',

    description: '',

    initialUseDate: '',

    screenSize: '',

    invoiceNumber: '',

    power: '',

    screenType: '',

    processor: '',

    storageType: '',

    storageAmount: '',

    brand: '',

    acquisitionId: '',

    unitId: '',

    ram_size: ''
  }

  const formik = useFormik({
    initialValues,
    onSubmit: (values: any) => {
      Object.keys(values).forEach((param) => {
        if (values[param] === '') {
          delete values[param]
        }
      })
      getEquipaments(values)
    }
  })

  const getEquipaments = async (query?: SearchParams) => {
    try {
      const queryParams = new URLSearchParams('')
      if (query) {
        Object.entries(query).forEach((value) =>
          queryParams.append(value[0], value[1])
        )
      }

      const { data }: AxiosResponse<equipament[]> = await api.get(
        'equipment/find',
        {
          params: queryParams
        }
      )
      setEquipaments(data)
    } catch (error) {
      setEquipaments([])
      toast.error('Nenhum Equipamento encontrado')
    }
  }
  const renderEquipmentTable = React.useCallback(() => {
    return <EquipamentsTables equipaments={equipaments} />
  }, [equipaments])
  React.useEffect(() => {
    getEquipaments()
  }, [])

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setbasicSearch(event.target.value)
  }

  const cabecalhos = [
    { label: 'Nº de Tombamento', key: 'tippingNumber' },
    { label: 'Nº Série', key: 'serialNumber' },
    { label: 'Situação', key: 'situacao' },
    { label: 'Unidade', key: 'unit.name' },
    { label: 'Unidade', key: 'unit.localization' },
    { label: 'Data de aquisição', key: 'createdAt' },
    { label: 'Tipo Equipamento', key: 'type' },    
    { label: 'Estado', key: 'estado' },
    { label: 'Marca', key: 'brand.name' },
    { label: 'Modelo', key: 'model' },
    { label: 'Processador', key: 'processor' },
    { label: 'Tipo de armazenamento', key: 'storageType' },
    { label: 'Espaço de armazenamento', key: 'storageAmount' },
    { label: 'Memoria RAM', key: 'ram_size' },
    { label: 'Modelo de Tela', key: 'screenType' },
    { label: 'Tamanho da tela', key: 'screenSize' },
    { label: 'Potência', key: 'power' },
    { label: 'Descrição', key: 'description' },
    { label: 'Nota Fiscal', key: 'invoiceNumber' }
  ]

  const csvReport = {
    filename: `RelatorioEquipamento-${dateFormat(new Date())}.csv`,
    headers: cabecalhos,
    data: equipaments
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'black' }}>
        Consultar Equipamentos
      </Typography>

      <FindContainer>
        <BoxInput>
          <SearchIcon sx={{ marginBottom: '3px' }} />
          <Input
            id="searchField"
            name="search"
            sx={{ flex: 0.9 }}
            placeholder="Nº de Série/Tombamento"
            value={basicSearch}
            onChange={handleChange}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                if (basicSearch === '') {
                  getEquipaments()
                } else {
                  const query = {
                    serialNumber: basicSearch.toString()
                  } as unknown as SearchParams
                  getEquipaments(query)
                }
              }
            }}
          />
        </BoxInput>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ButtonClearFilters
            sx={{ mr: '10px' }}
            onClick={() => {
              getEquipaments()
            }}>
            Limpar Filtros
          </ButtonClearFilters>

          <ButtonFilters onClick={handleClickOpen} variant="contained">
            Filtros
            <FilterListOutlinedIcon sx={{ ml: '70px', color: '#A1A5BC' }} />
          </ButtonFilters>
          {role !== 'consulta' && ( // Apenas o perfil de consulta não tem acesso ao botao de cadastro de equipamento
            <ButtonCad onClick={() => navigate('/equipment-register')}>
              Cadastrar Equipamento
            </ButtonCad>
          )}
        </Box>
      </FindContainer>
      {renderEquipmentTable()}
      <FilterScrenn open={open}>
        <FilterScrennContent>
          <form onSubmit={formik.handleSubmit}>
            <FormControl>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <StyledSelect
                  id="type"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  displayEmpty
                  sx={{
                    marginLeft: '30px',
                    textAlign: 'center'
                  }}
                  inputProps={{ 'aria-label': 'Without label' }}>
                  <MenuItem 
                    value="" 
                    sx={{ justifyContent: 'center' }}>
                    <em>Tipo de Equipamento</em>
                  </MenuItem>
                  <MenuItem 
                    value="CPU" 
                    sx={{ justifyContent: 'center' }}>
                    CPU
                  </MenuItem>
                  <MenuItem 
                    value="Escaneador" 
                    sx={{ justifyContent: 'center' }}>
                    Escaneador
                  </MenuItem>
                  <MenuItem 
                    value="Estabilizador" 
                    sx={{ justifyContent: 'center' }}>
                    Estabilizador
                  </MenuItem>
                  <MenuItem 
                    value="Monitor" 
                    sx={{ justifyContent: 'center' }}>
                    Monitor
                  </MenuItem>
                  <MenuItem 
                    value="Nobreak" 
                    sx={{ justifyContent: 'center' }}>
                    Nobreak
                  </MenuItem>
                  <MenuItem 
                    value="Webcam" 
                    sx={{ justifyContent: 'center' }}>
                    WebCam
                  </MenuItem>
                </StyledSelect>
                <StyledSelect
                  id="situacao"
                  name="situacao"
                  value={formik.values.situacao}
                  onChange={formik.handleChange}
                  displayEmpty
                  sx={{
                    marginLeft: '100px',
                    textAlign: 'center'
                  }}
                  inputProps={{ 'aria-label': 'Without label' }}>
                  <MenuItem 
                    value="" 
                    sx={{ justifyContent: 'center' }}>
                    <em>Situação</em>
                  </MenuItem>
                  <MenuItem 
                    value="Ativo" 
                    sx={{ justifyContent: 'center' }}>
                    Ativo
                  </MenuItem>
                  <MenuItem 
                    value="Ativo Empréstimo" 
                    sx={{ justifyContent: 'center' }}>
                    Ativo Empréstimo
                  </MenuItem>
                  <MenuItem
                    value="Baixado"
                    sx={{ justifyContent: 'center' }}>
                    Baixado
                  </MenuItem>
                  <MenuItem
                    value="Manutenção"
                    sx={{ justifyContent: 'center' }}>
                    Manutenção
                  </MenuItem>
                  <MenuItem
                    value="Reserva Técnica"
                    sx={{ justifyContent: 'center' }}>
                    Reserva Técnica
                  </MenuItem>
                </StyledSelect>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', md: 'flex' },
                  mt: '25px'
                }}>
                <StyledSelect
                  id="storageType"
                  name="storageType"
                  value={formik.values.storageType}
                  onChange={formik.handleChange}
                  displayEmpty
                  sx={{
                    marginLeft: '30px',
                    textAlign: 'center'
                  }}
                  inputProps={{ 'aria-label': 'Without label' }}>
                  <MenuItem 
                    value="" 
                    sx={{ justifyContent: 'center' }}>
                    <em>Tipo de Armazenamento</em>
                  </MenuItem>
                  <MenuItem 
                    value="HD" 
                    sx={{ justifyContent: 'center' }}>
                    HD
                  </MenuItem>
                  <MenuItem 
                    value="SSD" 
                    sx={{ justifyContent: 'center' }}>
                    SSD
                  </MenuItem>
                </StyledSelect>
                <StyledSelect
                  id="screenType"
                  name="screenType"
                  value={formik.values.screenType}
                  onChange={formik.handleChange}
                  displayEmpty
                  sx={{
                    marginLeft: '100px',
                    textAlign: 'center'
                  }}
                  inputProps={{ 'aria-label': 'Without label' }}>
                  <MenuItem 
                    value="" 
                    sx={{ justifyContent: 'center' }}>
                    <em>Tipo de Tela</em>
                  </MenuItem>
                  <MenuItem 
                    value="IPS" 
                    sx={{ justifyContent: 'center' }}>
                    IPS
                  </MenuItem>
                  <MenuItem 
                    value="LCD" 
                    sx={{ justifyContent: 'center' }}>
                    LCD
                  </MenuItem>
                  <MenuItem 
                    value="LED" 
                    sx={{ justifyContent: 'center' }}>
                    LED
                  </MenuItem>
                  <MenuItem 
                    value="OLED" 
                    sx={{ justifyContent: 'center' }}>
                    OLED
                  </MenuItem>
                  <MenuItem 
                    value="TN" 
                    sx={{ justifyContent: 'center' }}>
                    TN
                  </MenuItem>
                  <MenuItem 
                    value="VA" 
                    sx={{ justifyContent: 'center' }}>
                    VA
                  </MenuItem>
                </StyledSelect>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', md: 'flex' },
                  mt: '25px'
                }}>
                <StyledTextField
                  fullWidth
                  id="tippingNumber"
                  name="tippingNumber"
                  label="Nº de tombamento"
                  value={formik.values.tippingNumber}
                  onChange={formik.handleChange}
                  sx={{ ml: '30px' }}
                />
                <StyledTextField
                  fullWidth
                  id="serialNumber"
                  name="serialNumber" 
                  label="Nº de série"
                  value={formik.values.serialNumber}
                  onChange={formik.handleChange}
                  sx={{ ml: '90px' }}
                />
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', md: 'flex' },
                  mt: '50px'
                }}>
                <StyledTextField
                  fullWidth
                  id="model"
                  name="model"
                  label="Modelo"
                  value={formik.values.model}
                  onChange={formik.handleChange}
                  sx={{ ml: '30px' }}
                />
                <StyledTextField
                  fullWidth
                  id="screenSize"
                  name="screenSize"
                  label="Tamanho da Tela"
                  value={formik.values.screenSize}
                  onChange={formik.handleChange}
                  sx={{ ml: '90px' }}
                />
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', md: 'flex' },
                  mt: '50px'
                }}>
                <StyledTextField
                  fullWidth
                  id="brand"
                  name="brand"
                  label="Marca"
                  value={formik.values.brand}
                  onChange={formik.handleChange}
                  sx={{ ml: '30px' }}
                />
                <StyledTextField
                  fullWidth
                  id="processor"
                  name="processor"
                  label="Processador"
                  value={formik.values.processor}
                  onChange={formik.handleChange}
                  sx={{ ml: '90px' }}
                />
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', md: 'flex' },
                  mt: '50px'
                }}>
                <StyledTextField
                  fullWidth
                  id="acquision"
                  name="acquision"
                  label="Tipo aquisição"
                  value={formik.values.acquisitionId}
                  onChange={formik.handleChange}
                  sx={{ ml: '30px' }}
                />
                <StyledTextField
                  fullWidth
                  id="power"
                  name="power"
                  label="Potência"
                  value={formik.values.power}
                  onChange={formik.handleChange}
                  sx={{ ml: '90px' }}
                />
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', md: 'flex' },
                  mt: '50px'
                }}>
                <StyledTextField
                  fullWidth
                  id="ram"
                  name="ram"
                  label="Memória RAM"
                  value={formik.values.ram_size}
                  onChange={formik.handleChange}
                  sx={{ ml: '30px' }}
                />
                <StyledTextField
                  fullWidth
                  id="storageAmount"
                  name="storageAmount"
                  label="Espaço de amarzenamento"
                  value={formik.values.storageAmount}
                  onChange={formik.handleChange}
                  sx={{ ml: '90px' }}
                />
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', md: 'flex' },
                  mt: '50px'
                }}>
                <StyledSelect
                  id="estado"
                  name="estado"
                  value={formik.values.storageType}
                  onChange={formik.handleChange}
                  displayEmpty
                  sx={{
                    marginLeft: '30px',
                    textAlign: 'center'
                  }}
                  inputProps={{ 'aria-label': 'Without label' }}>
                  <MenuItem 
                    value="" 
                    sx={{ justifyContent: 'center' }}>
                    <em>Estado</em>
                  </MenuItem>
                  <MenuItem 
                    value="Novo" 
                    sx={{ justifyContent: 'center' }}>
                    Novo
                  </MenuItem>
                  <MenuItem 
                    value="Usado" 
                    sx={{ justifyContent: 'center' }}>
                    Usado
                  </MenuItem>
                </StyledSelect>
                <StyledTextField
                  type="date"
                  id="acquisitionDate"
                  name="acquisitionDate"
                  value={formik.values.acquisitionDate}
                  onChange={formik.handleChange}
                  sx={{ ml: '95px' }}
                />
              </Box>
            </FormControl>
            <Box
              sx={{
                marginTop: '50px',
                display: 'flex',
                justifyContent: 'center'
              }}>
              <Button
                variant="contained"
                onClick={handleClose}
                sx={{
                  backgroundColor: 'white',
                  color: '#666666',
                  width: '224px',
                  fontWeight: 'bold',
                  borderRadius: '10px'
                }}>
                Voltar
              </Button>
              <Button
                variant="contained"
                type="submit"
                onClick={handleClose}
                sx={{
                  marginLeft: '150px',
                  width: '224px',
                  fontWeight: 'bold',
                  borderRadius: '10px'
                }}>
                Buscar
              </Button>
            </Box>
          </form>
        </FilterScrennContent>
      </FilterScrenn>
      <StyledGenerateButton>
        <CSVLink {...csvReport}>Gerar Relatório</CSVLink>
      </StyledGenerateButton>
    </Container>
  )
}
