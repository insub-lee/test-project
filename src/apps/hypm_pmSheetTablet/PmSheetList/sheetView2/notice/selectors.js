import { createSelector } from 'reselect';

const selectPmsheet = state => state.get('mobileNotice');

const noticeList = () => createSelector(
  selectPmsheet,
  params => params.get('noticeList'),
);

export {
  noticeList,
};
