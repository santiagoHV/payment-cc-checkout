import { Button, Grid, TextField, FormControl, FormLabel, Select, MenuItem, Box } from "@mui/material";
import React, {useState} from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GppGoodIcon from '@mui/icons-material/GppGood';
import "./styles/CreditCardForm.css";
import { useSelector } from "react-redux";
import visaIcon from "../../../assets/img/visa.png";
import mastercardIcon from "../../../assets/img/mastercard.png";
import amexIcon from "../../../assets/img/amex.png";

const months = [1,2,3,4,5,6,7,8,9,10,11,12]
const years = [2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030]
const identificationTypes = ["CC", "CE", "TI", "PPN"]

const CreditCardForm = ({onConfirmPayment, onChange, onBackStep}) => {
    const cardData = useSelector(state => state.paymentReducer.cardData)
    const [errors, setErrors] = useState({})
    const [cardType, setCardType] = useState(null)
    const [ acceptTerms, setAcceptTerms ] = useState(false)

    const handleSubmit = () => {
        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length === 0) {
            onConfirmPayment();
        } else {
            setErrors(validationErrors);
        }
    }

    const handleFieldChange = (event) => {
        onChange(event);
        setErrors({
            ...errors,
            [event.target.name]: undefined,
        });
    }

    const handleCvcChange = (event) => {
        const newValue = event.target.value.replace(/\D/g, '');  // Quitar caracteres no numéricos
        const truncatedValue = newValue.slice(0, 3);  // Limitar a 3 caracteres
        onChange({
            target: { name: "cvc", value: truncatedValue },
          });
    };

    const handleCardNumberChange = (event) => {
        const newValue = event.target.value.replace(/\D/g, '');
        onChange({
            target: { name: "cardNumber", value: newValue },
        });
        setCardType(detectCardType(newValue));
    }

    const validateFields = () => {
        const validationErrors = {};

        if (!cardData.cardNumber || cardData.cardNumber.replace(/\s/g, "").length !== 16) {
            validationErrors.cardNumber = "El número de tarjeta es requerido";
        }

        if (!cardData.cardHolder) {
            validationErrors.cardHolder = "El nombre del tarjetahabiente es requerido";
        }

        if (!cardData.expirationMonth) {
            validationErrors.expirationMonth = "El mes de expiración es requerido";
        }

        if (!cardData.cvc || cardData.cvc.length !== 3 || !/^\d+$/.test(cardData.cvc)) {
            validationErrors.cvc = "El código de seguridad es requerido";
        }

        if(!cardData.indentificationType) {
            validationErrors.indentificationType = "El tipo de identificación es requerido";
        }

        if(!cardData.identificationNumber) {
            validationErrors.identificationNumber = "El número de identificación es requerido";
        }

        if(!cardData.cuoteNumber) {
            validationErrors.cuoteNumber = "El número de cuotas es requerido";
        }

        if(!acceptTerms) {
            validationErrors.acceptTerms = "Debes aceptar los términos y condiciones";
        }

        return validationErrors;
    }

    const formatCardNumber = (cardNumber) => {
        const cardNumberRegex = /\d{1,4}/g;
        const cardNumberParts = cardNumber.match(cardNumberRegex);

        if (cardNumberParts) {
            return cardNumberParts.join(" ");
        } else {
            return "";
        }
    }

    const detectCardType = (cardNumber) => {
        const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
        const mastercardRegex = /^5[1-5][0-9]{14}$/;
        const amexRegex = /^3[47][0-9]{13}$/;
        const discoverRegex = /^6(?:011|5[0-9]{2})[0-9]{12}$/;

        if (visaRegex.test(cardNumber)) {
            return "visa";
        } else if (mastercardRegex.test(cardNumber)) {
            return "mastercard";
        } else if (amexRegex.test(cardNumber)) {
            return "amex";
        } else {
            return null;
        }
    }

    const formattedCardNumber = formatCardNumber(cardData.cardNumber);

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
        >
            <h2>
                <Button className="back-step-button" onClick={onBackStep}>
                    <ArrowBackIcon style={{ color: '#DAF95F' }} />
                </Button>
                Paga con tu tarjeta
            </h2>
            <b>Aceptamos</b>
            
            <Grid container spacing={1}>
                <Grid item xs={5} >
                    <Box sx={{mb: 4}}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <img src={visaIcon} alt="Visa" className="card-type-icon" />
                            </Grid>
                            <Grid item xs={4}>
                                <img src={mastercardIcon} alt="Mastercard" className="card-type-icon" />
                            </Grid>
                            <Grid item xs={4}>
                                <img src={amexIcon} alt="American Express" className="card-type-icon" />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className="form-control" >
                        <FormLabel>Número de tarjeta</FormLabel>
                        <TextField 
                            label=""
                            value={formattedCardNumber}
                            onChange={handleCardNumberChange}
                            name="cardNumber"
                            error={!!errors.cardNumber}
                            helperText={errors.cardNumber}
                            InputProps={{
                                endAdornment: (
                                    cardType &&
                                    <img 
                                        src={
                                            cardType === "visa" ? visaIcon :
                                            cardType === "mastercard" ? mastercardIcon :
                                            cardType === "amex" ? amexIcon : null
                                        } 
                                        alt={cardType} 
                                        className="card-type-icon"
                                    />
                                ),
                            }}
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
                                    onChange={handleFieldChange}
                                    value={cardData.expirationMonth}
                                    placeholder="Mes"
                                    error={!!errors.expirationMonth}
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
                                    onChange={handleFieldChange}
                                    value={cardData.expirationYear}
                                    placeholder="Año"
                                    error={!!errors.expirationYear}
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
                            onChange={handleCvcChange}
                            name="cvc"
                            type="number"
                            inputMode="numeric" 
                            className="no-number-arrows"
                            error={!!errors.cvc}
                            helperText={errors.cvc}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className="form-control" >
                        <FormLabel>Nombre en la tarjeta</FormLabel>
                        <TextField 
                            value={cardData.cardHolder}
                            onChange={handleFieldChange}
                            name="cardHolder"
                            error={!!errors.cardHolder}
                            helperText={errors.cardHolder}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormLabel>Identificación del tarjetabiente</FormLabel>
                    <Grid container spacing={1}>
                        <Grid item xs={3}>
                            <FormControl className="form-control" >
                                <Select
                                    onChange={handleFieldChange}
                                    value={cardData.indentificationType}
                                    name="indentificationType"
                                    error={!!errors.indentificationType}
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
                                onChange={handleFieldChange}
                                name="identificationNumber"
                                type="number"
                                inputMode="numeric" 
                                className="no-number-arrows"
                                error={!!errors.identificationNumber}
                                helperText={errors.identificationNumber}
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
                            onChange={handleFieldChange}
                            name="cuoteNumber"
                            type="number"
                            error={!!errors.cuoteNumber}
                            helperText={errors.cuoteNumber}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className="form-control" >
                        <FormLabel className="accept-terms">
                            <input 
                                type="checkbox" 
                                checked={acceptTerms}
                                onChange={() => setAcceptTerms(!acceptTerms)}
                            />
                            <p>
                                Acepto haber leído los <b>términos y condiciones y la política de privacidad</b> para hacer este pago
                            </p>
                        </FormLabel>
                        {errors.acceptTerms && <p className="error">{errors.acceptTerms}</p>}
                    </FormControl>
                </Grid>
            </Grid>

            <div className="submit-button-container">
                <Button 
                    variant="contained" 
                    onClick={handleSubmit}>
                        <GppGoodIcon 
                            style={{ color: '#DAF95F' }} />
                        <span>Finalizar pago</span>
                        
                </Button>
            </div>
        </Box>
    );
}

export default CreditCardForm;