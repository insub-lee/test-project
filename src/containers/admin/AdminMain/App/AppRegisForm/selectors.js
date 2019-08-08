import { createSelector } from 'reselect';

const selectmyappRegis = state => state.get('admin/AdminMain/App/AppRegisForm');

const makeSelectLinkTypeList = () => createSelector(
  selectmyappRegis,
  myappRegis => myappRegis.get('linkTypeList').toJS(),
);
const makeSelectMethodList = () => createSelector(
  selectmyappRegis,
  myappRegis => myappRegis.get('methodList').toJS(),
);
const makeSelectWedgetColorList = () => createSelector(
  selectmyappRegis,
  myappRegis => myappRegis.get('wedgetColorList').toJS(),
);
export {
  selectmyappRegis,
  makeSelectLinkTypeList,
  makeSelectMethodList,
  makeSelectWedgetColorList,
};
