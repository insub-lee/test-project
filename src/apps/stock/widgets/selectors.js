import { createSelector } from 'reselect';

const selectApps = state => state.get('Stock');

const makegetStockList = () => createSelector(
  selectApps,
  messageState => messageState.get('stockList').toJS(),
);
const makegetStockInfo = () => createSelector(
  selectApps,
  messageState => messageState.get('stockInfo').toJS(),
);

export {
  selectApps,
  makegetStockList,
  makegetStockInfo,
};
