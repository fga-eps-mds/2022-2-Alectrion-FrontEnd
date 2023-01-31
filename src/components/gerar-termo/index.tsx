import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import Paper from '@mui/material/Paper'

import { toast } from 'react-toastify'
import api from '../../api/config'
import { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Container, Typography, Input, Box, FormControl, MenuItem, Button, IconButton } from '@mui/material'
import React from 'react'
import { CSVLink } from 'react-csv'
import { BoxInput, ButtonClearFilters, ButtonFilters, ButtonCad, FilterScrenn, FilterScrennContent, StyledGenerateButton } from '../../pages/ScreenEquipaments/style'
import { FindContainer } from '../../pages/user-screen/styles'
import { dateFormat } from '../../utils/dateFormat'
import { StyledSelect } from '../register-user-form/styles'
import { StyledTextField } from '../text-field/styles'
import MovimentTables from '../Movimentation'

import { Movement } from '../../utils/types'

export interface SearchParams {
  id?: string
  userid?: string
  equipmentid?: string
  type?: Number
  lowerdate?: Date
  higherdate?: Date
  page?: Number
  resultquantity?: Number
}

export default function ScreenMoviments() {
  const [ movements, setMovements ] = useState<Movement[]>([])
  const [ basicSearch, setbasicSearch ] = useState<string>('')
  const [ page, setPage ] = useState(0)

  const resultQuantity =  20

  const initialValues = {
    id: '',
    userid: '',
    equipmentid: '',
    type: -1,
    lowerdate: new Date(0).toISOString().split('T')[0],
    higherdate: new Date().toISOString().split('T')[0]
  }

  const formik = useFormik({
    initialValues,
    onSubmit: (values: any) => {
      const query = {...values}

      Object.keys(values).forEach((param) => {
        if (query[param] === '' || query[param] == -1)
          delete query[param]
      })

      const lowerdate = new Date(query.lowerdate)
      lowerdate.setHours(0)
      lowerdate.setMinutes(0)
      lowerdate.setSeconds(0)
      lowerdate.setMilliseconds(0)

      const higherdate = new Date(query.higherdate)
      higherdate.setHours(23)
      higherdate.setMinutes(59)
      higherdate.setSeconds(59)
      higherdate.setMilliseconds(999)

      query.lowerdate = lowerdate.toISOString()
      query.higherdate = higherdate.toISOString()

      getMovements(query)
    }
  })

  const getMovements = async (query?: SearchParams) => {
    try {
      const { data }: AxiosResponse<Movement[]> = await api.get(
        'equipment/findMovements',
        {
          params: query
        }
      )

      setMovements(data)
    } catch (error) {
      setMovements([])
      toast.error('Nenhuma movimentação encontrada.')
    }
  }

  React.useEffect(() => {
    getMovements({resultquantity: resultQuantity})
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

  const updatePage = async (page: number) => {
    await getMovements({
      page,
      resultquantity: resultQuantity
    })

    setPage(page)
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'black' }}>
        Consultar Movimentações
      </Typography>

      <FindContainer>
        <BoxInput>
          <SearchIcon sx={{ marginBottom: '3px' }} />
          <Input
            id="identificador"
            name="identificador"
            sx={{ flex: 0.9 }}
            placeholder="Identificador"
            value={basicSearch}
            onChange={handleChange}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                if (basicSearch === '') {
                  getMovements()
                } else {
                  const query = {
                    serialNumber: basicSearch.toString()
                  } as unknown as SearchParams
                  getMovements(query)
                }
              }
            }}
          />
        </BoxInput>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ButtonFilters onClick={handleClickOpen} variant="contained">
            Filtros
            <FilterListOutlinedIcon sx={{ ml: '70px', color: '#A1A5BC' }} />
          </ButtonFilters>
        </Box>
      </FindContainer>

      <MovimentTables movements={movements} setMovements={setMovements} />

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '1.5em',
        marginBottom: '1.5em'
      }}>
            <IconButton disabled={!page} onClick={() => updatePage(page - 1)}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <span>{ page + 1 }</span>
            <IconButton disabled={movements.length < resultQuantity} onClick={() => updatePage(page + 1)}>
              <ArrowForwardIosIcon />
            </IconButton>
      </div>

      <FilterScrenn open={open}>
        <FilterScrennContent>
          <form onSubmit={formik.handleSubmit}>
            <FormControl sx={{width: '100%'}}>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', md: 'flex' },
                  mt: '25px'
                }}>
                <StyledTextField
                  fullWidth
                  id="id"
                  name="id"
                  label="ID da movimentação"
                  value={formik.values.id}
                  onChange={formik.handleChange}
                  sx={{ ml: '30px', width: '50%' }}
                />
                <StyledTextField
                  fullWidth
                  id="userid"
                  name="userid"
                  label="ID do usuário"
                  value={formik.values.userid}
                  onChange={formik.handleChange}
                  sx={{ ml: '30px', width: '50%' }}
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
                  id="equipmentid"
                  name="equipmentid"
                  label="ID do equipamento"
                  value={formik.values.equipmentid}
                  onChange={formik.handleChange}
                  sx={{ ml: '30px', width: '50%' }}
                />
                <StyledSelect
                    id="type"
                    name="type"
                    onChange={formik.handleChange}
                    value={formik.values.type}
                    sx={{
                      marginLeft: '30px',
                      textAlign: 'center',
                      width: '50%'
                    }}
                    inputProps={{ 'aria-label': 'Without label' }}>
                    <MenuItem value={-1} sx={{ justifyContent: 'center' }}>
                      <em>Tipo de Movimentação</em>
                    </MenuItem>
                    <MenuItem value={0} sx={{ justifyContent: 'center' }}>
                      Empréstimo
                    </MenuItem>
                    <MenuItem value={1} sx={{ justifyContent: 'center' }}>
                      Baixa
                    </MenuItem>
                    <MenuItem value={2} sx={{ justifyContent: 'center' }}>
                      Responsabilidade
                    </MenuItem>
                </StyledSelect>
              </Box>

              <Box sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                mt: '50px'
              }}>
                <StyledTextField
                  id="lowerdate"
                  name="lowerdate"
                  label="Data inicial"
                  type="date"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.lowerdate}
                  sx={{
                    marginLeft: '30px',
                    textAlign: 'center',
                    width: '50%'
                  }}
                />

                <StyledTextField
                  id="higherdate"
                  name="higherdate"
                  label="Data final"
                  type="date"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.higherdate}
                  sx={{
                    marginLeft: '30px',
                    textAlign: 'center',
                    width: '50%'
                  }}
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
    </Container>
  )
}
