import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Form } from 'components/Form';
import { useError } from 'hooks/useError';

const Signup = () => {
    const navigate = useNavigate();
    const { errorMessage, setError } = useError();

    const handleSubmit = React.useCallback(
        formData => {
            const login = formData.get('login') as string;
            const password = formData.get('password') as string;

            axios
                .post('/signup', { login, password })
                .then(() => {
                    navigate('/profile');
                })
                .catch(e => {
                    setError(e.response.data);
                });
        },
        [navigate, setError]
    );

    return (
        <Container maxWidth='sm' sx={{ mt: 10 }}>
            <Form
                error={errorMessage}
                onSubmit={handleSubmit}
                btnText='Sign up'
            >
                <TextField label='Login' name='login' required />
                <TextField
                    label='Password'
                    name='password'
                    required
                    type='password'
                />
            </Form>
        </Container>
    );
};
export default Signup;
