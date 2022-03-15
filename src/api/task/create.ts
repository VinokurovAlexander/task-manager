import { AxiosInstance } from 'axios';
import { ITaskApi } from './types';

export default (instance: AxiosInstance): ITaskApi => ({
    get: filters => instance.get('/tasks', { params: { ...filters } }),
    add: data => instance.post('/tasks', data),
    edit: (id, data) => instance.patch(`/tasks/${id}`, data),
});
