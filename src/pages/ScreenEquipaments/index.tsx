import { useState, useContext, useEffect } from 'react'
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
  StyledGenerateButton,
  StyledGenerateButton2,
  MovimentScrenn,
  MovimentScrennContent,
  ContainerMov,
  StyledDescTextField
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
import { StyledTestButton } from '../../components/button/styles'
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

interface unit {
  name: string
  id: string
  localization: string
}

export default function ScreenEquipaments() {
  const [equipaments, setEquipaments] = useState<equipament[]>([])
  const [basicSearch, setbasicSearch] = useState<string>('')
  const [selectedEquipments, setSelectedEquipments] = useState<Object>({})
  const [units, setUnits] = useState<unit[]>([])

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

  const movementFormik = useFormik({
    initialValues: {
      userid: '',
      equipments: [],
      type: -1,
      inchargename: '',
      inchargerole: '',
      chiefname: '',
      chiefrole: '',
      destination: '',
      status: '',
      description: ''
    },

    onSubmit: async (values) => {
      const mockedUserId = '1f0fba7b-b937-4793-bc35-8f476e9e76e2'
      const status = values.type == 1 ? 'Reserva Técnica' : 'Baixado'
      const type = values.type == 3 ? 1 : values.type
      const equipments = Object.keys(selectedEquipments)

      const body = {
        ...values,
        status,
        type,
        equipments,
        userid: mockedUserId,
      }

      const { data }: AxiosResponse<any> = await api.post(
        'equipment/createMovement',
        body
      )

      if(data.error)
        toast.error(data.error)
      else {
        toast.success('Movimentação realizada com sucesso.')
        getEquipaments()
        setIsMovementModalOpen(false)
        setSelectedEquipments({})
      }
    },

    validateOnChange: false
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

  useEffect(() => {
    const getUnits = async () => {
      try {
        const { data }: AxiosResponse<unit[]> = await api.get(
          '/equipment/getAllUnits'
        )
        setUnits(data)
      } catch (error) {}
    }

    getEquipaments()
    getUnits()
  }, [])

  const [open, setOpen] = React.useState(false)
  const [isMovementModalOpen, setIsMovementModalOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClickOpen2 = () => {
    setIsMovementModalOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleClose2 = () => {
    setIsMovementModalOpen(false)
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

      <EquipamentsTables equipaments={equipaments} selectedEquipments={selectedEquipments} setSelectedEquipments={setSelectedEquipments} />
      
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
      <div>
        <StyledGenerateButton>
          <CSVLink {...csvReport}>Gerar Relatório</CSVLink>
        </StyledGenerateButton>
        <StyledGenerateButton2 onClick={handleClickOpen2}>
          Gerar Movimentação
        </StyledGenerateButton2>
      </div>

      <MovimentScrenn open={isMovementModalOpen}>
        <MovimentScrennContent>
        <form onSubmit={movementFormik.handleSubmit}>
          <FormControl>
            <ContainerMov>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ffffff'}}>
              Movimentação
            </Typography>
            </ContainerMov>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  <StyledSelect
                    id="type"
                    name="type"
                    value={movementFormik.values.type}
                    onChange={movementFormik.handleChange}
                    displayEmpty
                    sx={{
                      marginLeft: '30px',
                      textAlign: 'center'
                    }}
                    inputProps={{ 'aria-label': 'Without label' }}>
                    <MenuItem value={-1} sx={{ justifyContent: 'center' }}>
                      <em>Tipo de Movimentação</em>
                    </MenuItem>
                    <MenuItem value={0} sx={{ justifyContent: 'center' }}>
                      Empréstimo
                    </MenuItem>
                    <MenuItem value={1} sx={{ justifyContent: 'center' }}>
                      Baixa: Reserva Técnica
                    </MenuItem>
                    <MenuItem value={3} sx={{ justifyContent: 'center' }}>
                      Baixa: Sucata
                    </MenuItem>
                    <MenuItem value={2} sx={{ justifyContent: 'center' }}>
                      Responsabilidade
                    </MenuItem>
                  </StyledSelect>
                  <StyledSelect
                    id="destination"
                    name="destination"
                    value={movementFormik.values.destination}
                    onChange={movementFormik.handleChange}
                    displayEmpty
                    sx={{
                      marginLeft: '100px',
                      textAlign: 'center'
                    }}
                    inputProps={{ 'aria-label': 'Without label' }}>
                      <MenuItem value="" sx={{ justifyContent: 'center' }}>
                        <em>Unidade de Destino</em>
                      </MenuItem>

                      { units.map((unit) => {
                        return (
                          <MenuItem value={unit.id} sx={{ justifyContent: 'center' }}>
                            <em>{ unit.name }</em>
                          </MenuItem>
                        )
                      })}
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
                    id="inchargename"
                    name="inchargename"
                    label="Nome do responsável"
                    value={movementFormik.values.inchargename}
                    onChange={movementFormik.handleChange}
                    sx={{ ml: '30px' }}
                  />
                  <StyledTextField
                    fullWidth
                    id="inchargerole"
                    name="inchargerole"
                    label="Cargo do responsável"
                    value={movementFormik.values.inchargerole}
                    onChange={movementFormik.handleChange}
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
                    id="chiefname"
                    name="chiefname"
                    label="Nome do chefe da DSTI"
                    value={movementFormik.values.chiefname}
                    onChange={movementFormik.handleChange}
                    sx={{ ml: '30px' }}
                  />
                  <StyledTextField
                    fullWidth
                    id="chiefrole"
                    name="chiefrole"
                    label="Cargo do chefe da DSTI"
                    value={movementFormik.values.chiefrole}
                    onChange={movementFormik.handleChange}
                    sx={{ ml: '90px' }}
                  />
                </Box>

                <Box sx={{
                  flexGrow: 1,
                  display: { xs: 'none', md: 'flex' },
                  mt: '50px'
                }}>
                  <StyledDescTextField
                      id="description"
                      label="Descrição"
                      type="text"
                      name="description"
                      variant="outlined"
                      onChange={movementFormik.handleChange}
                      value={movementFormik.values.description}
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
              onClick={handleClose2}
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
              sx={{
                marginLeft: '150px',
                width: '224px',
                fontWeight: 'bold',
                borderRadius: '10px'
              }}>
              Gerar
            </Button>
          </Box>
        </form>
        </MovimentScrennContent>

      </MovimentScrenn>

    </Container>
  )
}
