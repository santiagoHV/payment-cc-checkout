import React, { useState } from "react";
import Modal from "../../../components/common/Modal";
import UserDataForm from "./UserDataForm";
import CreditCardForm from "./CreditCardForm";

const PaymentModal = ({open, onClose, onConfirmPayment}) => {
    const [currentStep, setCurrentStep] = useState(1)

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1)
    }

    const handleConfirmPayment = () => {
        setCurrentStep(1)
        onConfirmPayment()
        onClose()
    }

    
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <UserDataForm nextStep={handleNextStep} />
            case 2:
                return <CreditCardForm onConfirmPayment={handleConfirmPayment} />
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