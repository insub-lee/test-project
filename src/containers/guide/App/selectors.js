import { createSelector } from 'reselect';

const selectApp = state => state.get('app');

const makeHeight = () => createSelector(selectApp, appState => appState.get('height'));

const makeSelectedIndex = () => createSelector(selectApp, appState => appState.get('selectedIndex'));

const makeSelectedArticle = () => createSelector(selectApp, appState => appState.get('selectedArticle'));

export { selectApp, makeHeight, makeSelectedIndex, makeSelectedArticle };
