import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { useError } from 'hooks/useError';
import { Form } from 'components/Form';
import { Question } from './components/Question';
import { Password } from './components/Password';

interface IUser {
    id: string;
    recoveryQuestion?: string;
    recoveryToken?: string;
}

const Recovery = () => {
    const navigate = useNavigate();

    const { errorMessage, setError } = useError();
    const [user, setUser] = React.useState<IUser | null>(null);

    const isQuestion = user?.recoveryQuestion;
    const isRecoveryToken = user?.recoveryToken;

    const getUser = (login: string) => {
        axios
            .get('/recovery', { params: { login } })
            .then(response => {
                setUser(response.data);
            })
            .catch(e => {
                setError(e.response.data);
            });
    };

    const handleSubmit = (formData: FormData) => {
        setError(null);

        if (!user) {
            const login = formData.get('login') as string;

            getUser(login);

            return;
        }

        if (isRecoveryToken) {
            const password = formData.get('password') as string;

            axios
                .patch('/recovery', {
                    recoveryToken: user.recoveryToken,
                    password,
                    userId: user.id,
                })
                .then(() => {
                    navigate('/dashboard');
                })
                .catch(e => {
                    setError(e.respoonse.data);
                });

            return;
        }

        const answer = formData.get('answer') as string;

        axios
            .post('/recovery', { userId: user.id, recoveryAnswer: answer })
            .then(response => {
                setUser(response.data);
            })
            .catch(e => {
                setError(e.response.data);
            });
    };

    return (
        <Container maxWidth='sm' sx={{ mt: 10 }}>
            <Form
                btnText='Reset password'
                onSubmit={handleSubmit}
                error={errorMessage}
            >
                {!user && <TextField label='Login' name='login' required />}
                {isQuestion && (
                    <Question text={user.recoveryQuestion as string} />
                )}
                {isRecoveryToken && <Password />}
            </Form>
        </Container>
    );
};

export default Recovery;
