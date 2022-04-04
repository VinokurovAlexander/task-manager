import { IUser } from './types';
import { TaskType, ITask } from 'api/task';
import { nanoid } from 'nanoid';

const currentTime = Date.now();
const oneHourInMs = 3600000;

export const tasks: ITask[] = [
    {
        id: nanoid(4),
        title: 'Task-1',
        type: TaskType.WORK,
        plannedStartTime: currentTime + 3 * oneHourInMs,
        plannedEndTime: currentTime + 8 * oneHourInMs,
        actualStartTime: Date.now(),
        actualEndTime: null,
        completed: false,
    },
    {
        id: nanoid(4),
        title: 'Task-2',
        type: TaskType.MEDICINE,
        plannedStartTime: currentTime - oneHourInMs,
        plannedEndTime: currentTime + oneHourInMs,
        actualStartTime: currentTime,
        actualEndTime: null,
        completed: false,
    },
    {
        id: nanoid(4),
        title: 'Task-3',
        type: TaskType.SPORT,
        plannedStartTime: 1642578448000,
        plannedEndTime: 1642751248000,
        actualStartTime: 1643788048000,
        actualEndTime: null,
        completed: false,
    },
    {
        id: nanoid(4),
        title: 'Task-4',
        type: TaskType.FAMILY,
        plannedStartTime: currentTime + 10 * oneHourInMs,
        plannedEndTime: currentTime + 12 * oneHourInMs,
        actualStartTime: 1643788048000,
        actualEndTime: null,
        completed: false,
    },
    {
        id: nanoid(4),
        title: 'Task-5',
        type: TaskType.WORK,
        plannedStartTime: currentTime - 5 * oneHourInMs,
        plannedEndTime: currentTime - 2 * oneHourInMs,
        actualStartTime: 1643788048000,
        actualEndTime: null,
        completed: true,
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
