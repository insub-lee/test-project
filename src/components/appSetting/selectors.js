import { createSelector } from 'reselect';

const selectApps = state => state.get('appsetting');


const makeWidgetList = () => createSelector(
  selectApps,
  appState => appState.get('widgetList').toJS(),
);

const makeWidget = () => createSelector(
  selectApps,
  appState => appState.get('widget').toJS(),
);


export {
  makeWidgetList,
  makeWidget,
};
