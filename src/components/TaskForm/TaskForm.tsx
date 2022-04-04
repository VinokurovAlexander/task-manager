import React from 'react';
import TextField from '@mui/material/TextField';
import { Form, IForm } from '../Form';
import { DateTime } from 'components/DateTime';
import { ITask, TaskType } from 'api/task';
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
            disabled={formProps.loading}
            inputProps={{
                maxLength: 15,
            }}
        />
        <Select
            items={Object.values(TaskType)}
            label='Type'
            id='task-type'
            name='type'
            defaultValue={defaultValues?.type}
            disabled={formProps.loading}
        />
        <DateTime
            label='Planned start time'
            defaultValue={defaultValues?.plannedStartTime}
            name='plannedStartTime'
            required
            disabled={formProps.loading}
        />
        <DateTime
            label='Planned end time'
            defaultValue={defaultValues?.plannedEndTime}
            name='plannedEndTime'
            required
            disabled={formProps.loading}
        />
        <DateTime
            label='Actual start time'
            defaultValue={defaultValues?.actualStartTime}
            name='actualStartTime'
            disabled={formProps.loading}
        />
        <DateTime
            label='Actual end time'
            defaultValue={defaultValues?.actualEndTime}
            name='actualEndTime'
            disabled={formProps.loading}
        />
        <Select
            items={['true', 'false']}
            label='Completed'
            id='completed'
            name='completed'
            defaultValue={defaultValues?.completed.toString()}
            required
        />
    </Form>
);

export default TaskForm;
