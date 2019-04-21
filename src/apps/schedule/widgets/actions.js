import * as actionType from './constants';

export const getScheduleList = (
    startDate,
    endDate,
) => (
    {
        type: actionType.GET_SCHEDULELIST_SAGA,
        startDate,
        endDate,
    }
);


