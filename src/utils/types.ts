export interface Movement {
    id: string
    date: Date
    userId: string
    equipments: any[]
    type: number
    inChargeName: string
    inChargeRole: string
    chiefName: string
    chiefRole: string
    equipmentSnapshots?: any
    description?: string
    destination?: any
}
