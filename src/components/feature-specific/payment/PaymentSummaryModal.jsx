import { Container, Divider } from "@mui/material";
import React from "react";
import Modal from "../../../components/common/Modal";

const PaymentSummaryModal = ({onClose, open, data}) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Container>
                <h3>RESUMEN DE COMPRA</h3>
                <p>Product: {data.product}</p>
                <Divider />
                <p>Precio Base: {data.basePrice}$</p>
                <p>IVA: ${data.iva}</p>
                <p>Total: ${data.total}</p>
                <p>¡Compra completa!</p>
                <p>Nos contactaremos pronto contigo para informar los detalles de envío</p>
            </Container>           
        </Modal>
    );
}

export default PaymentSummaryModal