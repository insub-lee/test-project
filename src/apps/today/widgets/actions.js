import * as actionType from './constants';

export const getTodayList = (
	startDate,
	endDate,
  ) => (
	{
		type: actionType.GET_TODAYLIST_SAGA,
		startDate,
		endDate,
	}
);

export const udtCompleteToday = (
	taskId,
	startDate,
	endDate,
  ) => (
	{
		type: actionType.UDT_COMPLETE_TODAY,
		taskId,
		startDate,
		endDate,
	}
);

