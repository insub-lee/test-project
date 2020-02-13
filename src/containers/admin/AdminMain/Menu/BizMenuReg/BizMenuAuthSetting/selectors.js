import { createSelector } from 'reselect';

const selectOrg = state => state.get('admin/AdminMain/Menu/BizMenuReg/BizMenuAuthSetting');

const makeBizMenuAuthInfo = () => createSelector(selectOrg, org => org.get('bizMenuAuthInfo').toJS());

export { selectOrg, makeBizMenuAuthInfo };
