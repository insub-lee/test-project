import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  // 데이터의 초기값 세팅
  workOrderDetail: [],
  workOrderEtTaskDetail: [],
  dangerTaskList: [],
  repairTypeList: [],
});

const pmsheetReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.LOADING_FAB_PARAMTEST:
      return state.set('workOrderDetail', action.workOrderDetail)
        .set('workOrderEtTaskDetail', action.workOrderEtTaskDetail)
        .set('startDate', action.startDate)
        .set('contractorGrid', action.contractorGrid);
    // case constants.LOADING_FAB_DANGER:
    //   return state.set('repairTypeList', action.repairTypeList);
    default:
      return state;
  }
};
export default pmsheetReducer;
