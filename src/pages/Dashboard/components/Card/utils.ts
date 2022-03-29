export const getDateFromTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);

    return `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
};
