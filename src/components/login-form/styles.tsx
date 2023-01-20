import { Card } from '@mui/material'
import styled from 'styled-components'
import { styled as styledSystem } from '@mui/system'
import { Link } from 'react-router-dom'

export const FormStyled = styled.form`
  display: grid;
  row-gap: 26px;
  align-content: center;
  width: 500px;
  height: 600px;
  align-self: center;
  padding-right: 88px;
  padding-left: 88px;
`

export const StyledCard = styledSystem(Card)(({ theme }) => ({
  '& .MuiCardContent-root': {
    width: '100%',
    height: '100%'
  },
  borderRadius: '10px',
  marginTop: '121px',
  marginBottom: '50px',
  backgroundColor: '#3c4b54'
}))

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`
