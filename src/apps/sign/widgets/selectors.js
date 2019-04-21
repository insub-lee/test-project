import { createSelector } from 'reselect';

const selectSigns = state => state.get('Sign');

const makeGetSignList = () => createSelector(
  selectSigns,
  signeState => signeState.get('signList').toJS(),
);

export {
  selectSigns,
  makeGetSignList,
};
