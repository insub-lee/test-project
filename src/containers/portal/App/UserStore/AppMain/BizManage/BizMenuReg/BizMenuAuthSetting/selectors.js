import { createSelector } from 'reselect';

const selectOrg = state => state.get('userStore/AppMain/BizManage/BizMenuReg/BizMenuAuthSetting');

const makeBizMenuAuthInfo = () => createSelector(selectOrg, org => org.get('bizMenuAuthInfo').toJS());

export { selectOrg, makeBizMenuAuthInfo };
