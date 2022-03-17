import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LinkUI from '@mui/material/Link';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'components/Form';
import { api } from 'api';
import { useRequest } from 'hooks/useRequest';

const {
    auth: { signIn },
} = api;

const Login = () => {
    const navigate = useNavigate();
    const { notice, isTimeout, handleError } = useRequest();

    const auth = React.useCallback(
        (login: string, password: string) => {
            signIn(login, password)
                .then(() => {
                    navigate('/dashboard');
                })
                .catch(handleError);
        },
        [handleError, navigate]
    );

    const handleSubmit = React.useCallback(
        formData => {
            const login = formData.get('login') as string;
            const password = formData.get('password') as string;

            auth(login, password);
        },
        [auth]
    );

    return (
        <Container maxWidth='sm' sx={{ mt: 10 }}>
            <Form notice={notice} onSubmit={handleSubmit} btnText='Sign in' loading={isTimeout}>
                <TextField label='Login' name='login' required disabled={isTimeout} />
                <TextField label='Password' name='password' required type='password' disabled={isTimeout} />
            </Form>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <LinkUI variant='body2' component={Link} to='/recovery'>
                    Forgot password?
                </LinkUI>
                <LinkUI variant='body2' component={Link} to='/signup'>
                    Don`t have an account? Sign up
                </LinkUI>
            </Box>
        </Container>
    );
};

export default Login;
