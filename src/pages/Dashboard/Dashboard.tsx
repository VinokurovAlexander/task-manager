import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Menu } from './components/Menu';
import { Header } from './components/Header';
import { Tasks } from './components/Tasks';
import { Add } from './components/Add';
import { Filters } from './components/Filters';
import { tasks as defaultTasks, ITask } from 'utils/server';

const Dashboard = () => {
    const [tasks, setTasks] = React.useState(defaultTasks);

    const handleTasksChange = React.useCallback((newTasks: ITask[]) => {
        setTasks(newTasks);
    }, []);

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
                            onFiltersChange={handleTasksChange}
                        />
                        <Tasks items={tasks} onTaskEdit={handleTasksChange} />
                    </Container>
                </Box>
            </Box>
            <Add
                style={{ position: 'fixed', bottom: '50px', right: '50px' }}
                onTaskAdd={handleTasksChange}
            />
        </Box>
    );
};

export default Dashboard;
