import { createSelector } from 'reselect';

const selectAppSec = state => state.get('appSec');

const makeAppSecList = () => createSelector(
  selectAppSec,
  appSec => appSec.get('appSecList'),
);

const makeAppAuthCnl = () => createSelector(
  selectAppSec,
  appSec => appSec.get('appAuthCnl'),
);

export {
  makeAppSecList,
  makeAppAuthCnl,
};
