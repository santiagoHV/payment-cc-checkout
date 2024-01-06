import { Button, TextField, Box, FormLabel, FormControl, Select, InputAdornment, MenuItem, Grid } from "@mui/material";
import React, { useState } from "react";
import "./styles/UserDataForm.css";

const UserDataForm = ({nextStep}) => {
    const [userData, setUserData] = useState({
        fullName: "",
        email: "",
        phone: "",
        country: "1",
    });

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = (event) => {
        if(!userData.fullName || !userData.email || !userData.phone) {
            alert("Please fill all the fields")
        } else {
            nextStep()
        }
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1},
            }}
            noValidate
            autoComplete="off"
            className="user-data-form"
        >
            <h2>
                <Button>{"<-"}</Button>
                Ingresa tus datos
            </h2>
            <FormControl className="form-control" >
                <FormLabel>Nombres y Apellidos</FormLabel>
                <TextField 
                    value={userData.fullName}
                    onChange={handleChange}
                    name="fullName"
                />
            </FormControl>
            <FormControl className="form-control" >
                <FormLabel>Correo electrónico</FormLabel>
                <TextField 
                    value={userData.email}
                    onChange={handleChange}
                    name="email"
                />
            </FormControl>
            <FormControl className="form-control" >
                <FormLabel>Celular o Número telefónico</FormLabel>
                <Grid container>
                    <Grid item xs={3}>
                        <Select
                            name="country"
                            onChange={handleChange}
                            value={userData.country}
                        >
                            <MenuItem value="1">+1</MenuItem>
                            <MenuItem value="44">+44</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField 
                            fullWidth
                            value={userData.phone}
                            onChange={handleChange}
                            name="phone"
                        />
                    </Grid>
                </Grid>
            </FormControl>
            <Button variant="contained" onClick={nextStep}>Continua con tu pago</Button>
        </Box>
    );
}

export default UserDataForm;