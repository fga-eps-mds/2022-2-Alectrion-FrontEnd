import { ButtonProps } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { Props, StyledEditButton } from './styles'

export type StyledButton = ButtonProps & Props

export const EditOSButton = (props: StyledButton) => {
  return (
    <>
      {
        <StyledEditButton {...props} data-testid="button">
          <EditIcon />
          {props.children}
        </StyledEditButton>
      }
    </>
  )
}
