import { createSelector } from 'reselect';

const makeSelectNoticeState = state => state.get('apps-mdcs-user-Notice-reducer');

const auth = state => state.get('auth');
const makeSelectProfile = () => createSelector(auth, state => state.get('profile'));

const makeSelectCategoryMapList = key => createSelector(makeSelectNoticeState, state => state.getIn(['prd', key]));
const makeSelectedFilteredData = () => createSelector(makeSelectNoticeState, state => state.getIn(['prdData']));

export default {
  makeSelectCategoryMapList,
  makeSelectedFilteredData,
  makeSelectProfile,
};
