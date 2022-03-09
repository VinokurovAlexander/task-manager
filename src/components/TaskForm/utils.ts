import { parse } from 'date-fns';
import { TaskType } from 'utils/server';

const getTimestampFromInput = (dateTime: string) =>
    parse(dateTime, 'dd.MM.yyyy HH:mm', new Date()).getTime();

export const getTaskFromFormData = (formData: FormData) => {
    const actualStartTime = formData.get('actualStartTime');
    const actualEndTime = formData.get('actualEndTime');

    return {
        title: formData.get('title') as string,
        type: formData.get('type') as TaskType,
        plannedStartTime: getTimestampFromInput(
            formData.get('plannedStartTime') as string
        ),
        plannedEndTime: getTimestampFromInput(
            formData.get('plannedEndTime') as string
        ),
        actualStartTime: actualStartTime
            ? getTimestampFromInput(actualStartTime as string)
            : null,
        actualEndTime: actualEndTime
            ? getTimestampFromInput(actualEndTime as string)
            : null,
    };
};
