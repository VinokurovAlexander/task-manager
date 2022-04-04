import { getTaskColourByType } from '../../../../utils';
import { ITask } from 'api/task';

export const useTaskData = (task: ITask) => {
    const { completed, plannedEndTime, plannedStartTime } = task;

    const contrast = completed ? 'main' : 'light';
    const bgColor = `${getTaskColourByType(task.type)}.${contrast}`;

    const taskDurationInMinutes = (plannedEndTime - plannedStartTime) / 60000;
    const minutesInDay = 24 * 60;
    const width = (taskDurationInMinutes / minutesInDay) * 100;

    return { bgColor, width };
};
