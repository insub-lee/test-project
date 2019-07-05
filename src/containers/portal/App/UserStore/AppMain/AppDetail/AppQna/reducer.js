import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  qnaList: [],
  faqList: [],
  myqnaList: [],
  qnaTotCnt: 0,
  faqTotCnt: 0,
  myqnaTotCnt: 0,
  appManagerChk: 0,
  qnaWriteUrl: '',
  faqWriteUrl: '',
  qnaEditUrl: '',
});

const AppQnaReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_QNA_LIST:
      return state.set('qnaList', action.payload);
    case constants.SET_FAQ_LIST:
      return state.set('faqList', action.payload);
    case constants.SET_MYQNA_LIST:
      return state.set('myqnaList', action.payload);
    case constants.QNA_TOT_COUNT:
      return state.set('qnaTotCnt', action.payload);
    case constants.FAQ_TOT_COUNT:
      return state.set('faqTotCnt', action.payload);
    case constants.MYQNA_TOT_COUNT:
      return state.set('myqnaTotCnt', action.payload);
    case constants.APP_MANAGER_CHK:
      return state.set('appManagerChk', action.payload);
    case constants.QNA_WRITE_URL:
      return state.set('qnaWriteUrl', action.payload);
    case constants.FAQ_WRITE_URL:
      return state.set('faqWriteUrl', action.payload);
    case constants.QNA_EDIT_URL:
      return state.set('qnaEditUrl', action.payload);
    default:
      return state;
  }
};

export default AppQnaReducer;
