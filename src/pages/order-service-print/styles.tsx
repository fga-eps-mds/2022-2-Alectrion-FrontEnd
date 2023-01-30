import styled from 'styled-components'
import { Card, TextField } from '@mui/material'
import { styled as styledSystem } from '@mui/system'

export const Container = styled.div`
  width: 100%;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  max-width: 1286px;
  margin: 40px auto;
`
export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 26px;
`

export const StyledCard = styledSystem(Card)(({ theme }) => ({
  borderRadius: '15px',
  padding: '20px 32px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.light,
  margin: '32px 0px 16px 0px'
}))

export const StyledTextField = styledSystem(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: '10px'
  },
  '& .MuiOutlinedInput-input': {
    backgroundColor: theme.palette.background.default,
    borderRadius: '10px !important'
  },
  maxWidth: '286px',
  height: '40px',
  '& .MuiInputLabel-shrink': {
    marginTop: '-7px',
    color: theme.palette.background.default,
    textShadow: '0 0px 1px rgba(0,0,0,1), 0 0px 1px rgba(0,0,0,1)'
  }
}))

// export const FilterButton = styledSystem(Button)(({ theme }) => ({

// }))
