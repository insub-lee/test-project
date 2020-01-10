import { createSelector } from 'reselect';

const selectBanners = state => state.get('banner');
const selectApps = state => state.get('bannerSetting');

const makeGetBannerList = () => createSelector(selectApps, messageState => messageState.get('itemBannerList'));

const makeGetWidgetId = () => createSelector(selectApps, messageState => messageState.get('widgetId'));

const makeGetPageId = () => createSelector(selectApps, messageState => messageState.get('pageId'));

const makeGetBanner = () => createSelector(selectBanners, messageState => messageState.get('cashItem'));

export { selectApps, makeGetBannerList, makeGetWidgetId, makeGetPageId, makeGetBanner };
