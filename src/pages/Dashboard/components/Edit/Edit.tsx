import React from 'react';
import { ITask } from 'api/task';
import { getTaskFromFormData } from 'components/TaskForm';
import { TaskForm } from 'components/TaskForm';
import { useSharedWorker } from 'hooks/useSharedWorker';

export interface IEdit {
    task: ITask;
    onTaskEdit: () => void;
}

const Edit: React.FC<IEdit> = ({ task, onTaskEdit }) => {
    const { id, ...taskData } = task;
    const [notice, setNotice] = React.useState(null);
    const worker = useSharedWorker();

    const handleSubmit = (formData: FormData) => {
        worker?.port.postMessage({
            type: 'tasks-edit',
            payload: { id, task: getTaskFromFormData(formData) },
        });
    };

    React.useEffect(() => {
        worker?.port.addEventListener('message', e => {
            const { data } = e;

            if (data.type === 'success') {
                onTaskEdit();

                return;
            }

            if (data.type === 'error') {
                setNotice(data);
            }
        });
    }, [onTaskEdit, worker?.port]);

    return (
        <TaskForm
            defaultValues={taskData}
            onSubmit={handleSubmit}
            btnText='Edit task'
            notice={notice}
        />
    );
};
export default Edit;
