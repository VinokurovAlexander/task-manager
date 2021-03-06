import { AxiosPromise } from 'axios';

export enum TaskType {
    WORK = 'work',
    MEDICINE = 'medicine',
    FAMILY = 'family',
    SPORT = 'sport',
}

export interface ITask {
    id: string;
    title: string;
    type: TaskType;
    plannedStartTime: number;
    plannedEndTime: number;
    actualStartTime: number | null;
    actualEndTime: number | null;
    completed: boolean;
}

export interface ITaskFilter {
    byType?: string;
    byTitle?: string;
    isToday?: boolean;
}

interface ITaskResponse {
    tasks: ITask[];
}

type EditTask = Omit<ITask, 'id'>;

export interface ITaskApi {
    get: (filters: ITaskFilter) => AxiosPromise<ITaskResponse>;
    add: (taskData: EditTask) => AxiosPromise<ITaskResponse>;
    edit: (id: string, taskData: EditTask) => AxiosPromise<ITaskResponse>;
}
