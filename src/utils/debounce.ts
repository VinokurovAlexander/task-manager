export const debounce = (func: (...args: any[]) => any, limit: number) => {
    let timeoutId: NodeJS.Timeout;

    return (...args: any[]) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func(...args);
        }, limit);
    };
};
