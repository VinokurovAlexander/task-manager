import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Avatar } from './components/Avatar';
import { Form } from 'components/Form';
import { api } from 'api';
import { useRequest } from 'hooks/useRequest';

const { profile } = api;

const Profile = () => {
    const { handleError, notice, isTimeout, setNotice } = useRequest();

    const handleSubmit = (formData: FormData) => {
        const name = formData.get('name') as string | null;
        const surname = formData.get('surname') as string | null;
        const recoveryQuestion = formData.get('recoveryQuestion') as string;
        const recoveryAnswer = formData.get('recoveryAnswer') as string;
        const avatar = formData.get('avatar') as File | null;

        profile
            .edit({
                name,
                surname,
                recoveryQuestion,
                recoveryAnswer,
                avatar,
            })
            .then(() => {
                setNotice(null);
                alert('ok');
            })
            .catch(handleError);
    };

    return (
        <Container maxWidth='sm' sx={{ mt: 10 }}>
            <Typography variant='h3' sx={{ mb: 4 }}>
                Edit profile
            </Typography>
            <Form btnText='Save' onSubmit={handleSubmit} notice={notice} loading={isTimeout}>
                <Avatar disabled={isTimeout} />
                <TextField name='name' label='Name' placeholder='Name' disabled={isTimeout} />
                <TextField
                    name='surname'
                    label='Surname'
                    placeholder='surname'
                    disabled={isTimeout}
                />
                <TextField
                    name='recoveryQuestion'
                    label='Recovery question'
                    placeholder='Recovery question'
                    required
                    disabled={isTimeout}
                />
                <TextField
                    name='recoveryAnswer'
                    label='Recovery answer'
                    placeholder='Recovery answer'
                    required
                    disabled={isTimeout}
                />
            </Form>
        </Container>
    );
};
export default Profile;
