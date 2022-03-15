import { IUser } from './types';
import { TaskType, ITask } from 'api/task';
import { nanoid } from 'nanoid';

export const tasks: ITask[] = [
    {
        id: nanoid(4),
        title: 'Task-1',
        type: TaskType.WORK,
        plannedStartTime: 1642578448000,
        plannedEndTime: 1642751248000,
        actualStartTime: 1643788048000,
        actualEndTime: null,
    },
    {
        id: nanoid(4),
        title: 'Task-2',
        type: TaskType.MEDICINE,
        plannedStartTime: 1642578448000,
        plannedEndTime: 1642751248000,
        actualStartTime: 1643788048000,
        actualEndTime: null,
    },
];

export const users: IUser[] = [
    {
        id: nanoid(4),
        login: 'admin',
        password: 'admin',
        recoveryQuestion: 'The Ultimate Question of Life, the Universe, and Everything',
        recoveryAnswer: '42',
        recoveryToken: null,
    },
];
