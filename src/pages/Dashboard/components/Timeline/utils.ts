import { ITask } from 'api/task';

export const getSortedTasksByStartTime = (tasks: ITask[]) =>
    tasks.sort((prevTask, currentTask) => prevTask.plannedStartTime - currentTask.plannedStartTime);
