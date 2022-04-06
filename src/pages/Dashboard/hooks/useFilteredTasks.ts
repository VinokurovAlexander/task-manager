import React from 'react';
import { ITask, ITaskFilter } from 'api/task';
import { useSharedWorker } from 'hooks/useSharedWorker';

export const useFilteredTasks = () => {
    const worker = useSharedWorker();
    const [filters, setFilters] = React.useState<ITaskFilter>({
        byType: 'All',
        byTitle: '',
    });
    const [filteredTasks, setFilteredTasks] = React.useState<ITask[]>([]);

    const getFilteredTasks = React.useCallback(
        (filters: ITaskFilter) => {
            worker?.port.postMessage({ type: 'tasks-get', payload: filters });
        },
        [worker]
    );

    React.useEffect(() => {
        worker?.port.addEventListener('message', e => {
            const { data } = e;

            if (data.type === 'success') {
                setFilteredTasks(data.tasks);
            }
        });
    }, [worker]);

    React.useEffect(() => {
        getFilteredTasks(filters);
    }, [filters, getFilteredTasks]);

    return { filteredTasks, setFilters, filters, getFilteredTasks };
};
