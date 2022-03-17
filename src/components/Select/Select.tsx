import React from 'react';
import { nanoid } from 'nanoid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import SelectUI, { SelectChangeEvent } from '@mui/material/Select';
import { SxProps } from '@mui/material/styles';

interface ISelect {
    items: string[];
    label: string;
    id: string;
    name: string;
    required?: boolean;
    defaultValue?: string;
    style?: SxProps;
    disabled?: boolean;
    onChange?: (e: SelectChangeEvent) => void;
}

const Select: React.FC<ISelect> = ({
    items,
    label,
    id,
    name,
    required = false,
    defaultValue,
    style,
    onChange,
    disabled = false,
}) => {
    const [value, setValue] = React.useState(defaultValue || '');
    const labelId = `${id}-label`;

    const handleChange = (e: SelectChangeEvent) => {
        setValue(e.target.value);

        onChange?.(e);
    };

    return (
        <FormControl sx={style}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <SelectUI
                label={label}
                labelId={labelId}
                value={value}
                onChange={handleChange}
                id={id}
                name={name}
                required={required}
                disabled={disabled}
            >
                {items.map(item => (
                    <MenuItem value={item} key={nanoid(4)}>
                        {item}
                    </MenuItem>
                ))}
            </SelectUI>
        </FormControl>
    );
};

export default Select;
