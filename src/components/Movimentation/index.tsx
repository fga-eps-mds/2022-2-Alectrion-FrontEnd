import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useEffect, useCallback, useState } from "react";
import { StyledTableCell, StyledTableRow, ButtonDownloadEquipament, ButtonReservEquipament, StyledTableCell2, StyledTableRow2 } from './styles'
import { Box, Button, Collapse, IconButton, Typography } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import api from '../../api/config'
import { toast } from 'react-toastify'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { width } from '@mui/system'

import Term from '../Term'

import { Movement } from '../../utils/types'
import TermModal from '../TermModal'

interface propType {
  movements: Movement[]
  setMovements: Function
}

const TYPES = [
  'Empréstimo',
  'Baixa',
  'Responsabilidade'
]

export default function MovimentTables({movements, setMovements}: propType) {
  const [ movement, setMovement ] = useState<Movement>({
    id: '',
    date: new Date(),
    userId: '',
    equipments: [],
    type: 0,
    inChargeName: '',
    inChargeRole: '',
    chiefName: '',
    chiefRole: ''
  })
  const [ auxMovement, setAuxMovement ] = useState<Movement>({
    id: '',
    date: new Date(),
    userId: '',
    equipments: [],
    type: 0,
    inChargeName: '',
    inChargeRole: '',
    chiefName: '',
    chiefRole: ''
  })
  const [ unit, setUnit ] = useState<string>('')
  const [ units, setUnits ] = useState<any[]>([])
  const [ deliveryDate, setDeliveryDate ] = useState<any>('')
  const [ isTermModalOpen, setIsTermModalOpen ] = useState<boolean>(false)

  async function deleteMovement() {
    try {
      const { data } = await api.delete('equipment/deleteMovement',
      {
        params: {
          id: movements[0].id
        }
      })
  
      if(data.error)
        toast.error('Tempo limite de exclusão excedido.')
      else {
        const updatedMovements = [...movements]
        updatedMovements.shift()
  
        setMovements(updatedMovements)
        toast.success('Movimentação excluída com sucesso.')
      }
    } catch(e: any) {
        if(e.response.status == 401)
          toast.error('Tempo limite de exclusão excedido.')
        else
          toast.error(e.response.data.error)
    }
  }
  const [open,setOpen] = useState(-1);
  

  async function generateTerm(movement: Movement) {
    setMovement(movement)
  }

  function openTermModal(movement: Movement) {
    setAuxMovement(movement)
    setIsTermModalOpen(true)
  }

  useEffect(() => {
    async function getUnits() {
      try {
        const { data } = await api.get('equipment/getAllUnits')
  
        if(data.error) {
          toast.error(data.error)
          setUnits([])
        }
  
        else
          setUnits(data)
      } catch(e: any) {
        toast.error(e.response.data.error)
      }
    }

    getUnits()
  }, [])

  return (
    <>
      <TableContainer
        sx={{
          minWidth: '80%',
          margin: '0 auto',
          maxWidth: '1180px',
          textAlign: 'center'
        }}
        component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" />
              <StyledTableCell align="center">ID </StyledTableCell>
              <StyledTableCell align="center">Tipo</StyledTableCell>
              <StyledTableCell align="center">Unidade destino</StyledTableCell>
              <StyledTableCell align="center">Quantidade</StyledTableCell>
              <StyledTableCell align="center" />
              <StyledTableCell align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {movements.map((movement, index) => {
              return (
                <>
                  <StyledTableRow key={index + movement.id}>
                    <StyledTableCell align="center" onClick={() => setOpen(open === index ? -1 : index)}>
                      {open === index ? (
                        <KeyboardArrowDownIcon />
                      ) : (
                        <KeyboardArrowRightIcon />
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th">
                      {movement.id}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {TYPES[movement.type]}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {movement.destination ? movement.destination.name : '-'}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {movement.equipments.length}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton aria-label="pdf" size="large" onClick={() => {openTermModal(movement)}}>
                          <PictureAsPdfIcon />
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton aria-label="delete" size="large" disabled={index != 0} onClick={() => deleteMovement()}>
                        <DeleteForeverIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow2>
                    <StyledTableCell colSpan={5} sx={{padding:0,paddingBottom: 0, paddingTop: 0, width:'100%'  }}>
                      <Collapse in={open === index} timeout="auto" unmountOnExit                         
                          sx={{
                            width: "100%",  
                            minHeight: 36,
                            fontSize: 18,
                            marginLeft:10
                          }}
                        >
                        <Box
                          sx={{
                            width: "100%",
                            backgroundColor: 'rgba(50,50,50,0.2)',
                            minHeight: 36,
                            textAlign: 'center',
                            alignItems: 'center',
                            fontSize: 22,
                          }}
                        >
                        Equipamentos
                        </Box>
                          <TableContainer aria-label="container2"
                            sx={{
                              minWidth: '100%',
                              margin: '0 ',
                              textAlign: 'center',
                            }}
                            component={Paper}>
                            <Table aria-label="customized table2">
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell2 align="center">N° Tombamento </StyledTableCell2>
                                  <StyledTableCell2 align="center">N° Série</StyledTableCell2>
                                  <StyledTableCell2 align="center">Situação</StyledTableCell2>
                                  <StyledTableCell2 align="center">Tipo de equipamento</StyledTableCell2>
                                  <StyledTableCell2 align="center">Localidade</StyledTableCell2>
                                </TableRow>
                              </TableHead>

                              <TableBody>
                                {movement.equipments.map((equipment) => {
                                  return (
                                    <StyledTableRow key={ equipment.id}>
                                      <StyledTableCell align="center" component="th">
                                        {equipment.tippingNumber}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        {equipment.serialNumber}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        {equipment.situacao}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        {equipment.type}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        {equipment.unit.name}
                                      </StyledTableCell>
                                    </StyledTableRow>
                                  )
                              })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Collapse>
                      </StyledTableCell>
                    </StyledTableRow2>
                  </>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TermModal units={units} setUnit={setUnit} setDeliveryDate={setDeliveryDate} isOpen={isTermModalOpen} setIsOpen={setIsTermModalOpen} generateTerm={generateTerm} movement={auxMovement} />

      <div style={{position: 'fixed', left: 0, top: 0, opacity: 0, pointerEvents: 'none'}}>
        <Term movement={movement} setMovement={setMovement} unit={unit} deliveryDate={deliveryDate} />
      </div>
    </>
  )
}
