import { createSelector } from 'reselect';

const selectSer = state => state.get('servicepage');

const makeServiceData = () => createSelector(selectSer, opi => opi.get('serviceData'));

export { selectSer, makeServiceData };
