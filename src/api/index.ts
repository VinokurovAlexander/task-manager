import axios from 'axios';
import { createRecoveryApi } from './recovery';
import { createAuthApi } from './auth';
import { createTaskApi } from './task';
import { createProfileApi } from './profile';

const instance = axios.create();

const api = {
    auth: createAuthApi(instance),
    task: createTaskApi(instance),
    recovery: createRecoveryApi(instance),
    profile: createProfileApi(instance),
    heartbeat: () => instance.get('/heartbeat'),
};

export { api, instance };
