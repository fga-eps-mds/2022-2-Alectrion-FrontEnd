import { Button } from '../button'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {
  StyledTextField,
  FormContainer,
  Column,
  StyledSelect,
  StyledInputLabel,
  StyledDialogContent,
  ButtonGroup,
  StyledDialog
} from './styles'
import { FormControl, MenuItem } from '@mui/material'

export interface FilterOrderServiceProps {
  open: boolean
  handleClose: () => void
  handleApplyFilter: (values: any) => void
}

const FilterOrderService = ({
  open,
  handleClose,
  handleApplyFilter
}: FilterOrderServiceProps) => {
  const validationSchema = yup.object().shape({
    receiverName: yup.string().trim(),
    senderName: yup.string().trim(),
    date: yup.date(),
    tippingNumber: yup.string().trim(),
    situacao: yup.string().trim()
  })
  const formik = useFormik({
    initialValues: {
      receiverName: '',
      senderName: '',
      date: '',
      tippingNumber: '',
      situacao: '',
      productType: ''
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      handleApplyFilter(values)
      handleClose()
    }
  })

  return (
    <StyledDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}>
      <StyledDialogContent>
        <FormContainer>
          <Column>
            <StyledTextField
              id="senderName-select-label"
              data-testid="senderName-select"
              label="Nome do entregador"
              type="text"
              name="senderName"
              fullWidth
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.senderName}
              helperText={formik.touched.senderName && formik.errors.senderName}
              error={
                formik.touched.senderName && Boolean(formik.errors.senderName)
              }
            />
            <FormControl fullWidth>
              <StyledInputLabel id="productType-select-label">
                Tipo de produto
              </StyledInputLabel>
              <StyledSelect
                id="productType-select-label"
                data-testid="productType-select"
                label="Tipo do equipamento"
                type="text"
                name="productType"
                variant="outlined"
                error={
                  formik.touched.productType &&
                  Boolean(formik.errors.productType)
                }
                onChange={formik.handleChange}
                value={formik.values.productType}>
                <MenuItem value="CPU">CPU</MenuItem>
                <MenuItem value="Escaneador">Escaneador</MenuItem>
                <MenuItem value="Estabilizador">Estabilizador</MenuItem>
                <MenuItem value="Monitor">Monitor</MenuItem>
                <MenuItem value="Nobreak">Nobreak</MenuItem>
                <MenuItem value="Webcan">Webcan</MenuItem>
              </StyledSelect>
            </FormControl>
            <StyledTextField
              id="tippingNumber-input"
              data-testid="tippingNumber-input"
              label="N° Tombamento"
              type="text"
              name="tippingNumber"
              variant="outlined"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.tippingNumber}
              helperText={
                formik.touched.tippingNumber && formik.errors.tippingNumber
              }
              error={
                formik.touched.tippingNumber &&
                Boolean(formik.errors.tippingNumber)
              }
            />
          </Column>
          <Column>
            <StyledTextField
              aria-aria-readonly
              label="Nome do recebedor"
              type="text"
              name="receiverName"
              variant="outlined"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.receiverName}
              helperText={
                formik.touched.receiverName && formik.errors.receiverName
              }
              error={
                formik.touched.receiverName &&
                Boolean(formik.errors.receiverName)
              }
            />
            <StyledTextField
              InputLabelProps={{ shrink: true }}
              id="data-input"
              label="Data"
              type="date"
              name="date"
              fullWidth
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.date}
              helperText={formik.touched.date && formik.errors.date}
              error={formik.touched.date && Boolean(formik.errors.date)}
            />
            <FormControl fullWidth>
              <StyledInputLabel id="job-select-label">Situação</StyledInputLabel>
              <StyledSelect
                id="situacao-select-label"
                data-testid="situacao-select"
                label="Situação"
                type="text"
                name="situacao"
                variant="outlined"
                error={formik.touched.situacao && Boolean(formik.errors.situacao)}
                onChange={formik.handleChange}
                value={formik.values.situacao}>
                <MenuItem value="Ativo">Ativo</MenuItem>
                <MenuItem value="Ativo Empréstimo">Ativo Empréstimo</MenuItem>
                <MenuItem value="Baixado">Baixado</MenuItem>
                <MenuItem value="Manutenção">Manutenção</MenuItem>
                <MenuItem value="Reserva Técnica">Reserva técnica</MenuItem>
              </StyledSelect>
            </FormControl>
          </Column>
        </FormContainer>
      </StyledDialogContent>
      <ButtonGroup>
        <Button
          styledColor="#FFFFFF"
          textColor="#000000"
          borderRadius="10px"
          width="223px"
          onClick={handleClose}>
          Voltar
        </Button>
        <Button
          styledColor="#5289B5"
          textColor="#FFFFFF"
          borderRadius="10px"
          width="223px"
          onClick={() => formik.submitForm()}>
          Filtrar
        </Button>
      </ButtonGroup>
    </StyledDialog>
  )
}

export default FilterOrderService
