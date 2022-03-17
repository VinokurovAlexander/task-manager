import React from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Form } from 'components/Form';
import { api } from 'api';
import { useRequest } from 'hooks/useRequest';

const {
    auth: { signUp },
} = api;

const Signup = () => {
    const navigate = useNavigate();
    const { notice, isTimeout, handleError } = useRequest();

    const handleSubmit = React.useCallback(
        formData => {
            const login = formData.get('login') as string;
            const password = formData.get('password') as string;

            signUp(login, password)
                .then(() => {
                    navigate('/profile');
                })
                .catch(handleError);
        },
        [navigate, handleError]
    );

    return (
        <Container maxWidth='sm' sx={{ mt: 10 }}>
            <Form notice={notice} onSubmit={handleSubmit} btnText='Sign up' loading={isTimeout}>
                <TextField label='Login' name='login' required disabled={isTimeout} />
                <TextField label='Password' name='password' required type='password' disabled={isTimeout} />
            </Form>
        </Container>
    );
};
export default Signup;
