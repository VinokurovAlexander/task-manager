import { users, tasks } from 'utils/server/constants';
import * as utils from 'utils/server';
import { nanoid } from 'nanoid';

declare const self: SharedWorkerGlobalScope;
export {};

self.onconnect = e => {
    const port = e.ports[0];

    port.onmessage = e => {
        const { data } = e;

        switch (data.type) {
            case 'signin': {
                const { login, password } = data.payload;

                const user = utils.getUserByCreds(login, password);

                if (!user) {
                    port.postMessage({ type: 'error', message: 'Wrong username or password' });

                    break;
                }

                port.postMessage({ type: 'success' });

                break;
            }

            case 'signup': {
                const { login, password } = data.payload;

                const user = utils.getUserByLogin(login);

                if (user) {
                    port.postMessage({ type: 'error', message: 'User is already exists' });

                    break;
                }

                users.push({
                    id: nanoid(4),
                    login,
                    password,
                    recoveryAnswer: '',
                    recoveryQuestion: '',
                    recoveryToken: null,
                });

                port.postMessage({ type: 'success', message: 'user created' });

                break;
            }

            case 'tasks-get': {
                const filters = data.payload;

                const tasks = utils.getTasksByFilters(filters);

                port.postMessage({ type: 'success', tasks });

                break;
            }

            case 'tasks-add': {
                const task = data.payload;

                tasks.push({
                    id: nanoid(4),
                    ...task,
                });

                port.postMessage({ type: 'success', message: 'Task was added' });

                break;
            }

            case 'tasks-edit': {
                const { task, id } = data.payload;

                const index = tasks.findIndex(task => task.id === id);

                if (index === -1) {
                    port.postMessage({ type: 'error', message: 'Task doesn`t exist' });

                    break;
                }

                tasks.splice(index, 1);

                tasks.push({
                    id,
                    ...task,
                });

                port.postMessage({ type: 'success', message: 'Task was edited' });

                break;
            }

            case 'profile-edit': {
                port.postMessage({ type: 'success' });

                break;
            }

            case 'get-question': {
                const login = data.payload;

                const user = utils.getUserByLogin(login);

                if (!user) {
                    port.postMessage({ type: 'error', message: 'User not found' });

                    break;
                }

                port.postMessage({
                    type: 'success',
                    user: { id: user.id, recoveryQuestion: user.recoveryQuestion },
                });

                break;
            }

            case 'send-answer': {
                const { id, answer } = data.payload;

                const user = utils.getUserById(id);

                if (!user) {
                    port.postMessage({ type: 'error', message: 'User not found' });

                    break;
                }

                const isValidAnswer = user.recoveryAnswer === answer;

                if (!isValidAnswer) {
                    port.postMessage({ type: 'error', message: 'Recovery answer is not correct' });

                    break;
                }

                const recoveryToken = nanoid();

                user.recoveryToken = recoveryToken;

                port.postMessage({ type: 'success', user: { id, recoveryToken } });

                break;
            }

            case 'change-password': {
                const { id, password, recoveryToken } = data.payload;

                const user = utils.getUserByToken(id, recoveryToken);

                if (!user) {
                    port.postMessage({
                        type: 'error',
                        message: 'Not valid user or recovery token',
                    });

                    break;
                }

                user.recoveryToken = null;
                user.password = password;

                port.postMessage({ type: 'success', message: 'Password was changed' });

                break;
            }

            default: {
                port.postMessage({ type: 'error', message: 'Unknown message type' });
            }
        }
    };
};
