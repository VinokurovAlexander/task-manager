import React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/lab/LoadingButton';

export interface IForm {
    onSubmit?: (formData: FormData) => void;
    btnText?: string;
    loading?: boolean;
    notice?: { type: 'error' | 'warning' | 'info'; message: string } | null;
}

const Form: React.FC<IForm> = ({
    btnText = 'Submit',
    notice,
    children,
    onSubmit,
    loading = false,
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
            {notice && <Alert severity={notice.type}>{notice.message}</Alert>}
            {children}
            <Button type='submit' variant='contained' loading={loading}>
                {btnText}
            </Button>
        </Box>
    );
};

export default Form;
