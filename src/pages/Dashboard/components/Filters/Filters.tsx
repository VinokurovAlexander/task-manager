import React from 'react';
import { SxProps } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Select } from 'components/Select';
import { debounce } from 'utils/debounce';
import { TaskType, ITaskFilter } from 'api/task';

interface IFilters {
    style?: SxProps;
    onFiltersChange: (filters: ITaskFilter) => void;
    disabled?: boolean;
    filters: ITaskFilter;
}

const Filters: React.FC<IFilters> = ({ style, onFiltersChange, disabled = false, filters }) => {
    const handleFilterChange = debounce((e: SelectChangeEvent) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };

        onFiltersChange(newFilters);
    }, 300);

    return (
        <Box sx={{ ...style, display: 'flex', gap: 4 }}>
            <TextField
                onChange={handleFilterChange}
                name='byTitle'
                placeholder='By title'
                label='By title'
                disabled={disabled}
            />
            <Select
                items={['All', ...Object.values(TaskType)]}
                label='By type'
                id='filter-by-type'
                name='byType'
                style={{ minWidth: '150px' }}
                defaultValue={filters.byType}
                onChange={handleFilterChange}
                disabled={disabled}
            />
        </Box>
    );
};

export default Filters;
