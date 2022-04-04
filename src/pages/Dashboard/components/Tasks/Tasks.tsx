import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ITask } from 'api/task';
import CircularProgress from '@mui/material/CircularProgress';
import { Card } from '../Card';
import { SxProps } from '@mui/material/styles';

interface ITasks {
    items: ITask[];
    onTaskClick: (task: ITask) => void;
    isLoading?: boolean;
    style?: SxProps;
}

const Tasks: React.FC<ITasks> = ({ items, onTaskClick, isLoading = false, style }) => {
    const hasItems = items.length !== 0;

    const renderItems = () =>
        hasItems ? (
            <Grid container spacing={3}>
                {items.map(task => (
                    <Grid item xl={3} lg={4} key={task.id}>
                        <Card task={task} onClick={onTaskClick} />
                    </Grid>
                ))}
            </Grid>
        ) : (
            <Typography variant='h5'>Nothing found</Typography>
        );

    return <Box sx={{ ...style }}>{isLoading ? <CircularProgress /> : renderItems()}</Box>;
};

export default Tasks;
