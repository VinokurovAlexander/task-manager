import React from 'react';
import { ITask } from 'api/task';
import { useSharedWorker } from 'hooks/useSharedWorker';

export const useTodayTasks = () => {
    const [todayTasks, setTodayTasks] = React.useState<ITask[]>([]);
    const worker = useSharedWorker();

    const getTodayTasks = React.useCallback(() => {
        worker?.port.postMessage({ type: 'tasks-get', payload: { isToday: true } });
    }, [worker]);

    React.useEffect(() => {
        worker?.port.addEventListener('message', e => {
            const { data } = e;

            if (data.type === 'success') {
                setTodayTasks(data.tasks);
            }
        });
    }, [worker]);

    React.useEffect(() => {
        getTodayTasks();
    }, [getTodayTasks]);

    return { todayTasks, getTodayTasks };
};
