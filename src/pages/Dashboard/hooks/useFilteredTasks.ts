import React from 'react';
import { ITask, ITaskFilter } from 'api/task';
import { useRequest } from 'hooks/useRequest';
import { api } from 'api';

export const useFilteredTasks = () => {
    const [filters, setFilters] = React.useState<ITaskFilter>({
        byType: 'All',
        byTitle: '',
    });

    const [filteredTasks, setFilteredTasks] = React.useState<ITask[]>([]);
    const { isTimeout, handleError } = useRequest();

    const getFilteredTasks = React.useCallback(
        (filters: ITaskFilter) => {
            api.task
                .get(filters)
                .then(response => {
                    setFilteredTasks(response.data.tasks);
                })
                .catch(handleError);
        },
        [handleError]
    );

    React.useEffect(() => {
        if (!isTimeout) {
            getFilteredTasks(filters);
        }
    }, [filters, getFilteredTasks, isTimeout]);

    return { filteredTasks, isTimeout, setFilters, filters, getFilteredTasks };
};
