import { createSelector } from 'reselect';

const selectFileManage = state => state.get('filemanage');

const makeSelectSiteList = () => createSelector(selectFileManage, filemanage => filemanage.get('siteList'));

export { selectFileManage, makeSelectSiteList };
