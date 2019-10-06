import { createSelector } from 'reselect';

const makeSelectNoticeState = state => state.get('apps-mdcs-user-Notice-reducer');

const auth = state => state.get('auth');
const makeSelectProfile = () =>
  createSelector(
    auth,
    state => state.get('profile'),
  );

const makeSelectCategoryMapList = key =>
  createSelector(
    makeSelectNoticeState,
    state => state.getIn(['notice', key]),
  );
const makeSelectedFilteredData = () =>
  createSelector(
    makeSelectNoticeState,
    state => state.getIn(['noticeData']),
  );

export default {
  makeSelectCategoryMapList,
  makeSelectedFilteredData,
  makeSelectProfile,
};
