import { createSelector } from 'reselect';

const selectFileManage = state => state.get('adminFilemanage');

const makeSelectSiteList = () => createSelector(selectFileManage, filemanage => filemanage.get('siteList').toJS());
const makeSelectAminMain = () => createSelector(selectFileManage, filemanage => filemanage.get('adminMain'));
const makeSelectLinkList = () => createSelector(selectFileManage, filemanage => filemanage.get('linkList').toJS());
const makeSelectSysFileList = () => createSelector(selectFileManage, filemanage => filemanage.get('sysFileList').toJS());
const makeSelectSysFileListTotal = () => createSelector(selectFileManage, filemanage => filemanage.get('sysFileListTotal'));
const makeSelectUserFileList = () => createSelector(selectFileManage, filemanage => filemanage.get('userFileList').toJS());
const makeSelectUserFileListTotal = () => createSelector(selectFileManage, filemanage => filemanage.get('userFileListTotal'));
const makeSelectUserList = () => createSelector(selectFileManage, filemanage => filemanage.get('userList').toJS());
const makeSelectUserListTotal = () => createSelector(selectFileManage, filemanage => filemanage.get('userListTotal'));

const makeSelectModalFileList = () => createSelector(selectFileManage, filemanage => filemanage.get('modalFileList').toJS());
const makeSelectModalListTotal = () => createSelector(selectFileManage, filemanage => filemanage.get('modalTotal'));

export {
  makeSelectAminMain,
  makeSelectSiteList,
  makeSelectLinkList,
  makeSelectSysFileList,
  makeSelectSysFileListTotal,
  makeSelectUserFileList,
  makeSelectUserFileListTotal,
  makeSelectUserList,
  makeSelectUserListTotal,
  makeSelectModalFileList,
  makeSelectModalListTotal,
};
