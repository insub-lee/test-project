import { createSelector } from 'reselect';

const selectAdmin = state => state.get('codeAdmin');

const makeSelectCodeAdminList = () => createSelector(selectAdmin, codeAdminState => codeAdminState.get('codeAdminList').toJS());

const makeSelectDelRow = () => createSelector(selectAdmin, delCodeAdminState => delCodeAdminState.get('delAdminList').toJS());

export { selectAdmin, makeSelectCodeAdminList, makeSelectDelRow };
