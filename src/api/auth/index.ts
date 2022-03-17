import { AxiosInstance, AxiosPromise } from 'axios';
import { ISessionKey } from '../types';

type Auth = (login: string, password: string) => AxiosPromise<ISessionKey>;

interface IAuthApi {
    signIn: Auth;
    signUp: Auth;
}

export const createAuthApi = (instance: AxiosInstance): IAuthApi => ({
    signIn: (login, password) => instance.post('/login', { password, login }),
    signUp: (login, password) => instance.post('/signup', { password, login }),
});
