import React from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LinkUI from '@mui/material/Link';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'components/Form';
import { useError } from 'hooks/useError';

const Login = () => {
    const navigate = useNavigate();
    const { errorMessage, setError } = useError();

    const handleSubmit = React.useCallback(
        formData => {
            const login = formData.get('login') as string;
            const password = formData.get('password') as string;

            axios
                .post('/login', { login, password })
                .then(() => {
                    navigate('/dashboard');
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
                btnText='Sign in'
            >
                <TextField label='Login' name='login' required />
                <TextField
                    label='Password'
                    name='password'
                    required
                    type='password'
                />
            </Form>
            <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}
            >
                <Link to='/recovery'>
                    <LinkUI variant='body2'>Forgot password?</LinkUI>
                </Link>
                <Link to='/signup'>
                    <LinkUI variant='body2'>
                        Don`t have an account? Sign up
                    </LinkUI>
                </Link>
            </Box>
        </Container>
    );
};

export default Login;
