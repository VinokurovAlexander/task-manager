import React from 'react';
import axios from 'axios';
import { SxProps } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Select } from 'components/Select';
import { TaskType, ITask } from 'utils/server';
import { debounce } from 'utils/debounce';

interface IFilters {
    style?: SxProps;
    onFiltersChange?: (newTasks: ITask[]) => void;
}

const filterByDateTime = ['All', 'Today'];

const Filters: React.FC<IFilters> = ({ style, onFiltersChange }) => {
    const [filters, setFilters] = React.useState({
        byDay: 'All',
        byType: 'All',
        byTitle: ''
    });

    const handleFilterChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target;

        setFilters({ ...filters, [name]: value });
    };

    const debouncedFilterChange = debounce(handleFilterChange, 300);

    React.useEffect(() => {
        axios.get('/tasks', { params: { ...filters } }).then(response => {
            onFiltersChange?.(response.data.tasks);
        });
    }, [filters, onFiltersChange]);

    return (
        <Box sx={{ ...style, display: 'flex', gap: 4 }}>
            <TextField onChange={debouncedFilterChange} name="byTitle" placeholder="By title" label="By title"/>
            <Select
                items={filterByDateTime}
                label='By day'
                id='filter-by-day'
                name='byDay'
                style={{ minWidth: '100px' }}
                defaultValue={filters.byDay}
                onChange={handleFilterChange}
            />
            <Select
                items={['All', ...Object.values(TaskType)]}
                label='By type'
                id='filter-by-type'
                name='byType'
                style={{ minWidth: '150px' }}
                defaultValue={filters.byType}
                onChange={handleFilterChange}
            />
        </Box>
    );
};

export default Filters;
