import React from 'react';
import { IError } from 'utils/server';

export const useError = () => {
    const [error, setError] = React.useState<IError | null>(null);
    const errorMessage = error?.message;

    return { errorMessage, setError };
};
