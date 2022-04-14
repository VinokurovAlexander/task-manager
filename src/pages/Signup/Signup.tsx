import React from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Form } from 'components/Form';
import { useSharedWorker } from 'hooks/useSharedWorker';

const Signup = () => {
    const [notice, setNotice] = React.useState(null);
    const navigate = useNavigate();
    const worker = useSharedWorker();

    const handleSubmit = React.useCallback(
        formData => {
            const login = formData.get('login') as string;
            const password = formData.get('password') as string;

            worker?.port.postMessage({ type: 'signup', payload: { login, password } });
        },
        [worker]
    );

    React.useEffect(() => {
        worker?.port.addEventListener('message', e => {
            const { data } = e;

            if (data.type === 'success') {
                navigate('/profile');

                return;
            }

            if (data.type === 'error') {
                setNotice(data);
            }
        });
    }, [navigate, worker?.port]);

    return (
        <Container maxWidth='sm' sx={{ mt: 10 }}>
            <Form notice={notice} onSubmit={handleSubmit} btnText='Sign up'>
                <TextField label='Login' name='login' required />
                <TextField label='Password' name='password' required type='password' />
            </Form>
        </Container>
    );
};
export default Signup;
