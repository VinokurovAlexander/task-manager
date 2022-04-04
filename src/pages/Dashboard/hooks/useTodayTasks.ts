import React from 'react';
import { ITask } from 'api/task';
import { useRequest } from 'hooks/useRequest';
import { api } from 'api';

export const useTodayTasks = () => {
    const [todayTasks, setTodayTasks] = React.useState<ITask[]>([]);
    const { handleError, isTimeout } = useRequest();

    const getTodayTasks = React.useCallback(() => {
        api.task
            .get({ isToday: true })
            .then(response => {
                setTodayTasks(response.data.tasks);
            })
            .catch(handleError);
    }, [handleError]);

    React.useEffect(() => {
        if (!isTimeout) {
            getTodayTasks();
        }
    }, [isTimeout, getTodayTasks]);

    return { todayTasks, isTimeout, getTodayTasks };
};
