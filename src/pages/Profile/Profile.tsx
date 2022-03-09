import React from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Avatar } from './components/Avatar';
import { Form } from 'components/Form';
import { useError } from 'hooks/useError';

const Profile = () => {
    const { setError, errorMessage } = useError();

    const handleSubmit = (formData: FormData) => {
        const name = formData.get('name');
        const surname = formData.get('surname');
        const recoveryQuestion = formData.get('recoveryQuestion');
        const recoveryAnswer = formData.get('recoveryAnswer');

        axios
            .post('/profile', {
                name,
                surname,
                recoveryQuestion,
                recoveryAnswer,
            })
            .then(() => {
                alert('ok');
            })
            .catch(e => {
                setError(e.response.data);
            });
    };

    return (
        <Container maxWidth='sm' sx={{ mt: 10 }}>
            <Typography variant='h3' sx={{ mb: 4 }}>
                Edit profile
            </Typography>
            <Form btnText='Save' onSubmit={handleSubmit} error={errorMessage}>
                <Avatar />
                <TextField name='name' label='Name' placeholder='Name' />
                <TextField
                    name='surname'
                    label='Surname'
                    placeholder='surname'
                />
                <TextField
                    name='recoveryQuestion'
                    label='Recovery question'
                    placeholder='Recovery question'
                    required
                />
                <TextField
                    name='recoveryAnswer'
                    label='Recovery answer'
                    placeholder='Recovery answer'
                    required
                />
            </Form>
        </Container>
    );
};
export default Profile;
