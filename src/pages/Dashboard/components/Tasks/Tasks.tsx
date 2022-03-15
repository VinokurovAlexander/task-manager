import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ITask } from 'api/task';
import CircularProgress from '@mui/material/CircularProgress';
import { Card } from '../Card';
import { Edit } from '../Edit';
import { Modal } from 'components/Modal';

interface ITasks {
    items: ITask[];
    onTaskEdit?: (tasks: ITask[]) => void;
    isTimeout?: boolean;
}

const Tasks: React.FC<ITasks> = ({ items, onTaskEdit, isTimeout = false }) => {
    const [isOpenModal, setIsOpenModal] = React.useState(false);
    const [editTask, setEditTask] = React.useState<ITask | null>(null);
    const hasItems = items.length !== 0;

    const handleTaskClick = (task: ITask) => {
        setIsOpenModal(!isOpenModal);
        setEditTask(task);
    };

    const handleModalClose = () => {
        setIsOpenModal(false);
        setEditTask(null);
    };

    const handleTaskEdit = (newTasks: ITask[]) => {
        handleModalClose();
        onTaskEdit?.(newTasks);
    };

    const renderItems = () =>
        hasItems ? (
            <Grid container spacing={3}>
                {items.map(task => (
                    <Grid item xl={3} lg={4} key={task.id}>
                        <Card task={task} onClick={handleTaskClick} />
                    </Grid>
                ))}
            </Grid>
        ) : (
            <Typography variant='h5'>Nothing found</Typography>
        );

    return (
        <>
            {isTimeout && <CircularProgress />}
            {!isTimeout && renderItems()}
            <Modal open={isOpenModal} onClose={handleModalClose} keepMounted>
                <>{editTask && <Edit task={editTask} onTaskEdit={handleTaskEdit} />}</>
            </Modal>
        </>
    );
};

export default Tasks;
