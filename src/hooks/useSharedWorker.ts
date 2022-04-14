import React from 'react';

export const useSharedWorker = () => {
    const [worker, setWorker] = React.useState<SharedWorker | null>(null);

    React.useEffect(() => {
        const sharedWorker = new SharedWorker(
            new URL('scripts/shared-worker.ts', import.meta.url),
            {
                type: 'module',
                name: 'myWorker',
            }
        );

        sharedWorker.port.start();
        setWorker(sharedWorker);

        return () => {
            sharedWorker.port.close();
        };
    }, []);

    return worker;
};
