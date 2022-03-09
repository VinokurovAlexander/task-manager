import React from 'react';
import axios from 'axios';
import { ITask } from 'utils/server';
import { getTaskFromFormData } from 'components/TaskForm';
import { TaskForm } from 'components/TaskForm';
import { useError } from 'hooks/useError';

export interface IEdit {
    task: ITask;
    onTaskEdit: (tasks: ITask[]) => void;
}

const Edit: React.FC<IEdit> = ({ task, onTaskEdit }) => {
    const { id, ...taskData } = task;

    const { errorMessage, setError } = useError();

    const handleSubmit = (formData: FormData) => {
        axios
            .patch(`/tasks/${id}`, getTaskFromFormData(formData))
            .then(response => {
                onTaskEdit(response.data.tasks);
            })
            .catch(e => {
                setError(e.response.data);
            });
    };

    return (
        <TaskForm
            defaultValues={taskData}
            onSubmit={handleSubmit}
            btnText='Edit task'
            error={errorMessage}
        />
    );
};
export default Edit;
