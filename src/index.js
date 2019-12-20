import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'console-polyfill';

// Needed for redux-saga es6 generator support
// import '@babel/polyfill';
import 'core-js';
import 'regenerator-runtime/runtime';
import 'formdata-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
// import createHistory from 'history/createBrowserHistory';
import globalConfigs from 'utils/globalConfigs';
import { createBrowserHistory as createHistory } from 'history';

import './include';
import GlobalStyle from './theme/GlobalStyle';

import Routes from './containers/common/Routes';
import LanguageProvider from './containers/common/LanguageProvider';

import configureStore from './configureStore';
import { translationMessages } from './i18n';

const initialState = {};
const history = createHistory();
history.listen((location, action) => {
  console.log(action, location.pathname, 'location.pathname');
});
const store = configureStore(initialState, history);
globalConfigs.store = store;
const MOUNT_NODE = window.document.getElementById('root');

const NonBlockApp = withRouter(Routes);

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <div>
            <GlobalStyle />
            <NonBlockApp />
          </div>
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js'), import('intl/locale-data/jsonp/ko.js'), import('intl/locale-data/jsonp/zh.js')]))
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}
