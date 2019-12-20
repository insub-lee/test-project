import { createSelector } from 'reselect';

const selectAdminDtl = state => state.get('CodeDtl');

const makeSelectCodeAdminDtl = () => createSelector(selectAdminDtl, codeAdminDtlState => codeAdminDtlState.get('codeAdminDtl').toJS());

const makeSelectCodeAdmin = () => createSelector(selectAdminDtl, codeAdminDtlState => codeAdminDtlState.get('codeamdin'));

const makeSelectCodeGrpCd = () => createSelector(selectAdminDtl, codeAdminDtlState => codeAdminDtlState.get('codeGrpCd'));

export { selectAdminDtl, makeSelectCodeAdminDtl, makeSelectCodeAdmin, makeSelectCodeGrpCd };
