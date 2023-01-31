import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../../api/config";
import { Button } from "../button";
import {
    Container,
    StyledCard,
    StyledForm,
    StyledTextField,
    FormContainer,
    ButtonContainer,
    StyledTextArea,
    StyledInputLabel,
    StyledSelect,
} from "./styles";
import { theme } from "../../styles/theme";
import { Equipment, OrderService } from "../../pages/order-service-update";
import { FormControl, MenuItem } from "@mui/material";

type Props = {
    order: OrderService;
    user: {
        name: string;
        token: string;
    };
    initialData: Equipment | undefined;
    handleTippingNumberChange: (data: string) => void;
    units: { id: string; name: string; localization: string }[] | undefined;
};

const OrderServiceUpdateForm = ({
    order,
    initialData,
    user,
    handleTippingNumberChange,
    units,
}: Props) => {
    const navigate = useNavigate();
    const validationSchema = yup.object().shape({
        authorFunctionalNumber: yup
            .string()
            .trim()
            .required("Esse campo é obrigatório"),
        senderName: yup.string().trim().required("Esse campo é obrigatório"),
        senderFunctionalNumber: yup
            .string()
            .trim()
            .required("Esse campo é obrigatório"),
        date: yup
            .date()
            .required("Esse campo é obrigatório"),
        tippingNumber: yup.string().trim().required("Esse campo é obrigatório"),
        status: yup.string().trim(),
        productType: yup.string().trim(),
        description: yup.string().trim().max(250),
        receiverName: yup.string().trim(),
        receiverFunctionalNumber: yup.string(),
        receiverDate: yup.date().nullable(),
        technicians: yup.string().nullable(),
    });
    const formik = useFormik({
        initialValues: {
            tippingNumber: order.equipment.tippingNumber,
            productType: order.equipment.type,
            senderName: order.senderName,
            senderFunctionalNumber: order.senderFunctionalNumber,
            date: order.date,
            userName: user.name,
            authorFunctionalNumber: order.senderFunctionalNumber,
            receiverName: order.receiverName,
            receiverFunctionalNumber: order.receiverFunctionalNumber, 
            receiverDate: (new Date(order.receiverDate) < new Date(order.date)) ? null : order.receiverDate,
            status: order.status, 
            technicians: order.technicians.toString(),
            description: order.description
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                console.log(formik)
                await api.put(
                    `equipment/updateOrderService`,
                    {
                        id: order.id,
                        equipmentId: order.equipment.id,
                        userId: user.token,
                        receiverName: formik.values.receiverName,
                        authorFunctionalNumber: formik.values.authorFunctionalNumber,
                        senderName: formik.values.senderName,
                        senderFunctionalNumber: formik.values.senderFunctionalNumber,
                        description: formik.values.description,
                        date: order.date,
                        recieverFunctionalNumber: formik.values.receiverFunctionalNumber,
                        status: formik.values.status,
                        techinicias: formik.values.technicians.split(','),
                        recieverDate: formik.values.receiverDate || null,
                    }
                );

                toast.success("Ordem de Serviço Atualizada.");
                navigate("/order-services");
            } catch (error) {
                console.log(`erro: ${error}`);
                toast.error("Error ao alterar O.S.");
            }
        },
    });
    console.log(formik)
    return (
        <Container>
            <StyledCard>
                <StyledForm onSubmit={formik.handleSubmit}>
                    <FormContainer>
                        <StyledTextField
                            id="tippingNumber-input"
                            data-testid="tippingNumber-input"
                            label="N° Tombamento"
                            type="text"
                            name="tippingNumber"
                            variant="outlined"
                            disabled
                            fullWidth
                            onChange={(ev) => {
                                formik.setFieldValue(
                                    "tippingNumber",
                                    ev.target.value
                                );
                                handleTippingNumberChange(ev.target.value);
                            }}
                            value={formik.values.tippingNumber}
                            helperText={
                                formik.touched.tippingNumber &&
                                formik.errors.tippingNumber
                            }
                            error={
                                formik.touched.tippingNumber &&
                                Boolean(formik.errors.tippingNumber)
                            }
                        />
                        <FormControl>
                            <StyledInputLabel id="status-select-label">
                                Status da Ordem de Serviço
                            </StyledInputLabel>
                            <StyledSelect
                                id="status-select-label"
                                labelId="status-select-label"
                                data-testid="status-select"
                                label="Status da O.S."
                                type="text"
                                name="status"
                                variant="outlined"
                                error={
                                    formik.touched.status &&
                                    Boolean(formik.errors.status)
                                }
                                onChange={formik.handleChange}
                                value={formik.values.status}
                            >
                                <MenuItem value="MAINTENANCE">
                                    Em Manuntenção
                                </MenuItem>
                                <MenuItem value="WARRANTY">Garantia</MenuItem>
                                <MenuItem value="CONCLUDED">Concluída</MenuItem>
                                <MenuItem value="CANCELED">Cancelado</MenuItem>
                            </StyledSelect>
                        </FormControl>
                        <StyledTextField
                            InputLabelProps={{ shrink: true }}
                            id="productType-input"
                            label="Tipo de equipamento"
                            type="text"
                            fullWidth
                            disabled
                            name="productType"
                            variant="outlined"
                            aria-readonly
                            value={formik.values.productType}
                            helperText={
                                formik.touched.productType &&
                                formik.errors.productType
                            }
                            error={
                                formik.touched.productType &&
                                Boolean(formik.errors.productType)
                            }
                        />
                    </FormContainer>

                    <FormContainer>
                        <StyledTextField
                            id="senderName-select-label"
                            data-testid="senderName-select"
                            label="Nome do Entregador"
                            type="text"
                            name="senderName"
                            fullWidth
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.senderName}
                            helperText={
                                formik.touched.senderName &&
                                formik.errors.senderName
                            }
                            error={
                                formik.touched.senderName &&
                                Boolean(formik.errors.senderName)
                            }
                        />
                        <StyledTextField
                            aria-readonly
                            id="senderFunctionalNumber-input"
                            label="N° Funcional do Entregador"
                            type="text"
                            fullWidth
                            name="senderFunctionalNumber"
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.senderFunctionalNumber}
                            helperText={
                                formik.touched.senderFunctionalNumber &&
                                formik.errors.senderFunctionalNumber
                            }
                            error={
                                formik.touched.senderFunctionalNumber &&
                                Boolean(formik.errors.senderFunctionalNumber)
                            }
                        />
                        <StyledTextField
                            InputLabelProps={{ shrink: true }}
                            id="data-input"
                            label="Data"
                            type="date"
                            name="date"
                            disabled
                            fullWidth
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.date}
                            helperText={
                                formik.touched.date && formik.errors.date
                            }
                            error={
                                formik.touched.date &&
                                Boolean(formik.errors.date)
                            }
                        />
                    </FormContainer>

                    <FormContainer>
                        <StyledTextField
                            aria-readonly
                            id="brand-input"
                            label="Nome do Recebedor"
                            type="text"
                            name="receiverName"
                            fullWidth
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.receiverName}
                            helperText={
                                formik.touched.receiverName &&
                                formik.errors.receiverName
                            }
                            error={
                                formik.touched.receiverName &&
                                Boolean(formik.errors.receiverName)
                            }
                        />
                        <StyledTextField
                            aria-aria-readonly
                            label="N° Funcional do Recebedor"
                            type="text"
                            name="receiverFunctionalNumber"
                            variant="outlined"
                            fullWidth
                            onChange={formik.handleChange}
                            value={formik.values.receiverFunctionalNumber}
                            helperText={
                                formik.touched.receiverFunctionalNumber &&
                                formik.errors.receiverFunctionalNumber
                            }
                            error={
                                formik.touched.receiverFunctionalNumber &&
                                Boolean(formik.errors.receiverFunctionalNumber)
                            }
                        />
                        <StyledTextField
                            InputLabelProps={{ shrink: true }}
                            id="reciver-data-input"
                            label="Data de recebimento"
                            type="date"
                            name="receiverDate"
                            fullWidth
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.receiverDate}
                            helperText={
                                formik.touched.receiverDate && formik.errors.receiverDate
                            }
                            error={
                                formik.touched.receiverDate &&
                                Boolean(formik.errors.date)
                            }
                        />
                    </FormContainer>

                    <FormContainer>
                        <StyledTextField
                            label="Técnicos"
                            id="technicians-input"
                            type="text"
                            name="technicians"
                            fullWidth
                            variant="outlined"
                            placeholder="Maria, João, Pedro"
                            onChange={formik.handleChange}
                            value={formik.values.technicians}
                            helperText={
                                formik.touched.technicians &&
                                formik.errors.technicians
                            }
                            error={
                                formik.touched.technicians &&
                                Boolean(formik.errors.technicians)
                            }
                        />
                    </FormContainer>

                    <StyledTextArea
                        label="Descrição"
                        data-testid="description-input"
                        name="description"
                        multiline
                        rows={2}
                        maxRows={4}
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        helperText={
                            formik.touched.description &&
                            formik.errors.description
                        }
                        error={
                            formik.touched.description &&
                            Boolean(formik.errors.description)
                        }
                    />

                <ButtonContainer>
                        <Button
                        variant="contained"
                        styledColor={theme.palette.grey[100]}
                        textColor={theme.palette.grey[900]}
                        onClick={() => navigate('/order-services')}>
                        Voltar
                        </Button>{' '}
                        <Button
                        variant="contained"
                        data-testid="update-button"
                        type="submit"
                        styledColor={theme.palette.primary.main}>
                        Atualizar
                        </Button>
                    </ButtonContainer>
                </StyledForm>
            </StyledCard>
        </Container>
    );
};
export default OrderServiceUpdateForm;