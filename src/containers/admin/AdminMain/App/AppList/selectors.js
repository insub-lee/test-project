import { createSelector } from 'reselect';

const selectAppDetail = state => state.get('admin/AdminMain/App/AppList');

const makeSelectMyAppList = () => createSelector(selectAppDetail, appQnaState => appQnaState.get('myAppList').toJS());
const makeSelectSearchTypeList = () => createSelector(selectAppDetail, appQnaState => appQnaState.get('searchTypeList').toJS());
export { selectAppDetail, makeSelectMyAppList, makeSelectSearchTypeList };
