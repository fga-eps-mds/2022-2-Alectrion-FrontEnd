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

const SelectProfile: React.FC<PropTypes> = ({
  labelId,
  name,
  type,
  id,
  value,
  label,
  onChange,
  error,
  testid,
  size,
}) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel
          id="demo-simple-select-label"
          shrink={true}
          sx={{ marginTop: '-7px', color: '#FFF' }}>
          Perfil do Usuário
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
               
          <MenuItem value={'basico'}>Básico</MenuItem>
          <MenuItem value={'consulta'}>Consulta</MenuItem>
          <MenuItem value={'gerente'}>Gerente</MenuItem>
          <MenuItem value={'administrador'}>Admin</MenuItem>

        </StyledSelect>
      </FormControl>
    </Box>
  )
}

export default SelectProfile
