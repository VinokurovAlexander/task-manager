import MockAdapter from 'axios-mock-adapter';
import { instance } from 'api';
import { pathToRegexp } from 'path-to-regexp';
import { nanoid } from 'nanoid';
import { tasks, users } from './constants';

const axiosMock = new MockAdapter(instance);

export const initFakeServer = () => {
    axiosMock.onAny().timeoutOnce();

    axiosMock
        .onPatch(pathToRegexp('/tasks/:id'))
        .timeoutOnce()
        .onPatch(pathToRegexp('/tasks/:id'))
        .reply(config => {
            const { url, data } = config;
            const id = url?.substring(url.lastIndexOf('/') + 1);

            const index = tasks.findIndex(task => task.id === id);

            if (index === -1) {
                return [400, { message: 'Task is not exist' }];
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
        const user = users.find(user => user.login === login && user.password === password);

        if (!user) {
            return [400, { message: 'Wrong username or password' }];
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
                    message: 'User is not exists',
                },
            ];
        }

        const isValidAnswer = user.recoveryAnswer === recoveryAnswer;

        if (!isValidAnswer) {
            return [
                400,
                {
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

        const user = users.find(user => user.id === userId && user.recoveryToken === recoveryToken);

        if (!user) {
            return [
                {
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

    axiosMock
        .onPost('/tasks')
        .timeoutOnce()
        .onPost('/tasks')
        .reply(config => {
            const { data } = config;

            const task = {
                id: nanoid(4),
                ...JSON.parse(data),
            };

            tasks.push(task);

            return [200, { tasks }];
        });

    axiosMock.onGet('/tasks').reply(config => {
        const { byType, byTitle, isToday } = config.params;

        const tasksWithFilters = tasks
            .filter(task => {
                if (!byTitle) {
                    return true;
                }

                const title = task.title.toLowerCase();
                const searchValue = byTitle.toLowerCase().trim();

                return title.includes(searchValue);
            })
            .filter(task => {
                if (!byType || byType === 'All') {
                    return true;
                }

                return task.type === byType;
            })
            .filter(task => {
                if (!isToday) {
                    return true;
                }

                const currentDate = new Date().toLocaleDateString();
                const taskDate = new Date(task.plannedStartTime).toLocaleDateString();

                return currentDate === taskDate;
            });

        return [200, { tasks: tasksWithFilters }];
    });

    axiosMock.onPatch('/profile').reply(200);

    axiosMock.onGet('/heartbeat').reply(() => {
        if (Math.random() > 0.3) {
            return [200];
        }

        return [500];
    });
};
