export interface IUser {
    id: string;
    login: string;
    password: string;
    recoveryQuestion: string;
    recoveryAnswer: string;
    recoveryToken: string | null;
}

export interface IError {
    type: string;
    message: string;
}

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
}
