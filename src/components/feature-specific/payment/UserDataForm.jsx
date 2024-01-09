import { Button, TextField, Box, FormLabel, FormControl, Select, InputAdornment, MenuItem, Grid } from "@mui/material";
import React, {useState} from "react";
import "./styles/UserDataForm.css";
import { useSelector } from "react-redux";

//paises latinos
const countries = [
    {
        name: "Perú",
        code: "51"
    },
    {
        name: "Colombia",
        code: "57"
    },
    {
        name: "México",
        code: "52"
    },
    {
        name: "Argentina",
        code: "54"
    },
    {
        name: "Chile",
        code: "56"
    },
    {
        name: "Ecuador",
        code: "593"
    },
    {
        name: "Bolivia",
        code: "591"
    },
    {
        name: "Costa Rica",
        code: "506"
    },
    {
        name: "Cuba",
        code: "53"
    }
]


const UserDataForm = ({onNextStep, onChange}) => {
    const userData = useSelector(state => state.paymentReducer.userData)
    const [errors, setErrors] = useState({})

    
    const handleSubmit = () => {
        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length === 0) {
            onNextStep();
        } else {
            setErrors(validationErrors);
        }
    }

    const validateFields = () => {
        const errors = {}

        if(!userData.fullName) {
            errors.fullName = "El nombre es requerido"
        }

        if(!userData.email) {
            errors.email = "El email es requerido"
        }else if (!isValidEmail(userData.email)) {
            errors.email = "Email electrónico no es válido";
        }

        if(!userData.phone) {
            errors.phone = "El teléfono es requerido"
        }

        if(!userData.country) {
            errors.country = "El país es requerido"
        }

        return errors
    }

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }

    const handleFieldChange = (event) => {
        onChange(event);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [event.target.name]: undefined,
        }));
    }


    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
        >
            <h2>
                <Button>{"<-"}</Button>
                Ingresa tus datos
            </h2>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <FormControl className="form-control" >
                        <FormLabel>Nombres y Apellidos</FormLabel>
                        <TextField 
                            value={userData.fullName}
                            onChange={handleFieldChange }
                            name="fullName"
                            error={!!errors.fullName}
                            helperText={errors.fullName}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className="form-control" >
                        <FormLabel>Correo electrónico</FormLabel>
                        <TextField 
                            value={userData.email}
                            onChange={handleFieldChange}
                            name="email"
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormLabel>Celular o Número telefónico</FormLabel>
                    <Grid container spacing={1}>
                        <Grid item xs={3}>
                            <FormControl className="form-control" >
                                <Select
                                    name="country"
                                    onChange={handleFieldChange}
                                    value={userData.country}
                                    error={!!errors.country}
                                >
                                    {countries.map((country, index) => (
                                        <MenuItem key={index} value={country.code}>{country.code}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl className="form-control" >
                                <TextField 
                                    value={userData.phone}
                                    onChange={handleFieldChange}
                                    name="phone"
                                    error={!!errors.phone}
                                    helperText={errors.phone}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>                    
                </Grid>
            </Grid>
            
            
            
            <Button variant="contained" onClick={handleSubmit}>Continua con tu pago</Button>
        </Box>
    );
}

export default UserDataForm;