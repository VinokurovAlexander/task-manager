import React from 'react';
import ModalUI, { ModalProps } from '@mui/material/Modal';
import Box from '@mui/material/Box';

export const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    backgroundColor: 'white',
    p: 4,
};

const Modal: React.FC<ModalProps> = ({ children, ...props }) => (
    <ModalUI {...props}>
        <Box sx={modalStyle}>{children}</Box>
    </ModalUI>
);

export default Modal;
