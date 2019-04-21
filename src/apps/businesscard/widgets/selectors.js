import { createSelector } from 'reselect';

const selectInfoList = state => state.get('BcList');

const makeSelectInfoList = () => createSelector(
  selectInfoList,
  //selectInfoState => selectInfoState.get('BcinfoList').toJS(),
  selectInfoState => selectInfoState.get('getRow'),
  // selectInfoState => selectInfoState.getRow,
);

const makeSelectUserInfoList = () => createSelector(
  selectInfoList,
  //selectInfoState => selectInfoState.get('BcinfoList').toJS(),
  selectInfoState => selectInfoState.get('getUserInfoList'),
  // selectInfoState => selectInfoState.getRow,
);


export {
  selectInfoList,
  makeSelectInfoList,
  makeSelectUserInfoList,
};
