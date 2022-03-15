import React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface IQuestion {
    text: string;
}

const Question: React.FC<IQuestion> = ({ text }) => (
    <>
        <Typography paragraph sx={{ mb: 0 }}>
            {text}
        </Typography>
        <TextField label='Answer' name='answer' required />
    </>
);

export default Question;
