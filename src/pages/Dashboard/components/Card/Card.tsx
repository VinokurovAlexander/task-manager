import React from 'react';
import CardUI from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { getDateFromTimestamp, getBadgeColorByType } from './utils';
import { ITask } from 'utils/server';

interface ICard {
    task: ITask;
    onClick?: (task: ITask) => void;
}

const Card: React.FC<ICard> = ({ task, onClick }) => {
    const {
        type,
        title,
        actualStartTime,
        plannedStartTime,
        plannedEndTime,
        actualEndTime,
    } = task;

    const handleTaskClick = (task: ITask) => () => {
        onClick?.(task);
    };

    return (
        <CardUI sx={{ height: 250 }} elevation={2}>
            <CardActionArea
                onClick={handleTaskClick(task)}
                style={{ height: '100%' }}
            >
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        alignItems: 'flex-start',
                    }}
                >
                    <Chip
                        label={type}
                        sx={{ mb: 1 }}
                        color={getBadgeColorByType(type)}
                    />
                    <Typography variant='h5'>{title}</Typography>
                    <Typography variant='body2'>
                        Planned start time:&ensp;
                        {getDateFromTimestamp(plannedStartTime)}
                    </Typography>
                    <Typography variant='body2'>
                        Planned end time:&ensp;
                        {getDateFromTimestamp(plannedEndTime)}
                    </Typography>
                    <Typography variant='body2'>
                        Actual start time:&ensp;
                        {actualStartTime &&
                            getDateFromTimestamp(actualStartTime)}
                    </Typography>
                    <Typography variant='body2'>
                        Actual end time:&ensp;
                        {actualEndTime && getDateFromTimestamp(actualEndTime)}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </CardUI>
    );
};
export default Card;
