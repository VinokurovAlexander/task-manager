import { TaskType } from 'api/task';

export const getDateFromTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);

    return `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
};

export const getBadgeColorByType = (type: TaskType) => {
    switch (type) {
        case TaskType.MEDICINE: {
            return 'success';
        }

        case TaskType.FAMILY: {
            return 'warning';
        }

        case TaskType.SPORT: {
            return 'error';
        }

        case TaskType.WORK:
        default: {
            return 'primary';
        }
    }
};
