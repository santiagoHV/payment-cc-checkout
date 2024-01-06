import { Button, TextField, Box, FormLabel, FormControl, Select, InputAdornment, MenuItem, Grid } from "@mui/material";
import React from "react";
import "./styles/UserDataForm.css";
import { useSelector } from "react-redux";

const UserDataForm = ({onNextStep, onChange}) => {
    const userData = useSelector(state => state.paymentReducer.userData)

    
    const handleSubmit = () => {
        if(!userData.fullName || !userData.email || !userData.phone) {
            alert("Please fill all the fields")
        } else {
            onNextStep()
        }
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
                            onChange={onChange}
                            name="fullName"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className="form-control" >
                        <FormLabel>Correo electrónico</FormLabel>
                        <TextField 
                            value={userData.email}
                            onChange={onChange}
                            name="email"
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
                                    onChange={onChange}
                                    value={userData.country}
                                >
                                    <MenuItem value="1">+1</MenuItem>
                                    <MenuItem value="44">+44</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl className="form-control" >
                                <TextField 
                                    value={userData.phone}
                                    onChange={onChange}
                                    name="phone"
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