import React, { useState } from "react";
import Modal from "../../../components/common/Modal";
import UserDataForm from "../../../components/feature-specific/payment/UserDataForm";
import CreditCardForm from "../../../components/feature-specific/payment/CreditCardForm";

const PaymentModal = ({
    open,
    onClose, 
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
            {renderStepContent()}
        </Modal>
    );
}

export default PaymentModal