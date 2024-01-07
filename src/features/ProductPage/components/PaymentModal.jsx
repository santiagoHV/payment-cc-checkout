import React from "react";
import Modal from "../../../components/common/Modal";
import UserDataForm from "../../../components/feature-specific/payment/UserDataForm";
import CreditCardForm from "../../../components/feature-specific/payment/CreditCardForm";
import { CircularProgress } from "@mui/material";

const PaymentModal = ({
    open,
    onClose, 
    loading,
    paymentStep: currentStep,
    onNextStep,
    onBackStep,
    onChangePaymentUserData, 
    onChangePaymentCardData, 
    onConfirmPayment
}) => {
    
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <UserDataForm
                    onChange={onChangePaymentUserData}
                    onNextStep={onNextStep}
                    onBackStep={onBackStep}
                />
            case 2:
                return <CreditCardForm
                    onChange={onChangePaymentCardData}
                    onBackStep={onBackStep}
                    onConfirmPayment={onConfirmPayment}
                />
            default:
                return null
        }
    }

    return (
        <Modal open={open} onClose={onClose}>
            {loading ?
                <CircularProgress
                    color="inherit"
                    size={70}
                    sx={{
                        position: "fixed",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 2
                    }}
                /> :
                renderStepContent()
            }
        </Modal>
    );
}

export default PaymentModal