import { createSelector } from 'reselect';

const selectPmsheet = state => state.get('masterBom');

const makePmBomTreeList = () => createSelector(selectPmsheet, params => params.get('pmBomTreeList').toJS());

const makeTemp = () => createSelector(selectPmsheet, params => params.get('pmBomTreeList'));

export { makePmBomTreeList, makeTemp };
