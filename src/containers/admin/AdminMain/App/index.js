import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'components/Loadable';

// import AppList from './AppList';
// import AppRegis from './AppRegis';
// import AppDetail from './AppDetail';
// import AppUpdate from './AppUpdate';

const AppList = Loadable({ loader: () => import('./AppList') });
const AppRegis = Loadable({ loader: () => import('./AppRegis') });
const AppDetail = Loadable({ loader: () => import('./AppDetail') });
const AppUpdate = Loadable({ loader: () => import('./AppUpdate') });

const App = () => (
  <div>
    <Switch>
      <Route path="/admin/adminmain/sysapp" component={AppList} exact />
      <Route path="/admin/adminmain/sysapp/appRegis" component={AppRegis} />
      <Route path="/admin/adminmain/sysapp/appDetail/:APP_ID/:VER" component={AppDetail} exact />
      <Route path="/admin/adminmain/sysapp/appUpdate/:uv/:APP_ID/:VER/:tabNum/:svcyn" component={AppUpdate} />
    </Switch>
  </div>
)

export default App;
