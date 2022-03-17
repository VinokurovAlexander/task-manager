import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { SxProps } from '@mui/material/styles';
import { Modal } from 'components/Modal';
import { TaskForm } from 'components/TaskForm';
import { ITask } from 'api/task';
import { getTaskFromFormData } from 'components/TaskForm';
import { api } from 'api';
import { useRequest } from 'hooks/useRequest';

interface IAdd {
    style?: SxProps;
    onTaskAdd: (newTasks: ITask[]) => void;
    disabled?: boolean;
}

const { task } = api;

const Add: React.FC<IAdd> = ({ style, onTaskAdd, disabled }) => {
    const [isOpenModal, setIsOpenModal] = React.useState(false);
    const { handleError, notice, isTimeout, setNotice } = useRequest();

    const handleClick = () => {
        setIsOpenModal(true);
    };

    const handleModalClose = () => {
        setIsOpenModal(false);
    };

    const handleSubmit = (formData: FormData) => {
        task.add(getTaskFromFormData(formData))
            .then(response => {
                setIsOpenModal(false);
                setNotice(null);
                onTaskAdd(response.data.tasks);
            })
            .catch(handleError);
    };

    return (
        <>
            <Fab color='primary' size='large' sx={style} onClick={handleClick} disabled={disabled}>
                <AddIcon />
            </Fab>
            <Modal open={isOpenModal} onClose={handleModalClose}>
                <TaskForm onSubmit={handleSubmit} notice={notice} loading={isTimeout} />
            </Modal>
        </>
    );
};

export default Add;
