import { fromJS } from 'immutable';

const initState = fromJS({
  // 데이터의 초기값 세팅
  fabList: [],
  teamList: [],
  sdptList: [],
  flList: [],
  versionList: [],
  signStatusList: [],
  modelList: [],
  informNoticeList: [],
  saveResult: '',
});

const pmsheetReducer = (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default pmsheetReducer;
