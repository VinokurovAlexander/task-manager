import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { SxProps } from '@mui/material/styles';
import { Modal } from 'components/Modal';
import { TaskForm } from 'components/TaskForm';
import { getTaskFromFormData } from 'components/TaskForm';
import { useSharedWorker } from 'hooks/useSharedWorker';

interface IAdd {
    style?: SxProps;
    onTaskAdd: () => void;
    disabled?: boolean;
}

const Add: React.FC<IAdd> = ({ style, onTaskAdd, disabled }) => {
    const worker = useSharedWorker();
    const [isOpenModal, setIsOpenModal] = React.useState(false);
    const [notice, setNotice] = React.useState(null);

    const handleClick = () => {
        setIsOpenModal(true);
    };

    const handleModalClose = () => {
        setIsOpenModal(false);
    };

    const handleSubmit = (formData: FormData) => {
        worker?.port.postMessage({ type: 'tasks-add', payload: getTaskFromFormData(formData) });
        setNotice(null);
    };

    React.useEffect(() => {
        worker?.port.addEventListener('message', e => {
            const { data } = e;

            if (data.type === 'success') {
                onTaskAdd();
                setIsOpenModal(false);

                return;
            }

            if (data.type === 'error') {
                setNotice(data);
            }
        });
    }, [onTaskAdd, worker?.port]);

    return (
        <>
            <Fab color='primary' size='large' sx={style} onClick={handleClick} disabled={disabled}>
                <AddIcon />
            </Fab>
            <Modal open={isOpenModal} onClose={handleModalClose}>
                <TaskForm onSubmit={handleSubmit} notice={notice} />
            </Modal>
        </>
    );
};

export default Add;
