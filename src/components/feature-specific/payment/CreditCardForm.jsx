import { Button, Grid, TextField, FormControl, FormLabel, Select, MenuItem } from "@mui/material";
import React, {useState} from "react";
import "./styles/CreditCardForm.css";

const months = [1,2,3,4,5,6,7,8,9,10,11,12]
const years = [2021,2022,2023,2024,2025,2026,2027,2028,2029,2030]
const identificationTypes = ["CC", "CE", "TI", "PPN"]

const CreditCardForm = ({onConfirmPayment}) => {
    const [cardData, setCardData] = useState({
        cardNumber: "",
        cardHolder: "",
        expirationMonth: 1,
        expirationYear: 2025,
        cvv: "",
        indentificationType: "CC",
        identificationNumber: "",
        cuoteNumber: "",
        acceptPolicy: false,
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
            <h2>
                Paga con tu tarjeta
            </h2>
            <b>Aceptamos</b>
            <img src="" alt="payment methods" />
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <FormControl className="form-control" >
                        <FormLabel>Número de tarjeta</FormLabel>
                        <TextField 
                            label=""
                            value={cardData.cardNumber}
                            onChange={handleChange}
                            name="cardNumber"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={5}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <FormControl className="form-control">
                                <FormLabel>Expira el</FormLabel>
                                <Select
                                    name="expirationMonth"
                                    onChange={handleChange}
                                    value={cardData.expirationMonth}
                                >
                                    {months.map((month) => (
                                        <MenuItem 
                                            value={month}
                                            key={month}
                                        >
                                                {month}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl className="form-control" >
                                <FormLabel>&nbsp;</FormLabel>
                                <Select 
                                    name="expirationYear"
                                    onChange={handleChange}
                                    value={cardData.expirationYear}
                                    placeholder="Año"
                                >
                                    {years.map((year) => (
                                        <MenuItem value={year} key={year}>
                                            {year}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={7}>
                    <FormControl className="form-control" >
                        <FormLabel>CVV (Codigo de seguridad)</FormLabel>
                        <TextField 
                            value={cardData.cvv}
                            onChange={handleChange}
                            name="cardNumber"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className="form-control" >
                        <FormLabel>Nombre en la tarjeta</FormLabel>
                        <TextField 
                            value={cardData.cardHolder}
                            onChange={handleChange}
                            name="cardNumber"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormLabel>Identificación del tarjetabiente</FormLabel>
                    <Grid container spacing={1}>
                        <Grid item xs={3}>
                            <FormControl className="form-control" >
                                <Select
                                    name="expirationMonth"
                                    onChange={handleChange}
                                    value={cardData.indentificationType}
                                >
                                    {identificationTypes.map((type) => (
                                        <MenuItem value={type} key={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl className="form-control" >
                            <TextField 
                                fullWidth
                                value={cardData.identificationNumber}
                                onChange={handleChange}
                                name="cardNumber"
                            />
                            </FormControl>
                        </Grid>
                    </Grid>               
                </Grid>
                <Grid item xs={12}>
                    <FormControl className="form-control" >
                        <FormLabel>Número de cuotas</FormLabel>
                        <TextField 
                            value={cardData.cuoteNumber}
                            onChange={handleChange}
                            name="cardNumber"
                            type="number"
                        />
                    </FormControl>
                </Grid>
            </Grid>

            <Button variant="contained" onClick={handleSubmit}>Finalizar pago</Button>
        </div>
    );
}

export default CreditCardForm;