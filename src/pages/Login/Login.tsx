import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LinkUI from '@mui/material/Link';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'components/Form';
import { useSharedWorker } from 'hooks/useSharedWorker';

const Login = () => {
    const navigate = useNavigate();
    const [notice, setNotice] = React.useState(null);
    const worker = useSharedWorker();

    const handleSubmit = React.useCallback(
        formData => {
            const login = formData.get('login') as string;
            const password = formData.get('password') as string;

            worker?.port.postMessage({ type: 'signin', payload: { login, password } });
        },
        [worker]
    );

    React.useEffect(() => {
        worker?.port.addEventListener('message', e => {
            const { data } = e;

            if (data.type === 'success') {
                navigate('/dashboard');

                return;
            }

            if (data.type === 'error') {
                setNotice(data);
            }
        });
    }, [navigate, worker]);

    return (
        <Container maxWidth='sm' sx={{ mt: 10 }}>
            <Form notice={notice} onSubmit={handleSubmit} btnText='Sign in'>
                <TextField label='Login' name='login' required />
                <TextField label='Password' name='password' required type='password' />
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
