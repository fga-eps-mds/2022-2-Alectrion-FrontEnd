import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material'
import {
  ButtonDownloadEquipament,
  ButtonReservEquipament,
  StyledTableCell,
  StyledTableRow
} from './style'
import { EditButton } from './../edit-button/index'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { dateFormat } from '../../utils/dateFormat'
interface AuthContextType {
  user: {
    role: string
  }
}

export interface equipament {
  tippingNumber: string

  serialNumber: string

  type: string

  situacao: string

  estado: string

  model: string

  description?: string

  initialUseDate: Date

  screenSize?: string

  invoiceNumber: string

  power?: string

  screenType?: string

  processor?: string

  storageType?: string

  storageAmount?: string

  brand: any

  acquisitionDate: Date

  unit: {
    name: string
    localization: string
  }

  ram_size?: string

  createdAt?: string

  id: string
}

interface propType {
  equipaments: equipament[]
}

export default function EquipamentsTables({ equipaments }: propType) {
  const { user } = useContext(AuthContext) as AuthContextType
  const role = user?.role
  return (
    <TableContainer
      sx={{
        minWidth: '80%',
        margin: '0 auto',
        maxWidth: '1024px',
        textAlign: 'center'
      }}
      component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">N° Tombamento </StyledTableCell>
            <StyledTableCell align="center">N° Série</StyledTableCell>
            <StyledTableCell align="center">Situação</StyledTableCell> {/* renomeamos status para situação */}
            <StyledTableCell align="center">Unidade</StyledTableCell>
            <StyledTableCell align="center">Data de aquisição</StyledTableCell>
            <StyledTableCell align="center">Tipo Equipamento</StyledTableCell>
            <StyledTableCell align="center">Estado</StyledTableCell> {/* novo/usuado */}
            <StyledTableCell align="center">Marca</StyledTableCell>
            <StyledTableCell align="center">Modelo</StyledTableCell>
            <StyledTableCell align="center">Processador</StyledTableCell>
            <StyledTableCell align="center">
              Tipo de armazenamento
            </StyledTableCell>
            <StyledTableCell align="center">
              Espaço de armazenamento
            </StyledTableCell>
            <StyledTableCell align="center">Memoria RAM</StyledTableCell>
            <StyledTableCell align="center">Modelo de Tela</StyledTableCell>
            <StyledTableCell align="center">Tamanho da tela</StyledTableCell>
            <StyledTableCell align="center">Potência</StyledTableCell>
            <StyledTableCell align="center" />
            <StyledTableCell align="center" />
            <>
              {role === 'administrador' && ( // Ajusta espaço da tabela do Administrador
                <StyledTableCell align="center" />
              )}
            </>
            <>
              {(role === 'administrador' || role === 'gerente') && ( // Ajusta espaço da tabela do Administrador e Gerente
                <StyledTableCell align="center" />
              )}
            </>
          </TableRow>
        </TableHead>
        <TableBody>
          {equipaments.map((equipaments, index) => {
            return (
              <StyledTableRow key={index + equipaments.id}>
                <StyledTableCell align="center" component="th">
                  {equipaments.tippingNumber}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {equipaments.serialNumber}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {equipaments.situacao}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {`${equipaments.unit.name} - ${equipaments.unit.localization}`}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {dateFormat(equipaments.acquisitionDate)}
                  {/* Corrige data que estava errada na tabela */}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {equipaments.type}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {equipaments.estado}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {equipaments.brand.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {equipaments.model}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {equipaments.processor}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {equipaments.storageType}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {equipaments.storageAmount}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {equipaments.ram_size}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {equipaments.screenType}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {equipaments.screenSize}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {equipaments.power}
                </StyledTableCell>
                <>
                  {(role === 'administrador' || role === 'gerente') && ( // Os perfis de administrador e de gerente irão ter acesso ao botão de edição do equipamento
                    <StyledTableCell align="center">
                      <EditButton disabled />
                    </StyledTableCell>
                  )}
                </>
                <>
                  {role === 'administrador' && ( // Apenas o perfil de administrador tem acesso ao botao de exluir o equipamento
                    <StyledTableCell align="center">
                      <Button disabled>
                        <DeleteIcon />
                      </Button>
                    </StyledTableCell>
                  )}
                </>
                <StyledTableCell align="center">
                  <ButtonDownloadEquipament disabled>
                    Baixar
                  </ButtonDownloadEquipament>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <ButtonReservEquipament disabled>
                    Reserva
                  </ButtonReservEquipament>
                </StyledTableCell>
              </StyledTableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
