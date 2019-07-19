import { createSelector } from 'reselect';

const selectOrg = state => state.get('admin/AdminMain/Menu/BizMenuReg/BizInfo');

const makgeBizInfo = () => createSelector(
  selectOrg,
  org => org.get('bizInfo'),
);

const makgeBizQnaList = () => createSelector(
  selectOrg,
  org => org.get('bizQnaList').toJS(),
);

const makgeBizFaqList = () => createSelector(
  selectOrg,
  org => org.get('bizFaqList').toJS(),
);

export {
  selectOrg,
  makgeBizInfo,
  makgeBizQnaList,
  makgeBizFaqList,
};
