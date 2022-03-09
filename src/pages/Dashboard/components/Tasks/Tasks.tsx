import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Card } from '../Card';
import { Edit } from '../Edit';
import { Modal } from 'components/Modal';
import { ITask } from 'utils/server';

interface ITasks {
    items: ITask[];
    onTaskEdit?: (tasks: ITask[]) => void;
}

const Tasks: React.FC<ITasks> = ({ items, onTaskEdit }) => {
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

    const renderItems = () => (
        <Grid container spacing={3}>
            {items.map(task => (
                <Grid item xl={3} lg={4} key={task.id}>
                    <Card task={task} onClick={handleTaskClick} />
                </Grid>
            ))}
        </Grid>
    );

    return (
        <>
            {hasItems ? (
                renderItems()
            ) : (
                <Typography variant='h5'>Nothing found</Typography>
            )}
            <Modal open={isOpenModal} onClose={handleModalClose} keepMounted>
                <>
                    {editTask && (
                        <Edit task={editTask} onTaskEdit={handleTaskEdit} />
                    )}
                </>
            </Modal>
        </>
    );
};

export default Tasks;
