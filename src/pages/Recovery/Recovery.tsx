import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Form } from 'components/Form';
import { Question } from './components/Question';
import { Password } from './components/Password';
import { useSharedWorker } from 'hooks/useSharedWorker';

interface IUser {
    id: string;
    recoveryQuestion?: string;
    recoveryToken?: string;
}

const Recovery = () => {
    const navigate = useNavigate();
    const worker = useSharedWorker();

    const [user, setUser] = React.useState<IUser | null>(null);
    const [notice, setNotice] = React.useState(null);

    const isQuestion = user?.recoveryQuestion;
    const isRecoveryToken = user?.recoveryToken;

    const handleSubmit = React.useCallback(
        (formData: FormData) => {
            setNotice(null);

            if (!user) {
                const login = formData.get('login') as string;

                worker?.port.postMessage({ type: 'get-question', payload: login });

                return;
            }

            if (isRecoveryToken) {
                const password = formData.get('password') as string;

                worker?.port.postMessage({
                    type: 'change-password',
                    payload: {
                        recoveryToken: user.recoveryToken,
                        password,
                        id: user.id,
                    },
                });

                return;
            }

            const answer = formData.get('answer') as string;

            worker?.port.postMessage({ type: 'send-answer', payload: { id: user.id, answer } });
        },
        [isRecoveryToken, user, worker?.port]
    );

    React.useEffect(() => {
        worker?.port.addEventListener('message', e => {
            const { data } = e;

            if (data.type === 'error') {
                setNotice(data);

                return;
            }

            if (data.user) {
                setUser(data.user);

                return;
            }

            navigate('/dashboard');
        });
    }, [navigate, worker?.port]);

    return (
        <Container maxWidth='sm' sx={{ mt: 10 }}>
            <Form btnText='Reset password' onSubmit={handleSubmit} notice={notice}>
                {!user && <TextField label='Login' name='login' required />}
                {isQuestion && <Question text={user.recoveryQuestion as string} />}
                {isRecoveryToken && <Password />}
            </Form>
        </Container>
    );
};

export default Recovery;
