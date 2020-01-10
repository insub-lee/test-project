import { createSelector } from 'reselect';

const selectIfBoardCfgData = state => state.get('IfBoardCfg');

const makeIfBoardCfgGrpList = () => createSelector(selectIfBoardCfgData, iFBoardCfgState => iFBoardCfgState.get('getIfBoardCfgGrpList').toJS());
const makeIfBoardCfgCateList = () => createSelector(selectIfBoardCfgData, iFBoardCfgState => iFBoardCfgState.get('getIfBoardCfgCateList').toJS());
const makeGrseq = () => createSelector(selectIfBoardCfgData, iFBoardCfgState => iFBoardCfgState.get('grSeq'));
export { selectIfBoardCfgData, makeIfBoardCfgGrpList, makeIfBoardCfgCateList, makeGrseq };
