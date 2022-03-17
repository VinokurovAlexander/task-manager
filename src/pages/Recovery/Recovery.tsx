import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Form } from 'components/Form';
import { Question } from './components/Question';
import { Password } from './components/Password';
import { api } from 'api';
import { useRequest } from 'hooks/useRequest';

interface IUser {
    id: string;
    recoveryQuestion?: string;
    recoveryToken?: string;
}

const {
    recovery: { getQuestion, sendAnswer, changePassword },
} = api;

const Recovery = () => {
    const navigate = useNavigate();

    const [user, setUser] = React.useState<IUser | null>(null);
    const { notice, handleError, isTimeout, setNotice } = useRequest();

    const isQuestion = user?.recoveryQuestion;
    const isRecoveryToken = user?.recoveryToken;

    const getUser = (login: string) => {
        getQuestion(login)
            .then(response => {
                setUser(response.data);
            })
            .catch(handleError);
    };

    const handleSubmit = (formData: FormData) => {
        setNotice(null);

        if (!user) {
            const login = formData.get('login') as string;

            getUser(login);

            return;
        }

        if (isRecoveryToken) {
            const password = formData.get('password') as string;

            changePassword({
                recoveryToken: user.recoveryToken as string,
                password,
                userId: user.id,
            })
                .then(() => {
                    navigate('/dashboard');
                })
                .catch(handleError);

            return;
        }

        const answer = formData.get('answer') as string;

        sendAnswer(user.id, answer)
            .then(response => {
                setUser(response.data);
            })
            .catch(handleError);
    };

    return (
        <Container maxWidth='sm' sx={{ mt: 10 }}>
            <Form btnText='Reset password' onSubmit={handleSubmit} notice={notice} loading={isTimeout}>
                {!user && <TextField label='Login' name='login' required disabled={isTimeout} />}
                {isQuestion && <Question text={user.recoveryQuestion as string} />}
                {isRecoveryToken && <Password />}
            </Form>
        </Container>
    );
};

export default Recovery;
