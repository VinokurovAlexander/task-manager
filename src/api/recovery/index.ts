import { AxiosInstance } from 'axios';
import { IRecoveryApi } from './types';

export const createRecoveryApi = (instance: AxiosInstance): IRecoveryApi => ({
    getQuestion: login => instance.get('/recovery', { params: { login } }),
    sendAnswer: (userId, recoveryAnswer) => instance.post('/recovery', { userId, recoveryAnswer }),
    changePassword: params => instance.patch('recovery', params),
});
