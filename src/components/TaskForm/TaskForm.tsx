import React from 'react';
import TextField from '@mui/material/TextField';
import { Form, IForm } from '../Form';
import { DateTime } from 'components/DateTime';
import { ITask, TaskType } from 'utils/server';
import { Select } from '../Select';

type TaskWithoutId = Omit<ITask, 'id'>;

interface ITaskForm extends IForm {
    defaultValues?: TaskWithoutId;
}

const TaskForm: React.FC<ITaskForm> = ({ defaultValues, ...formProps }) => (
    <Form {...formProps}>
        <TextField
            name='title'
            defaultValue={defaultValues?.title}
            label='Title'
            required
        />
        <Select
            items={Object.values(TaskType)}
            label='Type'
            id='task-type'
            name='type'
            defaultValue={defaultValues?.type}
        />
        <DateTime
            label='Planned start time'
            defaultValue={defaultValues?.plannedStartTime}
            name='plannedStartTime'
            required
        />
        <DateTime
            label='Planned end time'
            defaultValue={defaultValues?.plannedEndTime}
            name='plannedEndTime'
            required
        />
        <DateTime
            label='Actual start time'
            defaultValue={defaultValues?.actualStartTime}
            name='actualStartTime'
        />
        <DateTime
            label='Actual end time'
            defaultValue={defaultValues?.actualEndTime}
            name='actualEndTime'
        />
    </Form>
);
export default TaskForm;
