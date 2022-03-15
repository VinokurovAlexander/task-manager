import React from 'react';
import TextField from '@mui/material/TextField';

const Password: React.FC = () => {
    const [password, setPassword] = React.useState('');
    const [repeatPassword, setRepeatPassword] = React.useState('');
    const repeatPasswordRef = React.useRef<HTMLInputElement>(null);

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        setPassword(e.currentTarget.value);
    };

    const handleRepeatPasswordChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        setRepeatPassword(e.currentTarget.value);
    };

    React.useEffect(() => {
        const isPasswordsMatches = password === repeatPassword;

        repeatPasswordRef.current?.setCustomValidity(isPasswordsMatches ? '' : 'Passwords dont match');
    }, [password, repeatPassword]);

    return (
        <>
            <TextField label='Password' name='password' required type='password' onChange={handlePasswordChange} />
            <TextField
                label='Repeat password'
                name='repeat-password'
                type='password'
                required
                onChange={handleRepeatPasswordChange}
                inputRef={repeatPasswordRef}
            />
        </>
    );
};

export default Password;
