import { createSelector } from 'reselect';

const selectFileManage = state => state.get('filemanage');

const makeSelectSiteList = () => createSelector(selectFileManage, filemanage => filemanage.get('siteList').toJS());
const makeSelectSysFileList = () => createSelector(selectFileManage, filemanage => filemanage.get('sysFileList'));
const makeSelectUserFolderTreeData = () => createSelector(selectFileManage, filemanage => filemanage.get('userFolderTreeData').toJS());
const makeSelectUserFileList = () => createSelector(selectFileManage, filemanage => filemanage.get('userFileList'));
const makeSelectLink = () => createSelector(selectFileManage, filemanage => filemanage.get('link'));
const makeSelectShareUserList = () => createSelector(selectFileManage, filemanage => filemanage.get('shareUserList').toJS());
const makeSelectShareFileList = () => createSelector(selectFileManage, filemanage => filemanage.get('shareFileList'));
const makeSelectAuthData = () => createSelector(selectFileManage, filemanage => filemanage.get('authData'));

export {
  selectFileManage,
  makeSelectSiteList,
  makeSelectSysFileList,
  makeSelectUserFolderTreeData,
  makeSelectUserFileList,
  makeSelectLink,
  makeSelectShareUserList,
  makeSelectShareFileList,
  makeSelectAuthData,
};
