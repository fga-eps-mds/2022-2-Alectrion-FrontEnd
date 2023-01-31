/* eslint-disable no-unused-vars */
import { Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import api from "../../api/config";
import RegisterOrderServiceForm from "../../components/register-order-service-form";
import { AuthContext } from "../../contexts/auth";
import { Container } from "../user-register/styles";
import { toast } from 'react-toastify'


export type Equipment = {
    id: string;
    tippingNumber: string;
    serialNumber: string;
    type: string;
    situacao: string;
    model: string;
    description: string;
    initialUseDate: string;
    screenSize: string;
    invoiceNumber: string;
    power?: string;
    screenType?: string;
    processor: string;
    storageType: string;
    storageAmount: string;
    ram_size: string;
    createdAt: string;
    updatedAt: string;
};

const OrderRegister = () => {
    const [equipment, setEquipment] = useState<Equipment | undefined>(
        undefined
    );
    const [units, setUnits] = useState<
        { id: string; name: string; localization: string }[] | undefined
    >(undefined);

    const fetchUnits = async () => {
        try{
            const {
                data,
            }: AxiosResponse<{ id: string; name: string; localization: string }[]> =
                await api.get(`equipment/getAllUnits`);
            setUnits(data);
        } catch (error) {
            toast.error('Aconteceu algum erro.')
        }
        
    };

    useEffect(() => {
        fetchUnits();
    }, []);

    const fetchEquipment = async (tippingNumber: string) => {
        try{
            const { data }: AxiosResponse<Equipment> = await api.get(
                `equipment/listOne/?tippingNumber=${tippingNumber}`
            );

            setEquipment(data);
        } catch (error) {
            toast.error('Aconteceu algum erro.')
        }
    };

    const handleTippingNumberChange = (data: string) => {
        if (data.length) {
            fetchEquipment(data);
        }
    };

    const { user } = useContext(AuthContext);

    return (
        <Container>
            <>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    Cadastro de Ordem de Serviço
                </Typography>
                <RegisterOrderServiceForm
                    units={units}
                    initialData={equipment}
                    user={{
                        token: user?.token ?? "",
                        name: user?.name ?? "",
                    }}
                    handleTippingNumberChange={handleTippingNumberChange}
                />{" "}
            </>
        </Container>
    );
};
export default OrderRegister;
