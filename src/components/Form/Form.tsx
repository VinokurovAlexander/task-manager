import React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

export interface IForm {
    onSubmit?: (formData: FormData) => void;
    error?: string;
    btnText?: string;
}

const Form: React.FC<IForm> = ({
    btnText = 'Submit',
    error,
    children,
    onSubmit,
}) => {
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        onSubmit?.(formData);
    };

    return (
        <Box
            component='form'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
            }}
            onSubmit={handleSubmit}
        >
            {error && <Alert severity='error'>{error}</Alert>}
            {children}
            <Button type='submit' variant='contained'>
                {btnText}
            </Button>
        </Box>
    );
};

export default Form;
