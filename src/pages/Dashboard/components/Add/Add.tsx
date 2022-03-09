import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { SxProps } from '@mui/material/styles';
import { Modal } from 'components/Modal';
import { TaskForm } from 'components/TaskForm';
import { ITask } from 'utils/server';
import { useError } from 'hooks/useError';
import { getTaskFromFormData } from 'components/TaskForm';
import axios from 'axios';

interface IAdd {
    style?: SxProps;
    onTaskAdd?: (newTasks: ITask[]) => void;
}

const Add: React.FC<IAdd> = ({ style, onTaskAdd }) => {
    const [isOpenModal, setIsOpenModal] = React.useState(false);
    const { errorMessage, setError } = useError();

    const handleClick = () => {
        setIsOpenModal(true);
    };

    const handleModalClose = () => {
        setIsOpenModal(false);
    };

    const handleSubmit = (formData: FormData) => {
        axios
            .post('/tasks', getTaskFromFormData(formData))
            .then(response => {
                setIsOpenModal(false);
                onTaskAdd?.(response.data.tasks);
            })
            .catch(e => {
                setError(e.response.data);
            });
    };

    return (
        <>
            <Fab color='primary' size='large' sx={style} onClick={handleClick}>
                <AddIcon />
            </Fab>
            <Modal open={isOpenModal} onClose={handleModalClose}>
                <TaskForm onSubmit={handleSubmit} error={errorMessage} />
            </Modal>
        </>
    );
};

export default Add;
