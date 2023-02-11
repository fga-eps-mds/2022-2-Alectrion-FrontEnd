import { Button, ButtonProps, css, styled } from '@mui/material'

export type Props = ButtonProps & {
  styledColor?: string
  textColor?: string
  marginTop?: string
  marginBottom?: string
}

export const StyledPrintButton = styled(Button)<Props>(
  ({ theme, styledColor, textColor, marginTop, marginBottom }) => css`
    color: black;
    border-radius: 15px;
    cursor: pointer;
  `
)
