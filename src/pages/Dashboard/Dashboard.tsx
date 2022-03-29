import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Timeline } from './components/Timeline';
import { Menu } from './components/Menu';
import { Header } from './components/Header';
import { Tasks } from './components/Tasks';
import { Add } from './components/Add';
import { Filters } from './components/Filters';
import { useTodayTasks } from './hooks/useTodayTasks';
import { useFilteredTasks } from './hooks/useFilteredTasks';
import { useEditModal } from './hooks/useEditModal';
import { Modal } from '../../components/Modal';
import { Edit } from './components/Edit';
import { ITask } from 'api/task';

const Dashboard = () => {
    const {
        filteredTasks,
        isTimeout: isFilteredTasksTimeout,
        filters,
        setFilters,
        getFilteredTasks,
    } = useFilteredTasks();
    const { todayTasks, isTimeout: isTodayTasksTimeout, getTodayTasks } = useTodayTasks();

    const isTimeout = isFilteredTasksTimeout || isTodayTasksTimeout;

    const { isOpenModal, editTask, setIsOpenModal, setEditTask } = useEditModal();

    const handleTaskEdit = () => {
        handleModalClose();
        getTodayTasks();
        getFilteredTasks(filters);
    };

    const handleModalClose = () => {
        setIsOpenModal(false);
        setEditTask(null);
    };

    const openModalForEdit = (task: ITask) => {
        setEditTask(task);
        setIsOpenModal(true);
    };

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
                    <Container
                        maxWidth='xl'
                        sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
                    >
                        <Filters
                            onFiltersChange={setFilters}
                            disabled={isTimeout}
                            filters={filters}
                        />
                        <Tasks
                            items={filteredTasks}
                            onTaskClick={openModalForEdit}
                            isLoading={isFilteredTasksTimeout}
                        />
                        <Timeline
                            tasks={todayTasks}
                            onItemClick={openModalForEdit}
                            isLoading={isTodayTasksTimeout}
                        />
                    </Container>
                </Box>
            </Box>
            <Add
                style={{ position: 'fixed', bottom: '50px', right: '50px' }}
                onTaskAdd={handleTaskEdit}
                disabled={isTimeout}
            />
            <Modal open={isOpenModal} onClose={handleModalClose} keepMounted>
                <>{editTask && <Edit task={editTask} onTaskEdit={handleTaskEdit} />}</>
            </Modal>
        </Box>
    );
};

export default Dashboard;
