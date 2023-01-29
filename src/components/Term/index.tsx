import { useEffect, useState } from 'react'
import html2pdf from 'html2pdf.js'

import { Movement } from '../../utils/types'

import brasao from './assets/brasao.png'

import './css-reset.css'
import './styles.css'

export interface TermProps {
    movement: Movement
}

const TYPES = [
    'Empréstimo',
    'Baixa',
    'Responsabilidade'
]

export default function Term({ movement }: TermProps) {
    const [ now, setNow ] = useState<Date>(new Date())

    function getFormattedDate(date: Date) {
        const day = date.getDate().toLocaleString('pt-BR', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
        const month = (date.getMonth() + 1).toLocaleString('pt-BR', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
        const year = date.getFullYear().toLocaleString('pt-BR', {
            minimumIntegerDigits: 4,
            useGrouping: false
        })
        const hour = date.getHours().toLocaleString('pt-BR', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
        const minutes = date.getMinutes().toLocaleString('pt-BR', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
        const seconds = date.getSeconds().toLocaleString('pt-BR', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })

        return `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`
    }

    function generatePDF() {
        const term = document.getElementById('term')
        const options = {
        margin: 0,
        filename: 'termo.pdf',
        image: {
            type: 'jpeg',
            quality: 1
        },
        html2canvas: {
            scale: 2
        }
        }

        html2pdf().set(options).from(term).toPdf().get('pdf').then((pdf: any) => {
            window.open(pdf.output('bloburl'), '_blank')
        });
    }
    
    useEffect(() => {
        setNow(new Date())
    }, [movement])

    useEffect(() => {
        if(movement.id.length)
            generatePDF()
    }, [now])

    return (
        <div className="page" id="term">
            <div className="header">
                <img src={brasao} />
                <div>
                    <p>ESTADO DE GOIÁS</p>
                    <p>POLÍCIA CIVIL</p>
                    <p>DIVISÃO DE SUPORTE TÉCNICO EM INFORMÁTICA</p>
                </div>
            </div>

            <h1>TERMO DE { TYPES[movement.type].toUpperCase() }</h1>
            <h2>IDENTIFICADOR: { movement.id }</h2>

            <table className="content">
                <colgroup>
                    <col style={{width: '11.11%'}} />
                    <col style={{width: '11.11%'}} />
                    <col style={{width: '11.11%'}} />
                    <col style={{width: '16.66%'}} />
                    <col style={{width: '16.66%'}} />
                    <col style={{width: '33.33%'}} />
                </colgroup>

                <thead>
                    <tr className="emission">
                        <td colSpan={6}><span>Orgão:</span> 04° Delegacia Distrital</td>
                    </tr>

                    { movement.destination
                        ?   <tr><td colSpan={6}><span>Destino:</span> { movement.destination.name }</td></tr>
                        :   null
                    }
    
                    <tr className="emission">
                        <td colSpan={6}><span>Responsável:</span> { movement.inChargeName }</td>
                    </tr>
                    
                    <tr className="title">
                        <td colSpan={6}>ESPECIFICAÇÃO DO MATERIAL</td>
                    </tr>

                    <tr className="columns">
                        <th>APARELHO</th>
                        <th>MARCA</th>
                        <th>MODELO</th>
                        <th>TOMBAMENTO</th>
                        <th>SERIAL</th>
                        <th>DESCRIÇÃO</th>
                    </tr>
                </thead>

                <tbody>
                    { movement.equipments.map((equipment) => {
                        return (
                            <tr>
                                <td>{ equipment.type }</td>
                                <td>{ equipment.model }</td>
                                <td>{ equipment.model }</td>
                                <td>{ equipment.tippingNumber }</td>
                                <td>{ equipment.serialNumber }</td>
                                <td>{ equipment.description }</td>
                            </tr>
                        )
                      })
                    }
                </tbody>
            </table>
            
            <table className="signatures">
                <colgroup>
                    <col style={{width: '50%'}} />
                    <col style={{width: '50%'}} />
                </colgroup>

                <thead>
                    <tr>
                        <th>RECEBEDOR</th>
                        <th>ENTREGA</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>{ getFormattedDate(now) }</td>
                        <td>Em 24/12/2022</td>
                    </tr>

                    <tr className="space">
                        <td></td>
                        <td></td>
                    </tr>

                    <tr className="names">
                        <td>{ movement.chiefName }<br/>{ movement.chiefRole }</td>
                        <td>{ movement.inChargeName }<br/>{ movement.inChargeRole }</td>
                    </tr>
                </tbody>
            </table>

            <div className="footer">
                <p>Av. Anhanguera, n. 7.364 - Setor Aeroviário - Goiânia-GO CEP: 74.435-300</p>
                <p>Fone: (62) 3201-2549</p>
                <p>Site: www.policiacivil.go.gov.br</p>
                <p>Email: imprensa@policiacivil.go.gov.br</p>
            </div>
        </div>
    )
}