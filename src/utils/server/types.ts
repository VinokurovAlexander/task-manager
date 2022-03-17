export interface IUser {
    id: string;
    login: string;
    password: string;
    recoveryQuestion: string;
    recoveryAnswer: string;
    recoveryToken: string | null;
}
