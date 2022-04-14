import { tasks, users } from './constants';
import { ITaskFilter } from 'api/task';

export const getUserByCreds = (login: string, password: string) =>
    users.find(user => user.login === login && user.password === password);

export const getUserByLogin = (login: string) => users.find(user => user.login === login);

export const getTasksByFilters = (filters: ITaskFilter) => {
    const { byTitle, byType, isToday } = filters;

    return tasks
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
};

export const getUserById = (id: string) => users.find(user => user.id === id);

export const getUserByToken = (id: string, token: string) =>
    users.find(user => user.id === id && user.recoveryToken === token);
