import React from 'react';
import TextField from '@mui/material/TextField';

interface IPassword {
    onChange?: (isPasswordsMatch: boolean) => void;
}

const Password: React.FC<IPassword> = ({ onChange }) => {
    const [password, setPassword] = React.useState('');
    const [repeatPassword, setRepeatPassword] = React.useState('');
    const repeatPasswordRef = React.useRef<HTMLInputElement>(null);

    const handlePasswordChange: React.ChangeEventHandler<
        HTMLInputElement
    > = e => {
        setPassword(e.currentTarget.value);
    };

    const handleRepeatPasswordChange: React.ChangeEventHandler<
        HTMLInputElement
    > = e => {
        setRepeatPassword(e.currentTarget.value);
    };

    React.useEffect(() => {
        const isPasswordsMatches = password === repeatPassword;

        onChange?.(isPasswordsMatches);

        repeatPasswordRef.current?.setCustomValidity(
            isPasswordsMatches ? '' : 'Passwords dont match'
        );
    }, [onChange, password, repeatPassword]);

    return (
        <>
            <TextField
                label='Password'
                name='password'
                required
                type='password'
                sx={{ mb: 2 }}
                onChange={handlePasswordChange}
            />
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
