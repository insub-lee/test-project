import { createSelector } from 'reselect';

const selectFileManage = state => state.get('uesrFilemanage');

const makeSelectSiteList = () => createSelector(selectFileManage, filemanage => filemanage.get('siteList').toJS());
// const makeSelectSysFileList = () => createSelector(selectFileManage, filemanage => filemanage.get('sysFileList'));
const makeSelectUserFolderTreeData = () => createSelector(selectFileManage, filemanage => filemanage.get('userFolderTreeData').toJS());
// const makeSelectUserFileList = () => createSelector(selectFileManage, filemanage => filemanage.get('userFileList').toJS());
const makeSelectShareUserList = () => createSelector(selectFileManage, filemanage => filemanage.get('shareUserList').toJS());
// const makeSelectShareFileList = () => createSelector(selectFileManage, filemanage => filemanage.get('shareFileList').toJS());
const makeSelectFileList = () => createSelector(selectFileManage, filemanage => filemanage.get('fileList').toJS());
const makeSelectLinkList = () => createSelector(selectFileManage, filemanage => filemanage.get('linkList').toJS());
const makeSelectListTotal = () => createSelector(selectFileManage, filemanage => filemanage.get('total'));
const makeSelectUserFileManage = () => createSelector(selectFileManage, filemanage => filemanage.get('userFileManage'));
const makeSelectAuthData = () => createSelector(selectFileManage, filemanage => filemanage.get('authData'));

export {
  makeSelectSiteList,
  // makeSelectSysFileList,
  makeSelectUserFolderTreeData,
  // makeSelectUserFileList,
  makeSelectShareUserList,
  // makeSelectShareFileList,
  makeSelectFileList,
  makeSelectLinkList,
  makeSelectListTotal,
  makeSelectUserFileManage,
  makeSelectAuthData,
};
