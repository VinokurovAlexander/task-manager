import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ruLocale from 'date-fns/locale/ru';
import { SxProps } from '@mui/material/styles';

interface DateTime {
    label: string;
    name: string;
    defaultValue?: number | null;
    style?: SxProps;
    required?: boolean;
    disabled?: boolean;
}

const DateTime: React.FC<DateTime> = ({
    defaultValue,
    label,
    name,
    style,
    required = false,
    disabled = false,
}) => {
    const initialValue = defaultValue ? new Date(defaultValue) : null;
    const [value, setValue] = React.useState<Date | null>(initialValue);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
            <DateTimePicker
                renderInput={props => (
                    <TextField {...props} name={name} sx={style} required={required} />
                )}
                label={label}
                value={value}
                onChange={setValue}
                mask='__.__.____ __:__'
                disabled={disabled}
            />
        </LocalizationProvider>
    );
};

export default DateTime;
