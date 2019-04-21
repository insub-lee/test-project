import { createSelector } from 'reselect';

const FavoriteLoc = state => state.get('FavoriteLoc');

const makeCompParams = () => createSelector(
  FavoriteLoc,
  params => params.get('compList'),
);

const makeBldgParams = () => createSelector(
  FavoriteLoc,
  params => params.get('bldgList'),
);

const makeFloorParams = () => createSelector(
  FavoriteLoc,
  params => params.get('floorList'),
);

const makeFavLoc = () => createSelector(
  FavoriteLoc,
  favLocList => favLocList.get('favLocList'),
);

export {
  makeCompParams,
  makeBldgParams,
  makeFloorParams,
  makeFavLoc,

};
