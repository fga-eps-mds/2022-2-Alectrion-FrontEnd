import styled from 'styled-components'
import { styled as styledSystem } from '@mui/system'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  InputLabel,
  Select,
  TextField
} from '@mui/material'

export const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding-top: 32px;
  margin: 40px auto;
  width: 1024px;
`
export const FindContainer = styled.div`
  display: flex;
  max-height: 120px;
  align-items: center;
  justify-content: space-between;
  padding: 18px 32px;
  background-color: #1f3541;
  border-radius: 20px;
  width: 100%;
  max-width: 1024x;
  margin-top: 40px;
  margin-bottom
`
export const BoxInput = styledSystem(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  backgroundColor: '#fff',
  height: '45px',
  width: '286px',
  borderRadius: '10px',
  textAlign: 'center',
  padding: '5px 0px'
}))

export const ButtonFilters = styledSystem(Button)(({ theme }) => ({
  backgroundColor: '#D9D9D9',
  width: '183px',
  heigth: '45px',
  borderRadius: '10px',
  display: 'flex',
  justifyContent: 'left',
  color: '#575757',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#ffff'
  }
}))

export const ButtonClearFilters = styledSystem(Button)(({ theme }) => ({
  backgroundColor: '#D9D9D9',
  alignText: 'center',
  width: '160px',
  heigth: '45px',
  borderRadius: '10px',
  display: 'flex',
  justifyContent: 'left',
  color: '#575757',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#ffff'
  }
}))


export const ButtonCad = styledSystem(Button)(({ theme }) => ({
  backgroundColor: '#16878C',
  heigth: '62px',
  width: '261px',
  fontWeight: 'bold',
  alignItems: 'center',
  color: 'white',
  margin: '10px 0',
  marginLeft: '15px',
  '&:hover': {
    backgroundColor: '#16878C'
  }
}))

export const FilterScrenn = styledSystem(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    maxWidth: '790px !important',
    borderRadius: '14px',
    minHeight: '600px',
    height: '80%'
  }
}))

export const FilterScrennContent = styledSystem(DialogContent)(({ theme }) => ({
  width: '790px',
  backgroundColor: '#3C4B54'
}))

export const StyledInputLabel = styledSystem(InputLabel)(({ theme }) => ({
  color: theme.palette.background.default,
  textShadow: '0 0px 1px rgba(0,0,0,1), 0 0px 1px rgba(0,0,0,1)'
}))

export const StyledSelect = styledSystem(Select)(({ theme }) => ({
  '& .MuiSelect-select': {
    backgroundColor: theme.palette.background.default,
    padding: '8.5px',
    borderRadius: '15px !important',
    color: '#666666',
    width: '250px'
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '15px'
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: '15px'
  },
  maxWidth: '416px',
  height: '40px',
  '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
    marginLeft: '2px'
  },
  '& .MuiPopover-paper': {
    backgroundColor: theme.palette.background.default
  }
}))

export const StyledTextField = styledSystem(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: '15px'
  },
  '& .MuiOutlinedInput-input': {
    backgroundColor: theme.palette.background.default,
    borderRadius: '15px !important',
    width: '270px'
  },
  maxWidth: '300px',
  height: '40px',
  '& .MuiInputLabel-shrink': {
    marginTop: '-7px',
    color: theme.palette.background.default,
    textShadow: '0 0px 1px rgba(0,0,0,1), 0 0px 1px rgba(0,0,0,1)'
  }
}))
