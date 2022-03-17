import React from 'react';
import { AxiosError } from 'axios';
import { debounce } from 'utils/debounce';
import { api } from 'api';

const AXIOS_TIMEOUT_ERROR_CODE = 'ECONNABORTED';

interface INotice {
    type: 'error' | 'warning' | 'info';
    message: string;
}

export const useRequest = () => {
    const [notice, setNotice] = React.useState<INotice | null>(null);
    const [isTimeout, setIsTimeout] = React.useState(false);

    const handleError = React.useCallback((error: AxiosError) => {
        if (error.code === AXIOS_TIMEOUT_ERROR_CODE) {
            setNotice({
                type: 'warning',
                message: 'Trying to reconnect. Please wait',
            });
            setIsTimeout(true);

            return;
        }

        setNotice({
            type: 'error',
            message: error?.response?.data.message,
        });
    }, []);

    const sendHeartbeat = debounce(() => {
        api.heartbeat()
            .then(() => {
                setIsTimeout(false);
                setNotice({
                    type: 'info',
                    message: 'Connection to the server has been restored',
                });
            })
            .catch(sendHeartbeat);
    }, 2000);

    React.useEffect(() => {
        if (isTimeout) {
            sendHeartbeat();
        }
    }, [isTimeout, sendHeartbeat]);

    return { notice, isTimeout, handleError, setNotice };
};
