import { useFormik } from "formik"
import { toast } from "react-toastify"
import { Box, Button, FormControl, MenuItem, Select, TextField } from '@mui/material'

import { Movement } from "../../utils/types"

interface TermProps {
    units: any
    setUnit: Function
    setDeliveryDate: Function
    isOpen: Boolean
    setIsOpen: Function
    movement: Movement
    generateTerm: Function
}

import './styles.css'

export default function TermModal({ units, setUnit, setDeliveryDate, isOpen, setIsOpen, generateTerm, movement }: TermProps) {
    const formik = useFormik({
        initialValues: {
            deliveryDate: new Date().toISOString().split('T')[0],
            unit: 'Órgão'
        },

        onSubmit: (values) => {
            if(['Órgão', ''].includes(values.unit))
                toast.error('Selecione um órgão.')

            else {
                setDeliveryDate(values.deliveryDate)
                setUnit(values.unit)
                setIsOpen(false)
    
                generateTerm(movement)
            }
        }
    })
    
    return (
        <div className="modal" style={{display: isOpen ? undefined : 'none'}}>
            <div className="overlay"></div>
            <div className="content">
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <Box>
                            <Select
                                id="unit"
                                name="unit"
                                value={formik.values.unit}
                                onChange={formik.handleChange}
                                sx={{width: '35ex'}}
                            >
                                <MenuItem value={'Órgão'}>
                                    <em>Órgão</em>
                                </MenuItem>

                                { units.map((unit: any) => {
                                    return (
                                        <MenuItem value={unit.name}>
                                            <em>{ unit.name }</em>
                                        </MenuItem>
                                    )
                                  })
                                }
                            </Select>
                        </Box>

                        <Box>
                            <TextField
                                id="deliveryDate"
                                name="deliveryDate"
                                label="Data de entrega"
                                type="date"
                                variant="outlined"
                                value={formik.values.deliveryDate}
                                onChange={formik.handleChange}
                                sx={{width: '100%', marginTop: '2em'}}
                            />
                        </Box>
                    </FormControl>

                    <Box>
                        <Button
                            onClick={() => setIsOpen(false)}
                        >Voltar</Button>
                        <Button
                            type="submit"
                            onClick={() => setIsOpen(false)}
                        >Gerar termo</Button>
                    </Box>
                </form>
            </div>
        </div>
    )
}
