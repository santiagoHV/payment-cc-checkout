import React from "react";
import { Modal as ModalMaterial, Box } from "@mui/material";

const Modal = ({ open, children, onClose }) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 12,
        p: 4,
        overflow: "auto",
        "@media (max-width: 600px)": {
            width: "80vw",
            'max-height': "85vh"
        }
      };

    return (
        <ModalMaterial
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {children}
            </Box>
        </ModalMaterial>
    );
}

export default Modal