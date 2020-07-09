import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  approveList: [],
  unApproveList: [],
  draftList: [],
  customDataList: [],
  selectedRow: {},
  viewVisible: false,
  opinionVisible: false,
  opinion: '',
  approveListCnt: 0,
  unApproveListCnt: 0,
  draftListCnt: 0,
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_APPROVE_LIST: {
      const { list, listCnt } = action;
      return state
        .set('approveList', fromJS(list.map(item => ({ ...item, key: `approveList_${item.RESULT_ID}` }))))
        .set('viewVisible', false)
        .set('approveListCnt', listCnt);
    }
    case actionTypes.SET_UNAPPROVE_LIST: {
      const { list, listCnt } = action;
      return state
        .set('unApproveList', fromJS(list.map(item => ({ ...item, key: `unApproveList_${item.QUE_ID}` }))))
        .set('viewVisible', false)
        .set('unApproveListCnt', listCnt);
    }
    case actionTypes.SET_DRAFT_LIST: {
      const { list, listCnt } = action;
      return state
        .set('draftList', fromJS(list.map(item => ({ ...item, key: `draftList_${item.RESULT_ID}` }))))
        .set('viewVisible', false)
        .set('draftListCnt', listCnt);
    }
    case actionTypes.SET_PARTIAL_INIT: {
      return state
        .set('viewVisible', false)
        .set('opinionVisible', false)
        .set('selectedRow', fromJS({}))
        .set('opinion', '');
    }
    case actionTypes.SET_CUSTOMER_DATABIND: {
      const { list } = action;
      console.debug('setcustomer', action);
      return state.set('customDataList', fromJS(list));
    }
    case actionTypes.SET_SELECTED_ROW: {
      const { row } = action;
      console.debug(row);
      return state.set('selectedRow', fromJS(row));
    }
    case actionTypes.SET_VIEW_VISIBLE: {
      const { visible } = action;
      return state.set('viewVisible', visible);
    }
    case actionTypes.SET_OPINION_VISIBLE: {
      const { visible } = action;
      return state.set('opinionVisible', visible);
    }
    case actionTypes.SET_OPINION: {
      const { opinion } = action;
      return state.set('opinion', opinion);
    }
    case actionTypes.SET_BIZFORMDATA: {
      const { formData } = action;
      return state.set('formData', formData);
    }
    default:
      return state;
  }
};

export default appReducer;
