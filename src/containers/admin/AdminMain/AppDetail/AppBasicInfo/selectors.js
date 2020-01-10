import { createSelector } from 'reselect';

const selectAppDetail = state => state.get('admin/AdminMain/AppDetail/AppBasicInfo');

const makeSelectAppBasicInfo = () => createSelector(selectAppDetail, appBasicInfoState => appBasicInfoState.get('appBasicInfo'));

const makeSelectAppProcess = () => createSelector(selectAppDetail, appBasicInfoState => appBasicInfoState.get('appProcess'));

const makeSelectAppManual = () => createSelector(selectAppDetail, appBasicInfoState => appBasicInfoState.get('appManual'));

const makeSelectAppManagerList = () => createSelector(selectAppDetail, appBasicInfoState => appBasicInfoState.get('appManagerList').toJS());

const selectView = state => state.get('common');

const currentView = () => createSelector(selectView, viewState => viewState.get('view'));

export { selectAppDetail, makeSelectAppBasicInfo, makeSelectAppProcess, makeSelectAppManual, makeSelectAppManagerList, currentView };
