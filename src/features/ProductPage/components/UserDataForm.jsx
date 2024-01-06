import { Button, TextField, Box } from "@mui/material";
import React, { useState } from "react";

const UserDataForm = ({nextStep}) => {
    const [userData, setUserData] = useState({
        fullName: "",
        email: "",
        phone: "",
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
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <h1>User Data Form</h1>
            <TextField 
                label="Nombre completo"
                value={userData.fullName}
                onChange={handleChange}
                name="fullName"
            />
            <TextField 
                label="Correo electrónico"
                value={userData.email}
                onChange={handleChange}
                name="email"
            />
            <TextField 
                label="Teléfono"
                value={userData.phone}
                onChange={handleChange}
                name="phone"
            />
            <Button onClick={nextStep}>Next</Button>
        </Box>
    );
}

export default UserDataForm;