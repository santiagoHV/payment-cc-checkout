import { Button, Grid, TextField, FormControl, FormLabel, Select, MenuItem, Box } from "@mui/material";
import React from "react";
import "./styles/CreditCardForm.css";
import { useSelector } from "react-redux";

const months = [1,2,3,4,5,6,7,8,9,10,11,12]
const years = [2021,2022,2023,2024,2025,2026,2027,2028,2029,2030]
const identificationTypes = ["CC", "CE", "TI", "PPN"]

const CreditCardForm = ({onConfirmPayment, onChange}) => {
    const cardData = useSelector(state => state.paymentReducer.cardData)


    const handleSubmit = () => {
        if(!cardData.cardNumber || !cardData.cardHolder || !cardData.expirationMonth || !cardData.cvc) {
            alert("Please fill all the fields")
        } else {
            onConfirmPayment()
        }
    }

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
        >
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
                            onChange={onChange}
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
                                    onChange={onChange}
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
                                    onChange={onChange}
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
                        <FormLabel>CVC (Codigo de seguridad)</FormLabel>
                        <TextField 
                            value={cardData.cvc}
                            onChange={onChange}
                            name="cvc"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className="form-control" >
                        <FormLabel>Nombre en la tarjeta</FormLabel>
                        <TextField 
                            value={cardData.cardHolder}
                            onChange={onChange}
                            name="cardHolder"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormLabel>Identificación del tarjetabiente</FormLabel>
                    <Grid container spacing={1}>
                        <Grid item xs={3}>
                            <FormControl className="form-control" >
                                <Select
                                    onChange={onChange}
                                    value={cardData.indentificationType}
                                    name="indentificationType"
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
                                onChange={onChange}
                                name="identificationNumber"
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
                            onChange={onChange}
                            name="cuoteNumber"
                            type="number"
                        />
                    </FormControl>
                </Grid>
            </Grid>

            <Button variant="contained" onClick={handleSubmit}>Finalizar pago</Button>
        </Box>
    );
}

export default CreditCardForm;