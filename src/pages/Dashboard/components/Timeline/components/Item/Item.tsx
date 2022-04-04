import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ITask } from 'api/task';
import { format } from 'date-fns';
import { useTaskData } from './useTaskData';

const style = {
    borderRadius: '20px',
    color: 'white',
    transition:
        'width 1s ease-in, background-color 0.5s ease-in, opacity 0.3s ease-in, min-width 1s ease-in',
    minWidth: '135px',
    flexShrink: 0,
    overflow: 'hidden',

    '&:hover': {
        opacity: 0.7,
        cursor: 'pointer',
    },
};

interface IItem {
    task: ITask;
    onClick: (task: ITask) => void;
}

const Item: React.FC<IItem> = ({ task, onClick }) => {
    const { width, bgColor } = useTaskData(task);

    const handleClick = (task: ITask) => () => {
        onClick(task);
    };

    return (
        <Box
            sx={{
                bgcolor: bgColor,
                width: `${width}%`,
                ...style,
            }}
            onClick={handleClick(task)}
        >
            <Box sx={{ p: 2 }}>
                <Typography
                    sx={{
                        mb: 1,
                        textOverflow: 'ellipsis',
                        whiteSpace: 'noWrap',
                        overflow: 'hidden',
                    }}
                >
                    {task.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Typography>{format(task.plannedStartTime, 'HH:mm')}</Typography>-
                    <Typography>{format(task.plannedEndTime, 'HH:mm')}</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Item;
