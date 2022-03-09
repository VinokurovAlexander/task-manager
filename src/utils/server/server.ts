import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { pathToRegexp } from 'path-to-regexp';
import { nanoid } from 'nanoid';
import { ITask, IUser, TaskType } from './types';

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

const users: IUser[] = [
    {
        id: nanoid(4),
        login: 'admin',
        password: 'admin',
        recoveryQuestion:
            'The Ultimate Question of Life, the Universe, and Everything',
        recoveryAnswer: '42',
        recoveryToken: null,
    },
];

const axiosMock = new MockAdapter(axios);

export const initFakeServer = () => {
    axiosMock.onPatch(pathToRegexp('/tasks/:id')).reply(config => {
        const { url, data } = config;
        const id = url?.substring(url.lastIndexOf('/') + 1);

        const index = tasks.findIndex(task => task.id === id);

        if (index === -1) {
            return [400, { type: 'notExist', message: 'Task is not exist' }];
        }

        tasks.splice(index, 1);
        tasks.push({
            id,
            ...JSON.parse(data),
        });

        return [200, { tasks }];
    });

    axiosMock.onPost('/login').reply(config => {
        const { data } = config;
        const { login, password } = JSON.parse(data);
        const user = users.find(
            user => user.login === login && user.password === password
        );

        if (!user) {
            return [
                400,
                { type: 'authFailed', message: 'Wrong username or password' },
            ];
        }

        return [200, { sessionKey: nanoid() }];
    });

    axiosMock.onPost('/signup').reply(config => {
        const { data } = config;
        const { login, password } = JSON.parse(data);
        const user = users.find(user => user.login === login);

        if (user) {
            return [
                400,
                {
                    type: 'exist',
                    message: 'User with this login is already exists',
                },
            ];
        }

        users.push({
            id: nanoid(4),
            login,
            password,
            recoveryAnswer: '',
            recoveryQuestion: '',
            recoveryToken: null,
        });

        return [200, { sessionKey: nanoid() }];
    });

    axiosMock.onGet('/recovery').reply(config => {
        const {
            params: { login },
        } = config;

        const user = users.find(user => user.login === login);

        if (!user) {
            return [
                400,
                {
                    type: 'exist',
                    message: 'User is not exists',
                },
            ];
        }

        return [200, { id: user.id, recoveryQuestion: user.recoveryQuestion }];
    });

    axiosMock.onPost('/recovery').reply(config => {
        const { data } = config;

        const { userId, recoveryAnswer } = JSON.parse(data);

        const user = users.find(user => user.id === userId);

        if (!user) {
            return [
                400,
                {
                    type: 'exist',
                    message: 'User is not exists',
                },
            ];
        }

        const isValidAnswer = user.recoveryAnswer === recoveryAnswer;

        if (!isValidAnswer) {
            return [
                400,
                {
                    type: 'notValid',
                    message: 'Recovery answer is not correct',
                },
            ];
        }

        const recoveryToken = nanoid();

        user.recoveryToken = recoveryToken;

        return [200, { id: user.id, recoveryToken }];
    });

    axiosMock.onPatch('/recovery').reply(config => {
        const { data } = config;
        const { userId, password, recoveryToken } = JSON.parse(data);

        const user = users.find(
            user => user.id === userId && user.recoveryToken === recoveryToken
        );

        if (!user) {
            return [
                {
                    type: 'badRequest',
                    message: 'Not valid user or recovery token',
                },
            ];
        }

        user.recoveryToken = null;
        user.password = password;

        return [
            200,
            {
                sessionKey: nanoid(),
            },
        ];
    });

    axiosMock.onPost('/tasks').reply(config => {
        const { data } = config;

        const task = {
            id: nanoid(4),
            ...JSON.parse(data),
        };

        tasks.push(task);

        return [200, { tasks }];
    });

    axiosMock.onGet('/tasks').reply(config => {
        const { byType, byDay, byTitle } = config.params;

        const tasksWithFilters = tasks
            .filter(task => {
                if (!byTitle) {
                    return true;
                }

                const title = task.title.toLowerCase();
                const searchValue = byTitle.toLowerCase().trim();

                return title.includes(searchValue);
            })
            .filter(task => (byType === 'All' ? true : task.type === byType))
            .filter(task => {
                if (byDay === 'All') {
                    return true;
                }

                const currentDate = new Date().toLocaleDateString();
                const taskDate = new Date(
                    task.plannedStartTime
                ).toLocaleDateString();

                return currentDate === taskDate;
            });

        return [200, { tasks: tasksWithFilters }];
    });

    axiosMock.onPost('/profile').reply(200);
};
