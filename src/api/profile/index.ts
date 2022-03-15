import { AxiosInstance } from 'axios';

type ProfileData = {
    name: string | null;
    surname: string | null;
    recoveryQuestion: string;
    recoveryAnswer: string;
    avatar: File | null;
};

export const createProfileApi = (instance: AxiosInstance) => ({
    edit: (profileData: ProfileData) => instance.patch('/profile', profileData),
});
