import { TaskType } from 'api/task';

export const getTaskColourByType = (type: TaskType) => {
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
