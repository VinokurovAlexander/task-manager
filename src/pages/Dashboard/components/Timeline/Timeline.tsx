import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ITask } from 'api/task';
import { getSortedTasksByStartTime } from './utils';
import { Item } from './components/Item';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { CircularProgress } from '@mui/material';

const style = {
    '.wrapper': {
        display: 'flex',
        backgroundColor: 'lightgray',
        borderRadius: '20px',
        p: 2,
        gap: 1,
        overflow: 'scroll',
    },

    '.task-enter': {
        minWidth: '0 !important',
        width: '0 !important',
    },
};

interface ITimeLine {
    tasks: ITask[];
    isLoading?: boolean;
    onItemClick: (task: ITask) => void;
}

const Timeline: React.FC<ITimeLine> = ({ tasks, onItemClick, isLoading = false }) => {
    const hasTasks = tasks.length > 0;

    const todayTasks = getSortedTasksByStartTime(tasks);

    const renderContent = () =>
        hasTasks ? (
            <TransitionGroup className='wrapper'>
                {todayTasks.map(task => (
                    <CSSTransition key={task.id} classNames='task' timeout={0} mountOnEnter>
                        <Item task={task} onClick={onItemClick} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        ) : (
            <Typography variant='h5'>You're a bum!</Typography>
        );

    return (
        <Box sx={style}>
            <Typography variant='h3' sx={{ mb: 3 }}>
                Today
            </Typography>
            {isLoading ? <CircularProgress /> : renderContent()}
        </Box>
    );
};
export default Timeline;
