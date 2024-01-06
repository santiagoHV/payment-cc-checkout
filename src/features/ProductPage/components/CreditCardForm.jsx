import { Button, TextField } from "@mui/material";
import React, {useState} from "react";

const CreditCardForm = ({onConfirmPayment}) => {
    const [cardData, setCardData] = useState({
        cardNumber: "",
        cardHolder: "",
        expirationDate: "",
        cvv: "",
    })

    const handleChange = (event) => {
        setCardData({
            ...cardData,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = (event) => {
        if(!cardData.cardNumber || !cardData.cardHolder || !cardData.expirationDate || !cardData.cvv) {
            alert("Please fill all the fields")
        } else {
            onConfirmPayment()
        }
    }

    return (
        <div>
            <h1>Credit Card Form</h1>
            <TextField 
                label="Número de tarjeta"
                value={cardData.cardNumber}
                onChange={handleChange}
                name="cardNumber"
            />
            <TextField 
                label="Nombre del titular"
                value={cardData.cardHolder}
                onChange={handleChange}
                name="cardHolder"
            />
            <TextField 
                label="Fecha de expiración"
                value={cardData.expirationDate}
                onChange={handleChange}
                name="expirationDate"
            />
            <TextField 
                label="CVV"
                value={cardData.cvv}
                onChange={handleChange}
                name="cvv"
            />
            <Button onClick={handleSubmit}>Submit</Button>s
        </div>
    );
}

export default CreditCardForm;