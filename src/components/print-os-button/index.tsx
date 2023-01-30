import { ButtonProps } from '@mui/material'
import PrintIcon from '@mui/icons-material/Print'
import { Props, StyledPrintButton } from './styles'

export type StyledButton = ButtonProps & Props

export const PrintOSButton = (props: StyledButton) => {
  return (
    <>
      {
        <StyledPrintButton {...props} data-testid="button">
          <PrintIcon />
          {props.children}
        </StyledPrintButton>
      }
    </>
  )
}
