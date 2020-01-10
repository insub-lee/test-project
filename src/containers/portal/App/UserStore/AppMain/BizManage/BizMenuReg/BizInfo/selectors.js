import { createSelector } from 'reselect';

const selectOrg = state => state.get('bizmenuBizInfo');

const makgeBizInfo = () => createSelector(selectOrg, org => org.get('bizInfo'));

const makgeBizQnaList = () => createSelector(selectOrg, org => org.get('bizQnaList').toJS());

const makgeBizFaqList = () => createSelector(selectOrg, org => org.get('bizFaqList').toJS());

export { selectOrg, makgeBizInfo, makgeBizQnaList, makgeBizFaqList };
