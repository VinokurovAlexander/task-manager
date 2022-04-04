import React from 'react';
import { ITask } from 'api/task';

export const useEditModal = () => {
    const [isOpenModal, setIsOpenModal] = React.useState(false);
    const [editTask, setEditTask] = React.useState<ITask | null>(null);

    return { isOpenModal, setIsOpenModal, setEditTask, editTask };
};
