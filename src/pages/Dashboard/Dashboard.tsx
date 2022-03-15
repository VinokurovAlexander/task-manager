import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Menu } from './components/Menu';
import { Header } from './components/Header';
import { Tasks } from './components/Tasks';
import { Add } from './components/Add';
import { Filters } from './components/Filters';
import { useRequest } from 'hooks/useRequest';
import { api } from 'api';
import { ITaskFilter, ITask } from 'api/task';

const { task } = api;

const Dashboard = () => {
    const [filters, setFilters] = React.useState({
        byDay: 'All',
        byType: 'All',
        byTitle: '',
    });
    const [tasks, setTasks] = React.useState<ITask[]>([]);
    const { isTimeout, handleError } = useRequest();

    const getTasks = React.useCallback(
        (filters: ITaskFilter) => {
            task.get(filters)
                .then(response => {
                    setTasks(response.data.tasks);
                })
                .catch(handleError);
        },
        [handleError]
    );

    const handleTaskEdit = (newTasks: ITask[]) => {
        setTasks(newTasks);
    };

    const handleFiltersChange = React.useCallback(newFilters => {
        setFilters(newFilters);
    }, []);

    React.useEffect(() => {
        if (!isTimeout) {
            getTasks(filters);
        }
    }, [filters, getTasks, isTimeout]);

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Menu />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    p: '40px',
                }}
            >
                <Box>
                    <Header />
                    <Container maxWidth='xl'>
                        <Filters
                            style={{ mb: 4 }}
                            onFiltersChange={handleFiltersChange}
                            isTimeout={isTimeout}
                            filters={filters}
                        />
                        <Tasks items={tasks} onTaskEdit={handleTaskEdit} isTimeout={isTimeout} />
                    </Container>
                </Box>
            </Box>
            <Add
                style={{ position: 'fixed', bottom: '50px', right: '50px' }}
                onTaskAdd={handleTaskEdit}
                disabled={isTimeout}
            />
        </Box>
    );
};

export default Dashboard;
