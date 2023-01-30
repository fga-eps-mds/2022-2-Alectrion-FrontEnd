import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { SelectChangeEvent } from '@mui/material/Select'
import { StyledSelect } from './styles'
import { ReactNode } from 'react'

interface PropTypes {
  labelId?: string
  name?: string
  type?: string
  id?: string
  value?: string
  label?: string
  onChange?: (event: SelectChangeEvent<unknown>, child: ReactNode) => void
  error?: any
  testid?: string
  size?: 'small' | 'medium'
}

const SelectJob: React.FC<PropTypes> = ({
  labelId,
  name,
  type,
  id,
  value,
  label,
  onChange,
  error,
  testid,
  size
}) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel
          id="demo-simple-select-label"
          shrink={true}
          sx={{ marginTop: '-7px', color: '#FFF' }}>
          Cargo
        </InputLabel>
        <StyledSelect
          labelId={labelId}
          name={name}
          type={type}
          id={id}
          value={value}
          label={label}
          onChange={onChange}
          error={error}
          data-testid={testid}
          size={size}>
          <MenuItem value={'delegado'}>Delegado</MenuItem>
          <MenuItem value={'agente de policia'}>Agente de polícia</MenuItem>
          <MenuItem value={'escrivao de policia'}>Escrivão</MenuItem>
          <MenuItem value={'coordenador'}>Coordenador</MenuItem>
          <MenuItem value={'chefe de secao'}>Chefe de seção</MenuItem>
          <MenuItem value={'generico'}>Genérico</MenuItem>
          <MenuItem value={'comissionado'}>Comissionado</MenuItem>
          <MenuItem value={'estagiario'}>Estagiário</MenuItem>
          <MenuItem value={'superintendente'}>Superintendente</MenuItem>
        </StyledSelect>
      </FormControl>
    </Box>
  )
}

export default SelectJob
