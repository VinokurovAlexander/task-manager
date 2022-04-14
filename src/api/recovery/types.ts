import { AxiosPromise } from 'axios';
import { ISessionKey } from '../types';

interface IUserWithQuestion {
    id: string;
    recoveryQuestion: string;
}

interface IUserWithToken {
    id: string;
    recoveryToken: string;
}

interface IChangePassword {
    userId: string;
    recoveryToken: string;
    password: string;
}

export interface IRecoveryApi {
    getQuestion: (login: string) => AxiosPromise<IUserWithQuestion>;
    sendAnswer: (userId: string, recoveryAnswer: string) => AxiosPromise<IUserWithToken>;
    changePassword: ({
        recoveryToken,
        password,
        userId,
    }: IChangePassword) => AxiosPromise<ISessionKey>;
}
