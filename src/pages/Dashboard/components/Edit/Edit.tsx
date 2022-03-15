import React from 'react';
import { ITask } from 'api/task';
import { getTaskFromFormData } from 'components/TaskForm';
import { TaskForm } from 'components/TaskForm';
import { api } from 'api';
import { useRequest } from 'hooks/useRequest';

const { task: taskApi } = api;

export interface IEdit {
    task: ITask;
    onTaskEdit: (tasks: ITask[]) => void;
}

const Edit: React.FC<IEdit> = ({ task, onTaskEdit }) => {
    const { id, ...taskData } = task;
    const { handleError, isTimeout, notice } = useRequest();

    const handleSubmit = (formData: FormData) => {
        taskApi
            .edit(id, getTaskFromFormData(formData))
            .then(response => {
                onTaskEdit(response.data.tasks);
            })
            .catch(handleError);
    };

    return (
        <TaskForm
            defaultValues={taskData}
            onSubmit={handleSubmit}
            btnText='Edit task'
            notice={notice}
            loading={isTimeout}
        />
    );
};
export default Edit;
