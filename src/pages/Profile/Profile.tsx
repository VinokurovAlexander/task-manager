import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Avatar } from './components/Avatar';
import { Form } from 'components/Form';
import { useSharedWorker } from 'hooks/useSharedWorker';

const Profile = () => {
    const [notice, setNotice] = React.useState(null);
    const worker = useSharedWorker();

    const handleSubmit = (formData: FormData) => {
        const name = formData.get('name') as string | null;
        const surname = formData.get('surname') as string | null;
        const recoveryQuestion = formData.get('recoveryQuestion') as string;
        const recoveryAnswer = formData.get('recoveryAnswer') as string;
        const avatar = formData.get('avatar') as File | null;

        worker?.port.postMessage({
            type: 'profile-edit',
            payload: { name, surname, recoveryQuestion, recoveryAnswer, avatar },
        });

        setNotice(null);
    };

    React.useEffect(() => {
        worker?.port.addEventListener('message', e => {
            const { data } = e;

            if (data.type === 'success') {
                alert('ok');

                return;
            }

            if (data.type === 'error') {
                setNotice(data);
            }
        });
    }, [worker?.port]);

    return (
        <Container maxWidth='sm' sx={{ mt: 10 }}>
            <Typography variant='h3' sx={{ mb: 4 }}>
                Edit profile
            </Typography>
            <Form btnText='Save' onSubmit={handleSubmit} notice={notice}>
                <Avatar />
                <TextField name='name' label='Name' placeholder='Name' />
                <TextField name='surname' label='Surname' placeholder='surname' />
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
