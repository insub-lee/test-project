import { createSelector } from 'reselect';

const selectFileManage = state => state.get('adminFilemanage');

const makeSelectSiteList = () => createSelector(selectFileManage, filemanage => filemanage.get('siteList').toJS());
const makeSelectAminMain = () => createSelector(selectFileManage, filemanage => filemanage.get('adminMain'));
const makeSelectFileList = () => createSelector(selectFileManage, filemanage => filemanage.get('fileList').toJS());
const makeSelectLinkList = () => createSelector(selectFileManage, filemanage => filemanage.get('linkList').toJS());
const makeSelectListTotal = () => createSelector(selectFileManage, filemanage => filemanage.get('total'));
const makeSelectModalFileList = () => createSelector(selectFileManage, filemanage => filemanage.get('modalFileList').toJS());
const makeSelectModalListTotal = () => createSelector(selectFileManage, filemanage => filemanage.get('modalTotal'));

export {
  makeSelectAminMain,
  makeSelectSiteList,
  makeSelectFileList,
  makeSelectLinkList,
  makeSelectListTotal,
  makeSelectModalFileList,
  makeSelectModalListTotal,
};
