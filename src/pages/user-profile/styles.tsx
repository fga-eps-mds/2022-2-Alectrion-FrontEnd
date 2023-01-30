import styled from 'styled-components'
import { styled as styledSystem } from '@mui/system'
import { Avatar } from '@mui/material'

export const PageContainer = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
`

export const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding-top: 32px;
  margin: 10px auto;
  max-width: 1024px;
  align-items: center;
`

export const TitleText = styled.span`
  font-weight: bold;
  font-size: 3rem;
  line-height: normal;
`
export const SimpleText = styled.span`
  font-size: 3rem;
  line-height: normal;
`

export const StyledAvatar = styledSystem(Avatar)(({ theme }) => ({
  height: '130px', width: '130px', fontSize: '70px', backgroundColor: '#1F3541', color: '#fff !important'
}))
