import { createSelector } from 'reselect';

const selectHypmCommon = state => state.get('hypm_common');
const makeUserCompanyDefine = () => createSelector(
  selectHypmCommon,
  params => params.get('userCompanyDefine'),
);

export {
  selectHypmCommon,
  makeUserCompanyDefine,
};
