import { createSelector } from 'reselect';

const selectIfBoardData = state => state.get('IfBoardSys');

const makeIfBoardDataList = () => createSelector(
  selectIfBoardData,
  iFBoardState => iFBoardState.get('getIfBoardDataList').toJS(),
);

export {
  selectIfBoardData,
  makeIfBoardDataList,
};
